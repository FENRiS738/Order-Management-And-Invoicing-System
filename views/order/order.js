import { item_template } from "../index.js";

const order_template = (order) => /*html*/ `
<div class="mb-3">
    <input
        type="text"
        name="album"
        value="${order.album}"
        class="form-control mb-1"
        placeholder="Enter Album Name"
        required
    />
    ${order.abstract_order_items.map((item, index) => item_template(item, index)).join("")}
    <input
        type="number"
        name="sub_total"
        value="${Number(order.order_sub_total)}"
        step="0.01"
        class="form-control mb-1"
        placeholder="Enter Sub Total Name"
        required
    />
    <input
        type="number"
        name="tax"
        value="${Number(order.order_tax)}"
        step="0.01"
        class="form-control mb-1"
        placeholder="Enter Tax Name"
        required
    />
    <input
        type="number"
        name="grand_total"
        value="${Number(order.order_grand_total)}"
        step="0.01"
        class="form-control mb-1"
        placeholder="Enter Grand Total Name"
        required
    />
</div>
`;

export default order_template;