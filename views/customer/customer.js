import { 
  directors_list_template,
  locations_list_template,
  date_template
} from "../index.js";


const customer_template = (customer, directors, locations) => /*html*/ `
    <form 
        class="custom-form"
        hx-post="/customers/submit" 
        hx-swap="outerHTML"
        hx-on:submit="document.getElementById('save-contact-button').disabled = true; startStoringContactAnimation(event, document.getElementById('save-contact-button'))"
    >
      <div class="mb-3">
          ${directors_list_template(directors)}
      </div>
      <div class="mb-3">
          ${locations_list_template(locations)}
      </div>
      <div class="mb-3">
          ${date_template()}
      </div>
      <div class="mb-3 border bg-light rounded-2 p-2">
        <input
          type="text"
          name="customer_id"
          value="${customer.id}"
          class="form-control mb-1"
          placeholder="Enter Customer ID"
          required
        />
        <input
          type="text"
          name="fname"
          value="${customer.first_name}"
          class="form-control mb-2"
          placeholder="Enter First Name"
          required
        />
        <input
          type="text"
          name="lname"
          value="${customer.last_name}"
          class="form-control mb-2"
          placeholder="Enter Last Name"
          required
        />
        <input
          type="email"
          name="email"
          value="${customer.email}"
          class="form-control mb-2"
          placeholder="Enter Email"
          required
        />
        <input
          type="text"
          name="phone"
          value="${customer.phone}"
          class="form-control mb-2"
          placeholder="Enter Contact Number"
          required
        />
        <input
          type="text"
          name="address"
          value="${customer.shipping_address}"
          class="form-control mb-2"
          placeholder="Enter Address"
          required
        />
        <input
          type="text"
          name="city"
          value="${customer.shipping_city}"
          class="form-control mb-2"
          placeholder="Enter City"
          required
        />
        <span class="ms-1 form-text">Please enter 2 letter State-Code (e.g., CA)</span>
        <input
          type="text"
          name="state"
          value="${customer.shipping_state}"
          maxlength="2"
          pattern="[A-Z]{2}"
          class="form-control mb-2"
          placeholder="Enter State"
          required
        />
        <input
          type="text"
          name="zip"
          value="${customer.shipping_zip}"
          class="form-control"
          placeholder="Enter Zip Code"
          required
        />
      </div>
      <button type="submit" class="btn btn-primary" id="save-contact-button">Submit</button>
  </form>
`;

export default customer_template;
