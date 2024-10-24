const acknowledge_field_template = (data) => /*html*/ `
<div class="mb-3">
    <div class="form-check">
        <input 
            type="checkbox" 
            name="acknowledge" 
            id="acknowledge" 
            class="form-check-input" 
            required
        >
        <label 
            for="acknowledge" 
            class="form-check-label"
        >
            ${data.fname + " " + data.lname}
        </label>
    </div>
    <input type="hidden" name="album" value="${data.album}" required>
    <input type="hidden" name="fname" value="${data.fname}" required>
    <input type="hidden" name="lname" value="${data.lname}" required>
    <input type="hidden" name="director" value="${data.director}" required>
    <input type="hidden" name="location" value="${data.location}" required>
    <input type="hidden" name="grand_total" value="${data.grand_total}" required>
    <input type="hidden" name="payment_method" value="${data.payment_method}" required>
</div>  
`;

export default acknowledge_field_template;
