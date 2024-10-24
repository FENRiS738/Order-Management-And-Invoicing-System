import { acknowledge_field_template } from "../index.js";

const acknowledge_template = (data) => /*html*/`
    <form class="custom-form card"
        action="/acknowledge/checkout"
        method="post"
      >
        <h1 class="card-header">Order Acknowledgement</h1>
        
        <div class="card-body">
            <p class="mb-3">
                I authorize Bluebird Portraits to immediately commence work on the
                products ordered. Once the order is finalized, there are immediate
                costs associated with the order including credit card processing fees,
                artist retouching, printing etc. Therefore, I understand that this is
                a custom order and cannot be changed or canceled. Orders will be put
                into production immediately and may take between 3-8 weeks to
                complete.
            </p>
            ${acknowledge_field_template(data)}
        </div>
        <div class="card-footer">
          <button type="submit" class="btn btn-primary">Submit</button>
        </div>
      </form>
`;

export default acknowledge_template;