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

const getCustomerData = async (req, res) => {
  const { customer_id } = req.body;

  if (customer_id === null || customer_id === "") {
    return res.send(
      error_template({ message: "Please enter a valid customer id." })
    );
  }
  const customer = await getCustomer(customer_id);

  if (customer.success === false) {
    return res.send(error_template({
      message: customer.error
    }));
  }

  res.send(customer_template(customer));
};



const saveCustomer = async (customerData) => {
  const response = await axios.post(SAVE_CUSTOMER_API, customerData);
  return response.data;
};

const saveCustomerData = async (req, res) => {
  const customerData = req.body;

  try {
    var customer = await saveCustomer(customerData);
  } catch (error) {
    res.send(error_template({
      message: "Something went wrong!"
    }));
  }
  
  if(customer.success === false){
    return res.send(error_template({
      message: customer.error
    }));
  }

  customerData['_id'] = customer.record_id
  req.session["customer"] = customerData;
  res.send(order_form_template());
};

export { getCustomer, getCustomerData, saveCustomer, saveCustomerData };
