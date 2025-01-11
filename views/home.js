import { 
    get_customer_template
} from "../views/index.js";

const home = () => /*html*/ `
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
                <a class="navbar-brand fw-semibold fs-3" href="/">Home</a>
        </header>
        <main class="container">
            <div class="form-wrapper p-5">
                ${get_customer_template()}
            </div>
        </main>

        <!-- Custom JS -->
        <script src="/static/index.js" defer></script>
    </body>
    </html>
`;

export default home;
