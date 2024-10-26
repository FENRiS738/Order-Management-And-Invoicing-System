const admin_location_template = (location) => /*html*/ `
    <li class="list-group-item mb-1 rounded-3 d-flex flex-row align-items-center">
        <div>
            <h5>${location.name}</h5>
            <p>${location.id}</p>
        </div>
        <button 
            hx-delete="/admin/${location.id}"
            hx-target="closest li" 
            hx-swap="outerHTML"
            class="btn btn-danger ms-auto"
        >
            Delete
        </button>
    </li>
`;

export default admin_location_template;
