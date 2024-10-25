const admin_director_template = (director) => /*html*/ `
    <li class="list-group-item mb-1 rounded-3 d-flex flex-row align-items-center">
        <div>
            <h5>${director.name}</h5>
            <p>${director.id}</p>
        </div>
        <button 
            hx-delete="/admin/${director.id}"
            hx-target="closest li" 
            hx-swap="outerHTML"
            class="btn btn-danger ms-auto"
        >
            Delete
        </button>
    </li>
`;

export default admin_director_template;
