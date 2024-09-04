// Funktion zum Speichern der Kundenliste und der Aufträge im Local Storage
function saveData() {
    localStorage.setItem('customers', JSON.stringify(customers));
    localStorage.setItem('orders', JSON.stringify(orders));
}

if (currentPage === "auftraege.html") {
    selectedCustomerId = localStorage.getItem('selectedCustomerId');
    let customer = customers[selectedCustomerId];
    let customerNames = document.getElementsByClassName("customerName");

    for (let i = 0; i < customerNames.length; i++) {
        customerNames[i].innerText = customer.name;
    }

    renderOrders();

    const orderForm = document.getElementById('orderForm');

    // Funktion zum Generieren der Auftrags-ID
    function generateOrderId(state, type, customerId) {
        // Finde die höchste Auftragsnummer für diesen Kunden
        let maxOrderNumber = 0;
        let customerOrders = orders[customerId] || [];
        customerOrders.forEach(order => {
            let idParts = order.id.split('-');
            let orderNumber = parseInt(idParts[idParts.length - 1], 10);
            if (!isNaN(orderNumber) && orderNumber > maxOrderNumber) {
                maxOrderNumber = orderNumber;
            }
        });

        // Erhöhe die höchste Nummer um 1
        let newOrderNumber = maxOrderNumber + 1;

        var date = new Date();
        return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}-${state}-${type}-${customer.id}-${newOrderNumber}`;
    }

    // Setze die generierte Auftrags-ID beim Absenden des Formulars
    orderForm.addEventListener('submit', (event) => {
        event.preventDefault();
        let state = document.getElementById('state').value;
        let type = document.getElementById('type').value;

        let orderId = generateOrderId(state, type, selectedCustomerId);

        let newOrder = {
            id: orderId,
            description: event.target.orderDescription.value,
            date: new Date(),
            ablauftermin: document.getElementById('Ablauftermin').value
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
function test(orderid) {
    switch (orderid.split('-')[4]) {
        case "BK":
            return BK;
        case "WL":
            return WL;
        case "PV":
            return PV;
    }
}

// Funktion zum Rendern der Aufträge für einen Kunden
function renderOrders() {
    const ordersTable = document.getElementById('ordersTable').getElementsByTagName('tbody')[0];
    ordersTable.innerHTML = '';
    let customerOrders = orders[selectedCustomerId] || [];
    customerOrders.forEach((order) => {
        let row = ordersTable.insertRow();
        row.insertCell(0).innerText = order.id;

        row.insertCell(1).innerText = test(order.id);
        row.insertCell(2).innerText = order.description;
        row.insertCell(3).innerText = getDaysLeft(order);
        let actionsCell = row.insertCell(4);

        let deleteBtn = document.createElement('button');
        deleteBtn.classList.add("Löschen");
        deleteBtn.innerText = 'Löschen';
        deleteBtn.onclick = () => deleteOrder(order.id);
        actionsCell.appendChild(deleteBtn);
    });
}

// Funktion zum Löschen eines Auftrags
function deleteOrder(orderId) {
    let customerOrders = orders[selectedCustomerId] || [];
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
            row.insertCell(3).innerText = getDaysLeft(order);
            let actionsCell = row.insertCell(4);

            let deleteBtn = document.createElement('button');
            deleteBtn.classList.add("Löschen");
            deleteBtn.innerText = 'Löschen';
            deleteBtn.onclick = () => {
                removeOrder(order.id);
                renderAllOrders();
            };
            actionsCell.appendChild(deleteBtn);
        });
    });
}

function removeOrder(orderId) {
    // Hole die gespeicherten Bestellungen aus dem localStorage
    let orders = localStorage.getItem("orders");

    // Parsen des JSON-Strings in ein JavaScript-Objekt
    orders = JSON.parse(orders);

    // Durchlaufe alle Schlüssel und entferne die Bestellung mit der gegebenen ID
    for (let key in orders) {
        if (orders.hasOwnProperty(key)) {
            orders[key] = orders[key].filter(order => order.id !== orderId);
        }
    }

    // Setze die aktualisierten Bestellungen zurück in den localStorage
    localStorage.setItem("orders", JSON.stringify(orders));
  
    location.reload(); // muss bersser gemacht werden ich weiß
}

// Beispielaufruf der Funktion


