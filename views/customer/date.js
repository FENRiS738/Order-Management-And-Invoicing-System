const date_template = () => {
    const today = new Date();
    
    const formattedDate = today.toLocaleDateString('en-CA', { 
        year: 'numeric', 
        month: '2-digit', 
        day: '2-digit' 
    });

    const template = /*html*/`
        <span class="ms-1 form-text">Date</span>
        <input type="date" name="date" class="form-control mb-2" value="${formattedDate}" required>
    `;

    return template;
}

export default date_template;
