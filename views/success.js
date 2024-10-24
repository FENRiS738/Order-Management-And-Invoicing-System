const success_template = () => /*html*/ `
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
                  <div class="custom-form card">
                    <div class="card-header">
                        <h3>
                            Success
                        </h3>
                    </div>
                    <div class="card-body">
                        <p>
                            Thank you for your payment. We have received it successfully, and your transaction is complete. If you have any questions or need further assistance, feel free to contact us.
                        </p>
                    </div>
                  </div>
              </div>
          </main>
      </body>
      </html>
  `;

export default success_template;
