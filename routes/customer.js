// MODULES
import express from "express";
import axios from "axios";
import dotenv from "dotenv";
import { customer_template } from "../views/index.js";

// APP
const router = express.Router();
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
  console.log(response)
};

router.post("/", async (req, res) => {
  try {
    const { customer_id } = req.body;
    console.log(`Calling: ${GET_CUSTOMER_API}`)
    const customer = await getCustomer(customer_id);
    res.send(customer_template(customer));
  } catch (error) {
    res.send(`<div class="alert alert-danger">Failed to extract customer data. Please try again later.</div>`);
  }
});

router.post("/submit", async (req, res) => {
    const customerData = req.body;
    console.log(`Calling: ${SAVE_CUSTOMER_API}`);
    await saveCustomer(customerData);
    res.send('Demo');
});

export default router;
