const axios = require('axios');

const getItems = (listItems, data) => {
  try {
    return listItems.map((value, index) => ({
      description: data[`description_${index + 1}`],
      image_name: data[`image_name_${index + 1}`],
      quantity: data[`quantity_${index + 1}`],
    }));
  } catch (error) {
    throw new Error('Failed to process items.');
  }
};

const formSubmit = async (formData) => {
  try {
    const response = await axios.post(
      'https://hook.eu1.make.com/xe35aw38h88eddbo2c8hfcy141kmvm8u',
      formData
    );
    return response;
  } catch (error) {
    throw new Error('Failed to submit form. Please try again later.');
  }
};

module.exports = { getItems, formSubmit };
