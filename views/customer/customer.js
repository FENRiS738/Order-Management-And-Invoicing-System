const customer_template = (customer) => /*html*/ `
    <div class="mb-3 border rounded-2 p-2">
      <input
        type="text"
        name="id"
        value="${customer.id}"
        class="form-control mb-1"
        placeholder="Enter Customer ID"
        required
      />
      <input
        type="text"
        name="fname"
        value="${customer.first_name}"
        class="form-control mb-1"
        placeholder="Enter First Name"
        required
      />
      <input
        type="text"
        name="lname"
        value="${customer.last_name}"
        class="form-control mb-1"
        placeholder="Enter Last Name"
        required
      />
      <input
        type="email"
        name="email"
        value="${customer.email}"
        class="form-control mb-1"
        placeholder="Enter Email"
        required
      />
      <input
        type="text"
        name="phone"
        value="${customer.phone}"
        class="form-control mb-1"
        placeholder="Enter Contact Number"
        required
      />
      <input
        type="text"
        name="address"
        value="${customer.shipping_address}"
        class="form-control mb-1"
        placeholder="Enter Address"
        required
      />
      <input
        type="text"
        name="city"
        value="${customer.shipping_city}"
        class="form-control mb-1"
        placeholder="Enter City"
        required
      />
      <input
        type="text"
        name="state"
        value="${customer.shipping_state}"
        class="form-control mb-1"
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
    <button type="submit" class="btn btn-primary">Submit</button>
`;

export default customer_template;
