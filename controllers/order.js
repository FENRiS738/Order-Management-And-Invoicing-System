import axios from "axios";
import dotenv from "dotenv";
import { XMLParser } from "fast-xml-parser";
import {
  confirm_form_template,
  error_template,
  order_template,
} from "../views/index.js";

import connectToDB from "../data/database.js";
import { readData } from "../controllers/admin.js";


dotenv.config();

const SAVE_ORDER_API = process.env.SAVE_ORDER_API;
const ORDER_COMMIT_API = process.env.ORDER_COMMIT_API;;


const get_admin_data = async () => {
  const conn = await connectToDB();

  if (!conn.success) {
    return res.send(
      error_template({ message: conn.message })
    );
  }

  const directors = await readData(conn, "directors");
  const locations = await readData(conn, "locations");

  return {
    directors,
    locations
  }
}

const escapeHtml = (str) => {
  return str.replace(/[&<>"']/g, (match) => {
    const escapeMap = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#39;',
    };
    return escapeMap[match];
  });
}

const parseXML = (xml_data) => {
  const parser = new XMLParser();
  const order_obj = parser.parse(xml_data);
  return order_obj;
};

const formatImageNames = (images_list) => {
  let images;
  if (Array.isArray(images_list.Image_Name)) {
    images = images_list.Image_Name.map((image) =>
      image.replace(/\s+/g, " ").trim()
    ).join(", ");
  } else if (
    typeof images_list.Image_Name === "string" &&
    images_list.Image_Name.trim() !== ""
  ) {
    images = images_list.Image_Name.replace(/\s+/g, " ").trim();
  } else {
    images = " ";
  }
  return images;
};

const extractData = (order_client) => {
  const album = order_client["Album_Name"];
  const ordered_items = order_client["Order"]["Ordered_Items"]["Ordered_Item"];

  const abstract_order_items = ordered_items.map((item) => {
    const name = escapeHtml(item["Product_Name"]);
    const description = escapeHtml(item["Description"]);
    const quantity = item["Quantity"];
    const images = formatImageNames(item["Images"]);
    const tax = item["Tax"];
    const price = item["Price"];
    const sub_total = Number(price * quantity);
    const grand_total = sub_total + tax;
    return {
      name,
      description,
      quantity,
      images,
      tax,
      price,
      sub_total,
      grand_total,
    };
  });

  const order_sub_total = parseFloat(
    abstract_order_items.reduce(
      (accumulator, item) => accumulator + item["sub_total"],
      0
    )
  ).toFixed(2);
  const order_tax = parseFloat(
    abstract_order_items.reduce(
      (accumulator, item) => accumulator + item["tax"],
      0
    )
  ).toFixed(2);
  const order_grand_total = parseFloat(
    abstract_order_items.reduce(
      (accumulator, item) => accumulator + item["grand_total"],
      0
    )
  ).toFixed(2);

  return {
    album,
    order_sub_total,
    order_tax,
    order_grand_total,
    abstract_order_items,
  };
};

const getOrders = (xml_file) => {
  const order_obj = parseXML(xml_file.data);
  const order = extractData(order_obj["Client"]);
  return order;
};

const getOrdersData = async (req, res) => {
  const { xml_file } = req.files;

  if (!xml_file) {
    return res.send(
      error_template({ message: "Please select an invoice XML file." })
    );
  }

  try {
    const order = getOrders(xml_file);
    req.session["items_count"] = order.abstract_order_items.length;
    const { directors, locations } = await get_admin_data();
    res.send(order_template(order, directors, locations));
  } catch (error) {
    res.send(error_template({
      message: "Something went wrong!"
    }));
  }
};

const updatedItemsString = (items_count, orderData) => {
  let updated_items_string = [];
  for (let i = 1; i <= items_count; i++) {
    let item = {
      product: orderData[`product_${i}`],
      description: orderData[`description_${i}`],
      quantity: orderData[`quantity_${i}`],
      image_name: orderData[`image_name_${i}`],
    };
    updated_items_string.push(item);
  }
  return JSON.stringify(updated_items_string);
};

const saveOrder = async (orderData, record_id, date) => {
  const response = await axios.post(SAVE_ORDER_API, { orderData, record_id, date });
  return response.data.order_id;
};

const saveOrdersData = async (req, res) => {
  const orderData = req.body;
  const { record_id, date } = req.session.customer;

  const order_id = await saveOrder(orderData, record_id, date);

  if (order_id === undefined || order_id === null) {
    return res.send(error_template({ message: "Order not saved." }));
  }

  try {
    const updated_items_string = updatedItemsString(
      req.session.items_count,
      orderData
    );

    orderData["id"] = order_id;
    orderData["items"] = updated_items_string;
    req.session["order"] = orderData;

    res.send(confirm_form_template());
  } catch (error) {
    res.send(error_template({
      message: "Something went wrong!"
    }));
  }
};


const commitOrder = async (req, res) => {
  const { id } = req.session.order;
  try {
    const response = await axios.post(ORDER_COMMIT_API, { id });
    res.status(200).json({ redirectUrl: "/" });
  } catch (err) {
    res.status(500).json({ data: "Something went wrong!" })
  }
}

export { getOrdersData, saveOrdersData, commitOrder };
