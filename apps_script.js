// function formattedData(parsed_data) {
//   let data = {
//     date: parsed_data.date[0],
//     fname: parsed_data.fname[0],
//     lname: parsed_data.lname[0],
//     address: parsed_data.address[0],
//     city: parsed_data.city[0],
//     state: parsed_data.state[0],
//     items: JSON.parse(parsed_data.items[0]),
//     sub_total: parsed_data.sub_total[0],
//     total_tax: parsed_data.total_tax[0],
//     grand_total: parsed_data.grand_total[0],
//     payment_method: parsed_data.payment[0]
//   }

//   return data;
// }

// function getProductTableFromData(items) {
//   var tableData = [];
//   items.forEach(function (item) {
//     tableData.push([item.product_name + "\n" + item.description, item.image_name, item.quantity]);
//   });
//   return tableData;
// }

// function formatTableColumns(table) {
//   table.setColumnWidth(0, 100); // Adjust width for "Product Name"
//   table.setColumnWidth(1, 100); // Adjust width for "Images"
//   table.setColumnWidth(2, 100);  // Adjust width for "Quantity"
// }


// function main(rawData) {
//   let parsed_data = JSON.parse(rawData);

//   let doc = DriveApp.getFileById("1D9HHVLZHbqIZr7aJJ9Pp_VpmlneNA1mTeoA_K_LC16k");
//   let newDoc = doc.makeCopy().setName("Invoice");
//   let openDoc = DocumentApp.openById(newDoc.getId());
//   let body = openDoc.getBody();

//   let data = formattedData(parsed_data);

//   let tableData = getProductTableFromData(data.items);

//   body.replaceText("{{Date}}", data.date);
//   body.replaceText("{{First_Name}}", data.fname);
//   body.replaceText("{{Last_Name}}", data.lname);
//   body.replaceText("{{Address}}", data.address);
//   body.replaceText("{{City}}", data.city);
//   body.replaceText("{{State}}", data.state);
//   body.replaceText("{{Sub_Total}}", data.sub_total);
//   body.replaceText("{{Sales_Tax}}", data.total_tax);
//   body.replaceText("{{Grand_Total}}", data.grand_total);

//   let table = body.replaceText("{{Table}}", tableData);

//   formatTableColumns(table);

//   openDoc.saveAndClose();
// }

// function doGet(e) {
//   let rawData = JSON.stringify(e.parameters);
//   main(rawData);
//   return ContentService.createTextOutput(`Data appended successfully: ${rawData}`);
// }




function formattedData(parsed_data) {
    let data = {
      date: parsed_data.date[0],
      fname: parsed_data.fname[0],
      lname: parsed_data.lname[0],
      address: parsed_data.address[0],
      city: parsed_data.city[0],
      state: parsed_data.state[0],
      items: JSON.parse(parsed_data.items[0]),
      sub_total: parsed_data.sub_total[0],
      total_tax: parsed_data.total_tax[0],
      grand_total: parsed_data.grand_total[0],
      payment_method: parsed_data.payment[0]
    }
  
    return data;
  }
  
  function getProductTableFromData(items) {
    var tableData = [];
    
    // Header row for the table
    tableData.push(["Product", "Description", "Images", "Quantity"]);
    
    items.forEach(function (item) {
      tableData.push([item.product_name, item.description, item.image_name, item.quantity]);
    });
    return tableData;
  }
  
  function formatTableColumns(table) {
    table.setColumnWidth(0, 100); // Adjust width for "Product Name"
    table.setColumnWidth(1, 200); // Adjust width for "Description"
    table.setColumnWidth(2, 100); // Adjust width for "Images"
    table.setColumnWidth(3, 50);  // Adjust width for "Quantity"
  }
  
  function main(rawData) {
    let parsed_data = JSON.parse(rawData);
  
    let doc = DriveApp.getFileById("1D9HHVLZHbqIZr7aJJ9Pp_VpmlneNA1mTeoA_K_LC16k");
    let newDoc = doc.makeCopy().setName("Invoice");
    let openDoc = DocumentApp.openById(newDoc.getId());
    let body = openDoc.getBody();
  
    let data = formattedData(parsed_data);
  
    // Replacing placeholders with actual data
    body.replaceText("{{Date}}", data.date);
    body.replaceText("{{First_Name}}", data.fname);
    body.replaceText("{{Last_Name}}", data.lname);
    body.replaceText("{{Address}}", data.address);
    body.replaceText("{{City}}", data.city);
    body.replaceText("{{State}}", data.state);
    body.replaceText("{{Sub_Total}}", data.sub_total);
    body.replaceText("{{Sales_Tax}}", data.total_tax);
    body.replaceText("{{Grand_Total}}", data.grand_total);
  
    // Generating product table and inserting it into the document
    let tableData = getProductTableFromData(data.items);
    let table = body.insertTable(body.getChildIndex(body.appendParagraph(" ")), tableData);
  
    // Formatting table columns
    formatTableColumns(table);
  
    openDoc.saveAndClose();
  }
  
  function doGet(e) {
    let rawData = JSON.stringify(e.parameters);
    main(rawData);
    return ContentService.createTextOutput(`Data appended successfully: ${rawData}`);
  }
  