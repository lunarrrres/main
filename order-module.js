import { initializeApp } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-analytics.js";
// import { getAuth } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-auth.js";
import { getDatabase, ref, set } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-database.js";

const firebaseConfig = {
    apiKey: "AIzaSyDMUBvWKRfL-XjsxjcWlzHToINLD0Hrbks",
    authDomain: "lunares-flowers-91fc2.firebaseapp.com",
    projectId: "lunares-flowers-91fc2",
    storageBucket: "lunares-flowers-91fc2.appspot.com",
    messagingSenderId: "132221542893",
    appId: "1:132221542893:web:0377549153482bb1ee07e4",
    measurementId: "G-N0BVE3VEYC",
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getDatabase(app);

document.getElementById("order-form").addEventListener("submit", function (event) {
    event.preventDefault(); // Зупиняє звичайну відправку форми

    // Отримуємо значення з форми
    const formData = getData(event.target);
    const { name, email, phone, address, message } = formData;
    const token = formData.get("user-token");
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
    const uid = decodeJwtResponse(token).sub;

    // Створюємо запис в базі даних
    const record = {
        [uid]: {
            createdAt: new Date(),
            order: {
                name: name,
                email: email,
                phone: phone,
                address: address,
                message: message,
                cart: cartItems,
            },
        },
    };

    // Записуємо дані в базу даних
    set(ref(db, "orders/" + uid), record).then(() => {
        // Відображаємо повідомлення про успішне замовлення
        alert("Ваше замовлення було успішно надіслано.");
        // Очищаємо кошик
    });
});

function getData(form) {
    var formData = new FormData(form);
    return formData;
}
