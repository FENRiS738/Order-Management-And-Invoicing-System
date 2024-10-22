import DIRECTORS from "../../data/directors.js";
import { director_template } from "../index.js";

const directors_list_template = () => /*html*/ `
    <select class="form-select" name="director" required>
        ${DIRECTORS.map((director) => director_template(director)).join("")}
    </select>
    <span class="form-text ms-1">Select the Director</span>
`;

export default directors_list_template;
