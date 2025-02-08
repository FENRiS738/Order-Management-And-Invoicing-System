import { location_template } from "../index.js";

const locations_list_template = (locations) => /*html*/ `
    <span class="form-text mb-1">Location</span>
    <select class="form-select" name="location" required>
        <option value="" selected disabled>Select Location</option>
        ${locations.map((location) => location_template(location)).join("")}
    </select>
`;

export default locations_list_template;
