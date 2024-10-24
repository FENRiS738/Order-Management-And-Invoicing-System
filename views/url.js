const url_template = (fullUrl) => /*html*/ `
    <p class="border-0 border-bottom w-100" id="copy-text">
        ${fullUrl}
    </p>
    <button type="button" class="btn btn-primary" onclick="copyUrl(event)">Copy</button>
`;

export default url_template;
