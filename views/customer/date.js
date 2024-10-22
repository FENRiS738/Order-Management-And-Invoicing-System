const date_template = () => {
    const today = new Date().toISOString().split('T')[0];

    const template = /*html*/`
        <input type="date" name="date" class="form-control" value="${today}" required>
    `;

    return template;
}

export default date_template;
