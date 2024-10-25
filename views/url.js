const url_template = (fullUrl, invoiceViewURL) => /*html*/ `
    <div class="custom-form">
        <p class="border rounded-3 w-100 p-2" id="copy-text">
            ${fullUrl}
        </p>
        <button type="button" class="btn btn-primary" onclick="copyUrl()">Copy</button>
    </div>
    <script defer>
        window.open('${invoiceViewURL}', '_blank');
    </script>

`;

export default url_template;
