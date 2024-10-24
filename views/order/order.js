import { item_template } from "../index.js";

const order_template = (order) => /*html*/ `
<div class="mb-3">
    <div class="mb-3">
        <label for="album" class="form-label mb-1">
            Album
        </label>
        <input
            type="text"
            name="album"
            id="album"
            value="${order.album}"
            class="form-control mb-1"
            placeholder="Enter Album Name"
            required
        />
    </div>
    ${order.abstract_order_items.map((item, index) => item_template(item, index)).join("")}
    <div class="mb-3">
        <label for="sub_total" class="form-label mb-1">
            Sub Total
        </label>
        <input
            type="number"
            name="sub_total"
            id="sub_total"
            value="${Number(order.order_sub_total)}"
            step="0.01"
            class="form-control mb-1"
            placeholder="Enter Sub Total Name"
            required
        />
    </div>
    <div class="mb-3">
        <label for="tax" class="form-label mb-1">
            Tax
        </label>
        <input
            type="number"
            name="tax"
            id="tax"
            value="${Number(order.order_tax)}"
            step="0.01"
            class="form-control mb-1"
            placeholder="Enter Tax Name"
            required
        />
    </div>
    <div>
        <label for="grand_total" class="form-label mb-1">
            Grand Total
        </label>
        <input
            type="number"
            name="grand_total"
            id="grand_total"
            value="${Number(order.order_grand_total)}"
            step="0.01"
            class="form-control mb-1"
            placeholder="Enter Grand Total Name"
            required
        />
    <div>
</div>
`;

export default order_template;