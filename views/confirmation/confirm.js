const confirm_template = (data) => /*html*/`
    <div class="mb-3">
        <input 
            type="text" 
            name="fname" 
            class="form-control mb-1"
            value="${data.fname}" 
            readonly
        >
        <input 
            type="text" 
            name="lname" 
            class="form-control mb-1"
            value="${data.lname}" 
            readonly
        >
        <input 
            type="date" 
            name="date" 
            class="form-control mb-1"
            value="${data.date}" 
            readonly
        >
        <input 
            type="text" 
            name="address" 
            class="form-control mb-1"
            value="${data.address}" 
            readonly
        >
        <input 
            type="text" 
            name="city" 
            class="form-control mb-1"
            value="${data.city}" 
            readonly
        >
        <input 
            type="text" 
            name="state" 
            class="form-control mb-1"
            value="${data.state}" 
            readonly
        >
        <input 
            type="text" 
            name="album" 
            class="form-control mb-1"
            value="${data.album}" 
            readonly
        >
        <input 
            type="number"
            step="0.01" 
            name="sub_total" 
            class="form-control mb-1"
            value="${Number(data.sub_total)}" 
            readonly
        >
        <input 
            type="number"
            step="0.01" 
            name="tax" 
            class="form-control mb-1"
            value="${Number(data.tax)}"
            readonly
        >
        <input 
            type="number"
            step="0.01" 
            name="grand_total" 
            class="form-control mb-1"
            value="${Number(data.grand_total)}" 
            readonly
        >
        <input 
            type="text" 
            name="payment_method" 
            class="form-control mb-1"
            value="${data.payment_method}"
            readonly
        >
        <textarea 
            name="items"
            class="form-control mb-1" 
            hidden
            readonly
        >${data.items}"</textarea>
    </div>
`;

export default confirm_template;