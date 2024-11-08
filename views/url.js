const url_template = (fullUrl, invoiceViewURL) => /*html*/ `
    <div class="custom-form">
        <p class="border rounded-3 w-100 p-2" id="copy-text">
            ${fullUrl}
        </p>
        <button type="button" class="btn btn-primary" onclick="copyUrl(event)">Copy</button>
    </div>
    <div class="mt-3 custom-form hidden" id="order-commit-div">
        <div class="card">
            <div class="card-header">
                <h3>Order</h3>
            </div>
            <div class="card-body">
                <p>
                    Please commit this Order.
                </p>
                <button type="button" class="btn btn-primary" onclick="commitOrder(event)">Commit Order</button>
            </div>
        </div>
    </div>
    <script defer>
        window.open('${invoiceViewURL}', '_blank');
    </script>
`;

export default url_template;
