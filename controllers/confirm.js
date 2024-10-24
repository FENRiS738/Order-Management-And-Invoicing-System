import axios from "axios";
import dotenv from "dotenv";
import { acknowledge_template, confirm_template, error_template } from "../views/index.js";

dotenv.config();

const GENERATE_DOCUMENT_API = process.env.GENERATE_DOCUMENT_API;

const getConfirmData = (req, res) => {
  try {
    const { payment_method } = req.body;
    const { fname, lname, date, address, city, state, director, location } = req.session.customer;
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

const processConfirmData = async (req, res) => {
  try {
    const confirm_data = req.body;
    const doc_response = await generateDocument(confirm_data);
    if(!doc_response.success) {
      return res.send(error_template({message: "Failed to create the Invoice. Please try again."}))
    }
    res.send(acknowledge_template(confirm_data));
  } catch (error) {
    res.send(error_template(error));
  }
};

export { getConfirmData, processConfirmData };
