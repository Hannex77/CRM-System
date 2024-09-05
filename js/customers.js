function findHighestId(jsonString) {
   
    if (jsonString == null || jsonString == "[]") {
        return 1
    }
    const data = JSON.parse(jsonString); // JSON-String in ein Array von Objekten umwandeln
    const highestIdObject = data.reduce((max, obj) => {
        return parseInt(obj.id) > parseInt(max.id) ? obj : max;
    }, data[0]);

    // Erhöhe die höchste ID um 1
    const highestIdPlusOne = parseInt(highestIdObject.id) + 1;
    return highestIdPlusOne;
}

if (currentPage === "kundenuebersicht.html") {
    renderCustomers();

} else if (currentPage === "kundenregistrierung.html") {
    document.getElementById('customerForm').addEventListener('submit', (event) => {
        event.preventDefault();
        let newCustomer = {
            id: findHighestId(localStorage.getItem("customers")),
            name: event.target.name.value,
            email: event.target.email.value,
            phone: event.target.phone.value
        };
        customers.push(newCustomer);
        saveData();
        window.location.href = "kundenuebersicht.html";
    });
}

function renderCustomers() {
    const customersTable = document.getElementById('customersTable').getElementsByTagName('tbody')[0];
    customersTable.innerHTML = '';
   
    if (customers.length == 0) {
        console.log("zuvb")
        document.getElementById("customerList").style.display = "none"
        document.getElementById("nocustomers").style.display = "block"
    }
    customers.forEach((customer, index) => {
        let row = customersTable.insertRow();
        row.insertCell(0).innerText = customer.id;
        row.insertCell(1).innerText = customer.name;
        row.insertCell(2).innerText = customer.email;
        row.insertCell(3).innerText = customer.phone;
        let actionsCell = row.insertCell(4);

        let viewOrdersBtn = document.createElement('button');
        viewOrdersBtn.classList.add("Aufträgeanzeigen")
        viewOrdersBtn.innerText = 'Aufträge anzeigen';
        viewOrdersBtn.onclick = () => {
            localStorage.setItem('selectedCustomerId', index);
            window.location.href = "auftraege.html";
        };
        actionsCell.appendChild(viewOrdersBtn);

        let deleteBtn = document.createElement('button');
        deleteBtn.classList.add("Löschen")
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

