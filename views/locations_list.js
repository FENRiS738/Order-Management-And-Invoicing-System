import LOCATIONS from "../data/locations.js";
import { location_template } from "./index.js";

const locations_list_template = () => /*html*/ `
    <select class="form-select" name="location" required>
        ${LOCATIONS.map((location) => location_template(location)).join("")}
    </select>
    <span class="form-text ms-1">Select the Location</span>
`;

export default locations_list_template;
