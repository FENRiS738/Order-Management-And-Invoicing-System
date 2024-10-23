const order_form_template = () => /*html*/ `
    <form class="custom-form"
            hx-on::after-request="document.querySelector('form').reset()"
            hx-post="/orders/submit"
            hx-swap="outerHTML"
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
        <button type="submit" class="btn btn-primary">Submit</button>
    </form>
`;


export default order_form_template;