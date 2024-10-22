const axios = require("axios");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const generateToken = (formData) => {
  try {
    let data = {
      album: formData["album"],
      fname: formData["fname"],
      lname: formData["lname"],
      art_director: formData["art_director"],
      locaiton: formData["location"],
      grand_total: formData["grand_total"],
      payment: formData["payment"],
      invoice: formData["invoice"],
    };
    const secretKey = process.env.JWT_SECRET;
    const token = jwt.sign(data, secretKey);
    return token;
  } catch (error) {
    throw new Error(`Failed to generate the token:\n${error}`);
  }
};

const verifyToken = (token) => {
  try {
    const secretKey = process.env.JWT_SECRET;
    const data = jwt.verify(token, secretKey);
    return data;
  } catch (error) {
    throw new Error(`Failed to verify the token:\n${error}`);
  }
};

const getItems = (listItems, data) => {
  try {
    return listItems.map((value, index) => ({
      description: data[`description_${index + 1}`],
      image_name: data[`image_name_${index + 1}`],
      quantity: data[`quantity_${index + 1}`],
    }));
  } catch (error) {
    throw new Error(`Failed to process items:\n${error}`);
  }
};

const formSubmit = async (formData) => {
  try {
    const response = await axios.post(
      "https://hook.eu1.make.com/xe35aw38h88eddbo2c8hfcy141kmvm8u",
      formData
    );

    if (!response.data.pdf_url) {
      throw new Error("Unable to create invoice.");
    }

    return response.data.pdf_url;
  } catch (error) {
    throw new Error(`Failed to submit form. Please try again later:\n${error}`);
  }
};

module.exports = { getItems, formSubmit, generateToken, verifyToken };
