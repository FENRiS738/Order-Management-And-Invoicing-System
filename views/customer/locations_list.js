import { location_template } from "../index.js";

const locations_list_template = (locations) => /*html*/ `
    <select class="form-select" name="location" required>
        ${locations.map((location) => location_template(location)).join("")}
    </select>
    <span class="form-text ms-1">Select the Location</span>
`;

export default locations_list_template;
