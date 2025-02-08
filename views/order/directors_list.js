import { director_template } from "../index.js";

const directors_list_template = (directors) => /*html*/ `
    <span class="form-text mb-1">Art Director</span>
    <select class="form-select" name="director" required>
        <option value="" selected disabled>Select Art Director</option>
        ${directors.map((director) => director_template(director)).join("")}
    </select>
`;

export default directors_list_template;
