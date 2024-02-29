// Order Management
const orderForm = document.getElementById('orderForm');
const ordersList = document.getElementById('ordersList');

// Load orders from localStorage
function loadOrders() {
    let orders = JSON.parse(localStorage.getItem('orders')) || [];
    ordersList.innerHTML = '';
    orders.forEach(order => {
        const li = document.createElement('li');
        li.textContent = `${order.name} - ${order.quantity}`;
        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete';
        deleteBtn.onclick = () => deleteOrder(order.id);
        li.appendChild(deleteBtn);
        ordersList.appendChild(li);
    });
}

// Add new order
function addOrder(name, quantity) {
    let orders = JSON.parse(localStorage.getItem('orders')) || [];
    const newOrder = { id: Date.now(), name, quantity };
    orders.push(newOrder);
    localStorage.setItem('orders', JSON.stringify(orders));
    loadOrders();
}

// Delete order
function deleteOrder(id) {
    let orders = JSON.parse(localStorage.getItem('orders')) || [];
    orders = orders.filter(order => order.id !== id);
    localStorage.setItem('orders', JSON.stringify(orders));
    loadOrders();
}

orderForm.addEventListener('submit', function (e) {
    e.preventDefault();
    const name = document.getElementById('orderName').value;
    const quantity = document.getElementById('orderQuantity').value;
    addOrder(name, quantity);
});

loadOrders();

// Menu Management
const menuList = document.getElementById('menuList');

// Fetch and display menu items
function loadMenu() {
    fetch('menu.json')
        .then(response => response.json())
        .then(menuItems => {
            menuItems.forEach(item => {
                const li = document.createElement('li');
                li.innerHTML = `${item.name} - $${item.price}`;
                menuList.appendChild(li);
            });
        })
        .catch(error => console.log(error));
}

loadMenu();

// Table Reservation
const tableReservationForm = document.getElementById('reservationForm');
const reservedTables = document.getElementById('reservedTables');

// Load reserved tables from localStorage
function loadReservations() {
    let reservations = JSON.parse(localStorage.getItem('reservations')) || [];
    reservedTables.innerHTML = '';
    reservations.forEach(reservation => {
        const li = document.createElement('li');
        li.textContent = `Table ${reservation.table} reserved for ${reservation.name}`;
        reservedTables.appendChild(li);
    });
}

// Reserve a table
function reserveTable(name, table) {
    let reservations = JSON.parse(localStorage.getItem('reservations')) || [];
    reservations.push({ id: Date.now(), name, table });
    localStorage.setItem('reservations', JSON.stringify(reservations));
    loadReservations();
}

tableReservationForm.addEventListener('submit', function (e) {
    e.preventDefault();
    const name = document.getElementById('customerName').value;
    const table = document.getElementById('tableNumber').value;
    reserveTable(name, table);
});

loadReservations();

// Payment Processing
const billForm = document.getElementById('billForm');
const billDisplay = document.getElementById('billDisplay');

// Calculate total bill with tax
function calculateBill() {
    let orders = JSON.parse(localStorage.getItem('orders')) || [];
    let total = orders.reduce((sum, order) => sum + (order.quantity * 10), 0); // Example: $10 per item
    let tax = total * 0.1;
    let totalWithTax = total + tax;
    billDisplay.innerHTML = `Total: $${total} <br> Tax: $${tax} <br> Total with Tax: $${totalWithTax}`;
}

billForm.addEventListener('submit', function (e) {
    e.preventDefault();
    calculateBill();
});
