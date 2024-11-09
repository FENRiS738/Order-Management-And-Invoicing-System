const order_form_template = () => /*html*/ `
    <form 
        class="custom-form"
        hx-on::after-request="document.querySelector('form').reset()"
        hx-post="/orders/submit"
        hx-swap="outerHTML"
        hx-on:submit="document.getElementById('save-order-button').disabled = true; startStoringOrderAnimation(event, document.getElementById('save-order-button'))"
    >
        <div class="mb-3">
            <input
                type="file"
                name="xml_file"
                hx-post="/orders"
                hx-encoding="multipart/form-data"
                hx-trigger="change"
                hx-target="closest div"
                hx-swap="outerHTML"
                class="form-control me-2"
                accept=".xml"
                required
            />
        </div>
    </form>
`;


export default order_form_template;