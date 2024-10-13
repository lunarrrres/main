const menuToggle = document.getElementById("menu-toggle");
const navItems = document.getElementById("navItems");

menuToggle.addEventListener("click", () => {
    navItems.classList.toggle("show");
});

console.log(JSON.parse(localStorage.getItem("cart")));

const cart = JSON.parse(localStorage.getItem("cart")) || [];
const orderItems = document.getElementById("order-items");

cartItems = cart.map((item) => {
    return `<li>${item.title} - ${item.quantity}шт.*${item.price}грн - ${item.price * item.quantity}грн .</li><br>`;
});
orderItems.innerHTML = cartItems.join("");

document.getElementById("reset-cart").addEventListener("click", () => {
    localStorage.removeItem("cart");
    document.getElementById("order-items").innerHTML = "<h4>Замовлення пусте</h4>";
    const requestOrderButton = document.getElementById("request-order");
    requestOrderButton.setAttribute("disabled", true);
    requestOrderButton.classList.toggle("disabled");
    document.getElementById("totalPriceDisplay").textContent = "Кошик порожній";
});

if (cart.length === 0) {
    document.getElementById("order-items").innerHTML = "<h4>Замовлення пусте</h4>";
    const requestOrderButton = document.getElementById("request-order");
    requestOrderButton.setAttribute("disabled", true);
    requestOrderButton.classList.toggle("disabled");
}

// Отримання загальної вартості з Local Storage
const totalPrice = localStorage.getItem("totalPrice");

// Перевіряємо, чи є загальна вартість
if (totalPrice) {
    // Відображення загальної вартості на сторінці
    document.getElementById("totalPriceDisplay").textContent = `Загальна вартість: ${totalPrice} грн`;
} else {
    document.getElementById("totalPriceDisplay").textContent = "Кошик порожній";
}
