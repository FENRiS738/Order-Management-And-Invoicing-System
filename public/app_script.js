function formattedData(rawData) {
  let data = {
    fname: rawData.fname[0],
    lname: rawData.lname[0],
    date: rawData.date[0],
    address: rawData.address[0],
    city: rawData.city[0],
    state: rawData.state[0],
    items: JSON.parse(rawData.items[0]),
    sub_total: rawData.sub_total[0],
    total_tax: rawData.tax[0],
    grand_total: rawData.grand_total[0],
    payment_method: rawData.payment_method[0],
    album: rawData.album[0]  // Extracting the album field
  };

  return data;
}

function getProductTableFromData(items) {
  var tableData = [];

  items.forEach(function (item) {
    tableData.push([item.description, item.image_name.split(",").join("\n"), item.quantity]);
  });
  return tableData;
}

function formatTableColumns(table) {
  table.setColumnWidth(0, 230); // Adjust width for "Description"
  table.setColumnWidth(1, 230); // Adjust width for "Images"
  table.setColumnWidth(2, 50);  // Adjust width for "Quantity"
}

function formatCurrency(value) {
  return "$" + parseFloat(value).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

function main(data) {
  // Create album folder at the root level of Google Drive
  const albumFolder = DriveApp.createFolder(data.album);

  // Create a copy of the template document
  let doc = DriveApp.getFileById("1D9HHVLZHbqIZr7aJJ9Pp_VpmlneNA1mTeoA_K_LC16k");
  let newDoc = doc.makeCopy(`Invoice: ${data.fname} ${data.date}`);
  albumFolder.addFile(newDoc); // Move new document to the album folder

  let openDoc = DocumentApp.openById(newDoc.getId());
  let body = openDoc.getBody();

  // Replace placeholders with actual data
  body.replaceText("{{Date}}", data.date);
  body.replaceText("{{First_Name}}", data.fname);
  body.replaceText("{{Last_Name}}", data.lname);
  body.replaceText("{{Address}}", data.address);
  body.replaceText("{{City}}", data.city);
  body.replaceText("{{State}}", data.state);

  if (data.payment_method === "stripe") {
    body.replaceText("{{Status}}", "Paid");
    body.replaceText("{{Status_Description}}", "Thank you for completing the payment process.");
  } else if (data.payment_method === "partial.ly") {
    body.replaceText("{{Status}}", "Open");
    body.replaceText("{{Status_Description}}", "To check your current payment plan balance, please visit partial.ly/customer.");
  } else {
    body.replaceText("{{Status}}", "None");
  }

  // if (data.payment_method === "none") {
  //   body.replaceText("{{Sub_Total}}", "0.0");
  //   body.replaceText("{{Sales_Tax}}", "0.0");
  //   body.replaceText("{{Grand_Total}}", "0.0");
  // } else {
  //   body.replaceText("{{Sub_Total}}", data.sub_total);
  //   body.replaceText("{{Sales_Tax}}", data.total_tax);
  //   body.replaceText("{{Grand_Total}}", data.grand_total);
  // }

  // Format and replace totals with currency format
  if (data.payment_method === "none") {
    body.replaceText("{{Sub_Total}}", formatCurrency(0));
    body.replaceText("{{Sales_Tax}}", formatCurrency(0));
    body.replaceText("{{Grand_Total}}", formatCurrency(0));
  } else {
    body.replaceText("{{Sub_Total}}", formatCurrency(data.sub_total));
    body.replaceText("{{Sales_Tax}}", formatCurrency(data.total_tax));
    body.replaceText("{{Grand_Total}}", formatCurrency(data.grand_total));
  }

  let tableData = getProductTableFromData(data.items);
  let tableElement = body.findText("{{Table}}");
  let table = body.insertTable(body.getChildIndex(tableElement.getElement().getParent()), tableData);
  tableElement.getElement().removeFromParent();

  // Format table columns
  formatTableColumns(table);

  openDoc.saveAndClose();

  // Convert the document to PDF
  let pdf = DriveApp.getFileById(newDoc.getId()).getAs('application/pdf');
  let pdfFile = albumFolder.createFile(pdf).setName(`Invoice: ${data.fname} ${data.date}.pdf`);

  // Make the PDF publicly accessible
  pdfFile.setSharing(DriveApp.Access.ANYONE, DriveApp.Permission.VIEW);

  // Generate public links for the PDF
  let pdfDownloadLink = `https://drive.google.com/uc?export=download&id=${pdfFile.getId()}`;
  let pdfViewLink = `https://drive.google.com/file/d/${pdfFile.getId()}/view`;

  return { pdfDownloadLink, pdfViewLink };
}

function doGet(e) {
  let rawData = e.parameters;
  let data = formattedData(rawData);
  let { pdfDownloadLink, pdfViewLink } = main(data);

  // Create a JSON response
  let jsonResponse = {
    success: true,
    message: "Invoice generated successfully.",
    pdf_url: pdfDownloadLink,
    view_url: pdfViewLink
  };

  // Return JSON output
  return ContentService
    .createTextOutput(JSON.stringify(jsonResponse))
    .setMimeType(ContentService.MimeType.JSON);
}
