import { admin_director_template } from "../index.js";

const admin_directors_list_template = (directors) => /*html*/ `
    <ul class="list-group directors-list">
        ${directors
          .map((director) => admin_director_template(director))
          .join("")}
    </ul>
`;

export default admin_directors_list_template;
