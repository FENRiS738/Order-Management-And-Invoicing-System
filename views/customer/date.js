const date_template = () => {
    const today = new Date().toISOString().split('T')[0];

    const template = /*html*/`
        <span class="ms-1 form-text">Date</span>
        <input type="date" name="date" class="form-control mb-2" value="${today}" required>
    `;

    return template;
}

export default date_template;
