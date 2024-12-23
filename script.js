// Global variable to store the order items
let orderItems = [];
let total = 0;

// Function to add an item to the order
function addToOrder(itemName, itemPrice) {
    orderItems.push({ name: itemName, price: itemPrice });
    total += itemPrice;

    updateOrderSummary();
}

// Function to update the order summary display
function updateOrderSummary() {
    const orderListElement = document.getElementById("orderList");
    orderListElement.innerHTML = ''; // Clear previous order items

    // Add each item to the order summary
    orderItems.forEach(item => {
        const orderItemElement = document.createElement("div");
        orderItemElement.classList.add("order-item");
        orderItemElement.innerHTML = `${item.name} - $${item.price.toFixed(2)}`;
        orderListElement.appendChild(orderItemElement);
    });

    // Update the total amount
    document.getElementById("totalAmount").textContent = total.toFixed(2);
}

// Function to submit the order (reset the system)
function submitOrder() {
    if (orderItems.length === 0) {
        alert("Please add items to your order!");
        return;
    }

    alert("Order submitted successfully!");
    orderItems = [];  // Clear the order
    total = 0;        // Reset the total

    // Clear the order summary and total
    updateOrderSummary();
}
