import {admin_directors_list_template, admin_locations_list_template} from "../index.js";

const admin_template = (directors, locations) => /*html*/ `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM" crossorigin="anonymous"></script>
        <script src="https://unpkg.com/htmx.org@2.0.3/dist/htmx.js" integrity="sha384-BBDmZzVt6vjz5YbQqZPtFZW82o8QotoM7RUp5xOxV3nSJ8u2pSdtzFAbGKzTlKtg" crossorigin="anonymous"></script>

        <!-- Custom CSS -->
        <link rel="stylesheet" href="/static/style.css" />

        <title>Invoicer</title>
    </head>
    <body>
        <header class="container-fluid p-3 bg-white shadow-sm">
                <a class="navbar-brand fw-semibold fs-3" href="/admin">Home</a>
        </header>
        <main class="container p-5">
        <div class="d-flex mb-3">
                <form 
                    class="custom-form card p-2" name="admin-form"
                    hx-on::after-request="document.querySelector('form').reset()"
                    hx-post="/admin"
                    hx-target=".directors-list" 
                    hx-swap="beforeend"
                >
                    <h2 class="card-header">Add New Director or Location</h2>
                    <div class="card-body p-0 mt-2">
                        <input 
                            class="form-control mb-2"
                            type="text" 
                            name="id" 
                            placeholder="Enter ID..."
                            required 
                        />
                        <input 
                            class="form-control mb-2"
                            type="text" 
                            name="name" 
                            placeholder="Enter Name..."
                            required 
                        />
                        <div class="mb-2">
                            <span class="form-text ms-1">Choose what you want to add</span>
                            <select 
                                class="form-select"
                                name="type"
                                id="type"
                                onchange="setTarget()"
                                required
                            >
                                <option value="directors">Director</option>
                                <option value="locations">Location</option>
                            </select>
                        </div>
                        <button class="btn btn-success">
                            Submit
                        </button>
                    </div>
                </form>
            </div>

            <div class=row >
                <div class="d-flex flex-column col-lg-6 col-md-12 mb-3">
                    <div class="display-6 w-100 border-bottom mb-2 border-dark">Directors</div>
                    ${admin_directors_list_template(directors)}
                </div>
                <div class="d-flex flex-column col-lg-6 col-md-12 mb-3">
                    <div class="display-6 w-100 border-bottom mb-2 border-dark">Locations</div>
                    ${admin_locations_list_template(locations)}
                </div>
            </div>
        </main>

        <!-- Custom JS -->
        <script src="/static/index.js" defer></script>
    </body>
    </html>
`;

export default admin_template;
