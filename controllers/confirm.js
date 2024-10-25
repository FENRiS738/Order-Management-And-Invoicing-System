import axios from "axios";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";

import {
  confirm_template,
  error_template,
  url_template,
} from "../views/index.js";

dotenv.config();

const GENERATE_DOCUMENT_API = process.env.GENERATE_DOCUMENT_API;
const SAVE_ORDER_API = process.env.SAVE_ORDER_API;

const getConfirmData = (req, res) => {
  try {
    const { payment_method } = req.body;
    const { fname, lname, date, address, city, state, director, location } =
      req.session.customer;
    const { album, sub_total, tax, grand_total, items } = req.session.order;
    const combined_fields = {
      fname,
      lname,
      address,
      date,
      city,
      state,
      album,
      items,
      sub_total,
      tax,
      grand_total,
      director,
      location,
      payment_method,
    };

    res.send(confirm_template(combined_fields));
  } catch (error) {
    res.send(error_template(error));
  }
};

const generateDocument = async (confirm_data) => {
  const response = await axios.get(GENERATE_DOCUMENT_API, {
    params: {
      fname: confirm_data["fname"],
      lname: confirm_data["lname"],
      date: confirm_data["date"],
      address: confirm_data["address"],
      city: confirm_data["city"],
      state: confirm_data["state"],
      items: confirm_data["items"],
      sub_total: confirm_data["sub_total"],
      tax: confirm_data["tax"],
      grand_total: confirm_data["grand_total"],
      payment_method: confirm_data["payment_method"],
    },
  });

  return response.data;
};

const generateToken = (formData) => {
  const { items, ...rest } = formData;
  const secretKey = process.env.JWT_SECRET;
  const token = jwt.sign(rest, secretKey);
  return token;
};

const updateOrder = async (order_id, payment_method, pdf_url) => {
  const response = await axios.post(SAVE_ORDER_API, { order_id, payment_method, pdf_url });
  return response.data.order_id;
};

const processConfirmData = async (req, res) => {
  try {
    const confirm_data = req.body;
    const doc_response = await generateDocument(confirm_data);

    if (!doc_response.success) {
      return res.send(
        error_template({
          message: "Failed to create the Invoice. Please try again.",
        })
      );
    }

    confirm_data["invoice"] = doc_response.pdf_url;
    await updateOrder(req.session.order.id, confirm_data.payment_method, doc_response.view_url);
    let token = generateToken(confirm_data);

    const fullUrl = `${req.protocol}://${req.get(
      "host"
    )}/acknowledge?token=${encodeURIComponent(token)}`;
    res.send(url_template(fullUrl, doc_response.view_url));
  } catch (error) {
    res.send(error_template(error));
  }
};

export { getConfirmData, processConfirmData };
