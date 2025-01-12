import { director_template } from "../index.js";

const directors_list_template = (directors) => /*html*/ `
    <select class="form-select" name="director" required>
        ${directors.map((director) => director_template(director)).join("")}
    </select>
    <span class="form-text ms-1">Select the Director</span>
`;

export default directors_list_template;
