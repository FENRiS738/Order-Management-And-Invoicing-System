let globalObject = {
    fname: '',
    lname: '',
    address: '',
    city: '',
    state: '',
    orderTotal: ''
} 

function setCustomerData(data){
    document.getElementById('fname').value = data.first_name || "";
    document.getElementById('lname').value = data.last_name || "";
    document.getElementById('email').value = data.email || "";
    document.getElementById('phone').value = data.phone || "";
    document.getElementById('address').value = data.shipping_address || "";
    document.getElementById('city').value = data.shipping_city || "";
    document.getElementById('state').value = data.shipping_state || "";
}

function setCustomerDataVisible(){
    document.getElementById('customer_details').classList.remove('hidden');
}

function setCustomerGlobalData(data){
    globalObject.fname = data.first_name || "";
    globalObject.lname = data.last_name || "";
    globalObject.address = data.shipping_address || "";
    globalObject.city = data.shipping_city || "";
    globalObject.state = data.shipping_state || "";
}

async function getCustomerData(event){
    event.preventDefault();

    const form = document.forms['sales_form']
    const customer_id = form["customer_id"].value;
    
    if (!customer_id) {
        alert("Please enter a customer id.");
        return;
    }

    const formData = new FormData();
    formData.append("customer_id", customer_id);

    try{
        let response = await fetch('https://hook.eu1.make.com/p3gu8v3v1n1yln1pbhjnooanss6gmt8y', {
            method: "POST",
            body: formData,
        })

        if(!response.ok){
            alert(`There was an error while fetching customer: ${response.status}.\nPlease refresh the form.`);
            form.reset();
        }

        let data = await response.json();
        
        console.log(data);
        setCustomerData(data);
        setCustomerGlobalData(data);
        setCustomerDataVisible();
        return;

    } catch (error) {
        alert(`An error occured: ${error}.\nPlease refresh the form.`);
        form.reset();
    }   
}

function nextOrderPage(event){
    event.preventDefault();
    
    document.getElementById('customer_section').classList.add('hidden');
    document.getElementById('order_section').classList.remove('hidden');
}

/* ------------------------------------------------------------------------------------------------- */

function setOrderData(data){
    document.getElementById('album').value = data[0].album_name || "";

    const orders = data[0].orders;
    let order_items = document.getElementById('order_items');
    order_items.innerHTML = '';

    orders.forEach((item, index) => {
        let element = document.createElement("div");
        // element.classList.add("item", "mb-3", "card", "p-2");
        element.id = `item-${index}`; 

        element.innerHTML = `
            <span class="">${item.product_name.trim()}</span><br>
            <div class="">
                <span class="">Description</span><br>
                <input type="text" name="description" id="description" value="${item.description.trim()}" class="form-control" required>
            </div>

            <div class="">
                <span class="">Quantity</span><br>
                <input type="number" name="quantity" id="quantity" value="${item.quantity}" class="form-control" required>
            </div>

            <div class="">
                <span class="">Sub Total</span><br>
                <input type="number" name="item_amount" id="item_amount" value="${item.order_amount}" class="form-control" required>
            </div>

            <div class="">
                <span class="">Tax</span><br>
                <input type="number" name="item_tax" id="item_tax" value="${item.order_tax_amount}" class="form-control" required>
            </div>

            <div class="">
                <span class="">Grand Total</span><br>
                <input type="number" name="item_total" id="item_total" value="${item.order_grand_total}" class="form-control" required>
            </div>

            <div class="">
                <span class="">Image Name</span><br>
                <input type="text" name="image_name" id="image_name"
                value="${['.JPG', '.PNG', '.JPEG', '.png', '.jpg', '.jpeg'].some(ext => item.image_name.includes(ext)) ? item.image_name.trim() : ''}"
                class="form-control" required>
            </div>
        `
        order_items.appendChild(element);
    });

    document.getElementById('total').value = data[0].orders_total || 0;
}

function setOrderDataVisible(){
    document.getElementById('order_details').classList.remove('hidden');
}

function setOrderGlobalData(data){
    globalObject.orderTotal = data[0].orders_total || 0;
}

async function getOrderData(event){
    event.preventDefault();

    const form = document.forms['sales_form']
    const xml_file = form["xml_file"].files[0];
    
    if (!xml_file) {
        alert("Please select a XML file.");
        return;
    }

    const formData = new FormData();
    formData.append("xml_file", xml_file);

    try{
        let response = await fetch('https://hook.eu1.make.com/9e1kp6jvf121jusdl1llq5osy00hl4wt', {
            method: "POST",
            body: formData,
        })

        if(!response.ok){
            alert(`There was an error while parsing xml file: ${response.status}.\nPlease refresh the form.`);
            form.reset();
        }

        let data = await response.json();
        
        console.log(data);
        setOrderData(data);
        setOrderGlobalData(data);
        setOrderDataVisible();
        return;

    } catch (error) {
        alert(`An error occured: ${error}.\nPlease refresh the form.`);
        form.reset();
    }   
}

function previousCustomerPage(event){
    event.preventDefault();
    
    document.getElementById('customer_section').classList.remove('hidden');
    document.getElementById('order_section').classList.add('hidden');
}

function nextConfirmationPage(event){
    event.preventDefault();
    
    document.getElementById('confirmation_section').classList.remove('hidden');
    document.getElementById('order_section').classList.add('hidden');
}

/* ------------------------------------------------------------------------------------------------------- */ 

function getConfirmData(event){
    event.preventDefault();

    setConfirmData();
    setConfirmDataVisible();
}

function setConfirmData(){
    document.getElementById('confirm_fname').value = globalObject.fname;
    document.getElementById('confirm_lname').value = globalObject.lname;
    document.getElementById('confirm_address').value = globalObject.address;
    document.getElementById('confirm_city').value = globalObject.city;
    document.getElementById('confirm_state').value = globalObject.state;
    document.getElementById('confirm_total').value = globalObject.orderTotal;
}

function setConfirmDataVisible(){
    document.getElementById('confirm_details').classList.remove('hidden');
}

function previousOrderPage(event){
    event.preventDefault();
    
    document.getElementById('confirmation_section').classList.add('hidden');
    document.getElementById('order_section').classList.remove('hidden');
}

/* ------------------------------------------------------------------------------------------------- */