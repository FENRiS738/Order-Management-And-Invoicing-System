const axios = require("axios");

const getItems = (listItems, data) => {
    let newItems = [];

    listItems.forEach((value, index) => {
        let updatedDescription = data[`description_${index + 1}`];
        let updatedImageNames = data[`image_name_${index + 1}`];
        let updatedQuantity = data[`quantity_${index + 1}`];
        const order = {
            description: updatedDescription,
            image_name: updatedImageNames,
            quantity: updatedQuantity
        };
        newItems.push(order);
    });
    return newItems;
};

const formSubmit = async (formData) => {
    try {
        // Make POST request
        const response = await axios.post(
            "https://hook.eu1.make.com/xe35aw38h88eddbo2c8hfcy141kmvm8u",
            formData
        );
        
        return response;
    } catch (error) {
        throw new Error(`Form submission error: ${error.message}`);
    }
};

module.exports = {
    getItems,
    formSubmit,
};
