import { acknowledge_field_template } from "../index.js";

const acknowledge_template = (data) => /*html*/`
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
    <main class="container">
      <div class="form-wrapper p-5">
        <form class="custom-form card"
          action="/acknowledge/checkout"
          method="post"
        >
          <h1 class="card-header">Order Acknowledgement</h1>
      
          <div class="card-body">
              <p class="mb-3">
                  I authorize Bluebird Portraits to immediately commence work on the
                  products ordered. Once the order is finalized, there are immediate
                  costs associated with the order including credit card processing fees,
                  artist retouching, printing etc. Therefore, I understand that this is
                  a custom order and cannot be changed or canceled. Orders will be put
                  into production immediately and may take between 3-8 weeks to
                  complete.
              </p>
              ${acknowledge_field_template(data)}
          </div>
          <div class="card-footer">
            <button type="submit" class="btn btn-primary">Submit</button>
          </div>
        </form>
      </div>
    </main>

    <!-- Custom JS -->
    <script src="/static/index.js" defer></script>
  </body>
</html>
`;

export default acknowledge_template;