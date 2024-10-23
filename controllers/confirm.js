import axios from "axios";
import dotenv from 'dotenv';
import { confirm_template, error_template } from "../views/index.js";

dotenv.config();

const GENERATE_DOCUMENT_API = process.env.GENERATE_DOCUMENT_API;

const getConfirmData = (req, res) => {
  try {
    const { payment_method } = req.body;
    const { fname, lname, date, address, city, state } = req.session.customer;
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
      payment_method
    };

    res.send(confirm_template(combined_fields));
  } catch (error) {
    res.send(error_template(error))
  }
};

const generateDocument = async (confirm_data) => {
  const response  = await axios.get(GENERATE_DOCUMENT_API, {
    params: {
      confirm_data
    }
  });

  console.log(response.data);
};

const processConfirmData = (req, res) => {
  try {
    const confirm_data = req.body;
    generateDocument(confirm_data);
    res.send("Accepted")
  } catch (error) {
    res.send(error_template(error))
  }
};

export { getConfirmData, processConfirmData };
