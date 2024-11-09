const item_template = (item, index) => /*html*/`
    <div class="border rounded-3 bg-light p-2 mb-3">
        <input
            type="text"
            name="product_${index + 1}"
            value="${item.name}"
            class="form-control mb-1"
            placeholder="Enter Product Name"
            required
        />
        <input
            type="text"
            name="description_${index + 1}"
            value="${item.description}"
            class="form-control mb-1"
            placeholder="Enter Description"
            required
        />
        <input
            type="number"
            name="quantity_${index + 1}"
            value="${item.quantity}"
            class="form-control mb-1"
            placeholder="Enter Quantity"
            required
        />
        <textarea 
            name="image_name_${index + 1}" 
            class="form-control mb-1" 
            rows="3" 
            required
        >${item.images}</textarea>
    </div>
`;

export default item_template;