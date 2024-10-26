import { admin_location_template } from "../index.js";

const admin_locations_list_template = (locations) => /*html*/ `
    <ul class="list-group locations-list">
        ${locations
          .map((location) => admin_location_template(location))
          .join("")}
    </ul>
`;

export default admin_locations_list_template;
