const confirm_form_template = () => /*html*/ `
    <form class="custom-form"
            hx-on::after-request="document.querySelector('form').reset()"
            hx-post="/confirm/submit"
            hx-swap="outerHTML"
    >
        <div class="mb-3">
            <select
                class="form-select" 
                name="payment_method"
                hx-post="/confirm" 
                hx-trigger="change"
                hx-target="closest div"
                hx-swap="outerHTML"
                required
            >
                <option selected>Select a payment method</option>
                <option value="stripe">Stripe</option>
                <option value="partial.ly">Partial.ly</option>
                <option value="none">None</option>
            </select>
        </div>
        <button type="submit" class="btn btn-primary">Submit</button>
    </form>
`;


export default confirm_form_template;