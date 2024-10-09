const menuToggle = document.getElementById('menu-toggle');
const navItems = document.getElementById('navItems');

menuToggle.addEventListener('click', () => {
    navItems.classList.toggle('show');
});

console.log(JSON.parse(localStorage.getItem("cart")))

const cart = JSON.parse(localStorage.getItem("cart")) || [];
const orderItems = document.getElementById("order-items");

cartItems = cart.map((item) => {
    return `<li>${item.title} - ${item.quantity}шт.*${item.price}грн - ${item.price * item.quantity}грн .</li><br>`;
})
orderItems.innerHTML = cartItems.join("");

document.getElementById("reset-cart").addEventListener('click', () => {
    localStorage.removeItem("cart");
    document.getElementById("order-items").innerHTML = "<h4>Замовлення пусте</h4>"
    const requestOrderButton = document.getElementById("request-order");
    requestOrderButton.setAttribute("disabled", true);
    requestOrderButton.classList.toggle('disabled');
    document.getElementById("totalPriceDisplay").textContent = "Кошик порожній";
})

if (cart.length === 0) {
    document.getElementById("order-items").innerHTML = "<h4>Замовлення пусте</h4>";
    const requestOrderButton = document.getElementById("request-order");
    requestOrderButton.setAttribute("disabled", true);
    requestOrderButton.classList.toggle('disabled')
}
document.getElementById("request-order").addEventListener('click', () => {
    
})

// Отримання загальної вартості з Local Storage
const totalPrice = localStorage.getItem("totalPrice");

// Перевіряємо, чи є загальна вартість
if (totalPrice) {
    // Відображення загальної вартості на сторінці
    document.getElementById("totalPriceDisplay").textContent = `Загальна вартість: ${totalPrice} грн`;
} else{
    document.getElementById("totalPriceDisplay").textContent = "Кошик порожній";
}

document.getElementById('contact-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Зупиняє звичайну відправку форми

    // Отримуємо значення з форми
    var name = document.getElementById('name').value;
    var email = document.getElementById('email').value;
    var phone = document.getElementById('phone').value;
    var address = document.getElementById('address').value;
    var message = document.getElementById('message').value;

    // Відправка email через SMTP.js
    Email.send({
        SecureToken: "YOUR_SECURE_TOKEN", // Ваш токен безпеки (отриманий на smtpjs.com)
        To: 'owner@example.com', // Ваш email
        From: email, // Email, з якого буде надіслано
        Subject: 'Нове замовлення від ' + name,
        Body: `
            Ім'я: ${name} <br>
            Email: ${email} <br>
            Телефон: ${phone} <br>
            Адреса: ${address} <br>
            Коментар: ${message}
        `
    }).then(function (response) {
        alert("Форма успішно відправлена!");
    }).catch(function (error) {
        alert("Помилка при відправці форми. Спробуйте ще раз.");
    });
});


