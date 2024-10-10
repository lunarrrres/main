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

document.getElementById("order-form").addEventListener("submit", function (event) {
event.preventDefault(); // Зупиняє звичайну відправку форми

    // Отримуємо значення з форми
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const phone = document.getElementById("phone").value;
    const address = document.getElementById("address").value;
    const message = document.getElementById("message").value;

    // Отримуємо дані з кошика
    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    // Якщо кошик порожній
    const cartItems =
        cart.length === 0
            ? "Кошик порожній"
            : cart
                  .map((item) => {
                      return `${item.title} - ${item.quantity}шт.*${item.price}грн - ${item.price * item.quantity}грн`;
                  })
                  .join("<br>");
});

function handleCredentialResponse(response) {
    console.log("Encoded JWT ID token: " + response.credential);
  }
  window.onload = function () {
    google.accounts.id.initialize({
      client_id: "676107649268-s9fklobk07lbrh5jbd2qti83j7v33gac.apps.googleusercontent.com",
      callback: handleCredentialResponse
    });
    google.accounts.id.renderButton(
      document.getElementById("google-signin"),
      { theme: "outline", size: "large" }  // customization attributes
    );
    google.accounts.id.prompt();
}