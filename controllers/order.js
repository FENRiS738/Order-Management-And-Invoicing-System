import axios from "axios";
import dotenv from "dotenv";
import { XMLParser } from "fast-xml-parser";
import { error_template, order_template } from "../views/index.js";

dotenv.config();

const parseXML = (xml_data) => {
  const parser = new XMLParser();
  const order_obj = parser.parse(xml_data);
  return order_obj;
};

const formatImageNames = (images_list) => {
  let images;
  if (Array.isArray(images_list.Image_Name)) {
    images = images_list["Image_Name"].join(", ");
  } else if (
    typeof images_list.Image_Name === "string" &&
    images_list.Image_Name.length > 0
  ) {
    images = images_list.Image_Name;
  } else {
    images = "No images";
  }
  return images;
};

const extractData = (order_client) => {
  const album = order_client["Album_Name"];
  const ordered_items = order_client["Order"]["Ordered_Items"]["Ordered_Item"];

  const abstract_order_items = ordered_items.map((item) => {
    const name = item["Product_Name"];
    const description = item["Description"];
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
  console.log(order);
  return order;
};

const getOrdersData = async (req, res) => {
  try {
    const { xml_file } = req.files;

    if (!xml_file) {
      return res.send(
        error_template({ message: "Please select an invoice XML file." })
      );
    }

    const order = getOrders(xml_file);
    res.send(order_template(order));
  } catch (error) {
    res.send(error_template(error));
  }
};

export { getOrdersData };
