const confirm_template = (data) => /*html*/ `
    <div class="mb-3">
        <div class="mb-3">
            <span class="form-text ms-1">First Name</span>
            <input 
                type="text" 
                name="fname" 
                class="form-control mb-1"
                value="${data.fname}" 
                readonly
            >
        </div>
        <div class="mb-3">
            <span class="form-text ms-1">Last Name</span>
            <input 
                type="text" 
                name="lname" 
                class="form-control mb-1"
                value="${data.lname}" 
                readonly
            >
        </div>
        <div class="mb-3">
            <span class="form-text ms-1">Director</span>
            <input 
                type="text" 
                name="director" 
                class="form-control mb-1"
                value="${data.director}" 
                readonly
            >
        </div>
        <div class="mb-3">
            <span class="form-text ms-1">Location</span>
            <input 
                type="text" 
                name="location" 
                class="form-control mb-1"
                value="${data.location}" 
                readonly
            >
        </div>
        <div class="mb-3">
            <span class="form-text ms-1">Date</span>
            <input 
                type="date" 
                name="date" 
                class="form-control mb-1"
                value="${data.date}" 
                readonly
            >
        </div>
        <div class="mb-3">
            <span class="form-text ms-1">Address</span>
            <input 
                type="text" 
                name="address" 
                class="form-control mb-1"
                value="${data.address}" 
                readonly
            >
        </div>
        <div class="mb-3">
            <span class="form-text ms-1">City</span>
            <input 
                type="text" 
                name="city" 
                class="form-control mb-1"
                value="${data.city}" 
                readonly
            >
        </div>
        <div class="mb-3">
            <span class="form-text ms-1">State</span>
            <input 
                type="text" 
                name="state" 
                class="form-control mb-1"
                value="${data.state}" 
                readonly
            >
        </div>
        <div class="mb-3">
            <span class="form-text ms-1">Postal Code</span>
            <input 
                type="text" 
                name="zip" 
                class="form-control mb-1"
                value="${data.zip}" 
                readonly
            >
        </div>
        <div class="mb-3">
            <span class="form-text ms-1">Album</span>
            <input 
                type="text" 
                name="album" 
                class="form-control mb-1"
                value="${data.album}" 
                readonly
            >
        </div>
        <div class="mb-3">
            <span class="form-text ms-1">Sub Total</span>
            <input 
                type="number"
                step="0.01" 
                name="sub_total" 
                class="form-control mb-1"
                value="${Number(data.sub_total)}" 
                readonly
            >
        </div>
        <div class="mb-3">
            <span class="form-text ms-1">Tax</span>
            <input 
                type="number"
                step="0.01" 
                name="tax" 
                class="form-control mb-1"
                value="${Number(data.tax)}"
                readonly
            >
        </div>
        <div class="mb-3">
            <span class="form-text ms-1">Grand Total</span>
            <input 
                type="number"
                step="0.01" 
                name="grand_total" 
                class="form-control mb-1"
                value="${Number(data.grand_total)}" 
                readonly
            >
        </div>
        <div class="mb-3">
            <span class="form-text ms-1">Payment Method</span>
            <input 
                type="text" 
                name="payment_method" 
                class="form-control mb-1"
                value="${data.payment_method}"
                readonly
            >
        </div>
        <textarea 
            name="items"
            class="form-control mb-1" 
            hidden
            readonly
        >${data.items}</textarea>
    </div>
    <button 
            type="submit" 
            class="btn btn-primary" 
            hx-on::after-request="document.querySelector('form').reset();"
            hx-post="/confirm/submit"
            hx-swap="outerHTML" 
            hx-target=".custom-form"
            hx-on:click="this.disabled = true; startLoadingAnimation(event, this)" 
        >
            Submit
        </button>
`;

export default confirm_template;
