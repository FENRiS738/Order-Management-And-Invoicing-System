import axios from "axios";
import dotenv from "dotenv";
import {
  customer_template,
  order_form_template,
  error_template,
} from "../views/index.js";

dotenv.config();

const GET_CUSTOMER_API = process.env.GET_CUSTOMER_API;
const SAVE_CUSTOMER_API = process.env.SAVE_CUSTOMER_API;

const getCustomer = async (id) => {
  const response = await axios.post(GET_CUSTOMER_API, {
    customer_id: id,
  });
  return response.data;
};

const saveCustomer = async (customerData) => {
  const response = await axios.post(SAVE_CUSTOMER_API, customerData);
  return response.data;
};

const getCustomerData = async (req, res) => {
  try {
    const { customer_id } = req.body;

    if (customer_id === null || customer_id === "") {
      return res.send(
        error_template({ message: "Please enter a valid customer id." })
      );
    }

    const customer = await getCustomer(customer_id);
    res.send(customer_template(customer));
  } catch (error) {
    res.send(error_template(error));
  }
};

const saveCustomerData = async (req, res) => {
  try {
    const customerData = req.body;
    console.log(customerData);
    await saveCustomer(customerData);
    req.session["customer"] = customerData;

    res.send(order_form_template());
  } catch (error) {
    res.send(error_template(error));
  }
};

export { getCustomer, getCustomerData, saveCustomer, saveCustomerData };
