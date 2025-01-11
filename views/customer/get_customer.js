const get_customer_template = () => /*html*/ `
    <form 
        class="custom-form"
        hx-post="/customers" 
        hx-swap="outerHTML"
        hx-on:submit="document.getElementById('get-contact-button').disabled = true; startFetchingAnimation(event, document.getElementById('get-contact-button'))"
    >
        <div class="mb-3">
            <input
                type="text"
                name="customer_id"
                id="customer_id"
                placeholder="Enter Customer ID"
                class="form-control mb-2"
                required
            />
            <button 
                type="submit"
                class="btn btn-warning"
                id="get-contact-button"
            >
                Generate
            </button>
        </div>
    </form>
`;

export default get_customer_template;
