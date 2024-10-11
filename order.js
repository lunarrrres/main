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

document.getElementById("order-form-container").addEventListener("submit", function (event) {
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
    const payload = decodeJwtResponse(response.credential);
    console.log("ID: " + payload.sub);
    console.log("Full Name: " + payload.name);
    console.log("Encoded JWT ID token: " + response.credential);

    document.getElementById("name").value = payload.name;
    document.getElementById("email").value = payload.email;
    document.getElementById("phone").value = payload.phone_number || "";
    document.getElementById("address").value = payload.address || "";

    document.getElementById("request-order").disabled = false;
    document.getElementById("request-order").classList.toggle("disabled");

    document.getElementById("google-signin").classList.toggle("hidden");
    document.getElementById("sign-out").classList.toggle("hidden");
    document.getElementById("sign-out").addEventListener("click", signOut);
}
window.onload = function () {
    google.accounts.id.initialize({
        client_id: "676107649268-s9fklobk07lbrh5jbd2qti83j7v33gac.apps.googleusercontent.com",
        callback: handleCredentialResponse,
    });
    google.accounts.id.renderButton(
        document.getElementById("google-signin"),
        { theme: "outline", size: "large" }, // customization attributes
    );
    google.accounts.id.prompt();
};

function decodeJwtResponse(token) {
    var base64Url = token.split(".")[1];
    var base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    var jsonPayload = decodeURIComponent(
        atob(base64)
            .split("")
            .map(function (c) {
                return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
            })
            .join(""),
    );
    return JSON.parse(jsonPayload);
}

function signOut() {
    google.accounts.id.disableAutoSelect();
    document.getElementById("order-form").reset();
    // do anything on logout
    location.reload();
}
