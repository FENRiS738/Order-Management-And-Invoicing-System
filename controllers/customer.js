import axios from "axios";
import dotenv from "dotenv";
import {
  customer_template,
  order_form_template,
  error_template,
} from "../views/index.js";

import connectToDB from "../data/database.js";
import { readData } from "../controllers/admin.js";


dotenv.config();

const GET_CUSTOMER_API = process.env.GET_CUSTOMER_API;
const SAVE_CUSTOMER_API = process.env.SAVE_CUSTOMER_API;

const get_admin_data = async () => {
  const conn = await connectToDB();

  if(!conn.success){
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



const getCustomer = async (id) => {
  const response = await axios.post(GET_CUSTOMER_API, {
    customer_id: id,
  });
  return response.data;
};

const getCustomerData = async (req, res) => {
  const { customer_id } = req.body;
  
  if (customer_id === null || customer_id === "") {
    return res.send(
      error_template({ message: "Please enter a valid customer id." })
    );
  }
  try {
    const customer = await getCustomer(customer_id);
    const { directors, locations } = await get_admin_data();
    res.send(customer_template(customer, directors, locations));
  } catch (error) {
    res.send(error_template({
      message: "Something went wrong!"
    }));
  }
};



const saveCustomer = async (customerData) => {
  const response = await axios.post(SAVE_CUSTOMER_API, customerData);
  return response.data.record_id;
};

const saveCustomerData = async (req, res) => {
  try {
    const customerData = req.body;
    const record_id = await saveCustomer(customerData);

    customerData['record_id'] = record_id
    req.session["customer"] = customerData;
    
    res.send(order_form_template());
  } catch (error) {
    res.send(error_template({
      message: "Something went wrong!"
    }));
  }
};

export { getCustomer, getCustomerData, saveCustomer, saveCustomerData };
