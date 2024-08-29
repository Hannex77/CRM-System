// Kunden- und Auftragsdaten aus dem Local Storage laden oder initialisieren
let customers = JSON.parse(localStorage.getItem('customers')) || [];
let orders = JSON.parse(localStorage.getItem('orders')) || {};
let selectedCustomerId = null;

// Aktuelle Seite identifizieren
const currentPage = window.location.pathname.split("/").pop();

// Funktion zum Speichern der Kundenliste und der Aufträge im Local Storage
function saveData() {
    localStorage.setItem('customers', JSON.stringify(customers));
    localStorage.setItem('orders', JSON.stringify(orders));
}

// Funktionen für verschiedene Seiten
if (currentPage === "kundenuebersicht.html") {
    renderCustomers();

} else if (currentPage === "kundenregistrierung.html") {
    document.getElementById('customerForm').addEventListener('submit', (event) => {
        event.preventDefault();
        let newCustomer = {
            name: event.target.name.value,
            email: event.target.email.value,
            phone: event.target.phone.value
        };
        customers.push(newCustomer);
        saveData();
        window.location.href = "kundenuebersicht.html";
    });

} else if (currentPage === "auftraege.html") {
    selectedCustomerId = localStorage.getItem('selectedCustomerId');
    let customer = customers[selectedCustomerId];
    document.getElementById('customerName').innerText = customer.name;
    renderOrders();

    const orderForm = document.getElementById('orderForm');
    const orderIdInput = document.getElementById('orderId');

    // Funktion zum Generieren der Auftrags-ID
    function generateOrderId(state, type, customerId) {
        const year = new Date().getFullYear();
        const country = 'DE';
        return `${year}-${state}-${type}-${customerId}-${country}`;
    }

    // Setze die generierte Auftrags-ID beim Absenden des Formulars
    orderForm.addEventListener('submit', (event) => {
        event.preventDefault();
        let state = document.getElementById('state').value;
        let type = document.getElementById('type').value;
        let orderId = generateOrderId(state, type, selectedCustomerId);
        
        let newOrder = {
            id: orderId,
            description: event.target.orderDescription.value
        };

        if (!orders[selectedCustomerId]) {
            orders[selectedCustomerId] = [];
        }
        orders[selectedCustomerId].push(newOrder);
        saveData();
        renderOrders();
        event.target.reset();
    });

} else if (currentPage === "alleauftraege.html") {
    renderAllOrders();
}

// Funktion zum Rendern der Kundenliste
function renderCustomers() {
    const customersTable = document.getElementById('customersTable').getElementsByTagName('tbody')[0];
    customersTable.innerHTML = '';
    customers.forEach((customer, index) => {
        let row = customersTable.insertRow();
        row.insertCell(0).innerText = index + 1;
        row.insertCell(1).innerText = customer.name;
        row.insertCell(2).innerText = customer.email;
        row.insertCell(3).innerText = customer.phone;
        let actionsCell = row.insertCell(4);

        let viewOrdersBtn = document.createElement('button');
        viewOrdersBtn.innerText = 'Aufträge anzeigen';
        viewOrdersBtn.onclick = () => {
            localStorage.setItem('selectedCustomerId', index);
            window.location.href = "auftraege.html";
        };
        actionsCell.appendChild(viewOrdersBtn);

        let deleteBtn = document.createElement('button');
        deleteBtn.innerText = 'Löschen';
        deleteBtn.onclick = () => deleteCustomer(index);
        actionsCell.appendChild(deleteBtn);
    });
}

// Funktion zum Löschen eines Kunden
function deleteCustomer(index) {
    customers.splice(index, 1);
    delete orders[index];
    saveData();
    renderCustomers();
}

// Funktion zum Rendern der Aufträge für einen Kunden
function renderOrders() {
    const ordersTable = document.getElementById('ordersTable').getElementsByTagName('tbody')[0];
    ordersTable.innerHTML = '';
    let customerOrders = orders[selectedCustomerId] || [];
    customerOrders.forEach((order) => {
        let row = ordersTable.insertRow();
        row.insertCell(0).innerText = order.id;
        console.log(order.id)
        row.insertCell(1).innerText = order.description;
        let actionsCell = row.insertCell(2);

        let deleteBtn = document.createElement('button');
        deleteBtn.innerText = 'Löschen';
        deleteBtn.onclick = () => deleteOrder(order.id);
        actionsCell.appendChild(deleteBtn);
    });
}

// Funktion zum Löschen eines Auftrags
function deleteOrder(orderId) {
    let customerOrders = orders[selectedCustomerId];
    orders[selectedCustomerId] = customerOrders.filter(order => order.id !== orderId);
    saveData();
    renderOrders();
}

// Funktion zum Rendern aller Aufträge
function renderAllOrders() {
    const allOrdersTable = document.getElementById('allOrdersTable').getElementsByTagName('tbody')[0];
    allOrdersTable.innerHTML = '';

    customers.forEach((customer, customerId) => {
        let customerOrders = orders[customerId] || [];
        customerOrders.forEach((order) => {
            let row = allOrdersTable.insertRow();
            row.insertCell(0).innerText = customer.name;
            row.insertCell(1).innerText = order.id;
            row.insertCell(2).innerText = order.description;
            let actionsCell = row.insertCell(3);

            let deleteBtn = document.createElement('button');
            deleteBtn.innerText = 'Löschen';
            deleteBtn.onclick = () => {
                deleteOrder(order.id);
                renderAllOrders();
            };
            actionsCell.appendChild(deleteBtn);
        });
    });
}
