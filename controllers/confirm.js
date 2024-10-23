import { confirm_template, error_template } from "../views/index.js";

const getConfirmData = (req, res) => {
  try {
    const { payment_method } = req.body;
    const { fname, lname, date, address, city, state } = req.session.customer;
    const { album, sub_total, tax, grand_total } = req.session.order;
    const combined_fields = {
      fname,
      lname,
      address,
      date,
      city,
      state,
      album,
      sub_total,
      tax,
      grand_total,
      payment_method,
    };

    res.send(confirm_template(combined_fields));
  } catch (error) {
    res.send(error_template(error))
  }
};

export { getConfirmData };
