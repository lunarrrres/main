import { initializeApp } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-app.js";
import {
    getAuth,
    signInWithCredential,
    GoogleAuthProvider,
} from "https://www.gstatic.com/firebasejs/10.14.1/firebase-auth.js";
import { getDatabase, ref, set } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-database.js";

const firebaseConfig = {
    apiKey: "AIzaSyDMUBvWKRfL-XjsxjcWlzHToINLD0Hrbks",
    authDomain: "lunares-flowers-91fc2.firebaseapp.com",
    projectId: "lunares-flowers-91fc2",
    storageBucket: "lunares-flowers-91fc2.appspot.com",
    messagingSenderId: "132221542893",
    appId: "1:132221542893:web:0377549153482bb1ee07e4",
    measurementId: "G-N0BVE3VEYC",
    databaseURL: "https://lunares-flowers-91fc2-default-rtdb.europe-west1.firebasedatabase.app",
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
const auth = getAuth();

window.onload = function () {
    google.accounts.id.initialize({
        client_id: "132221542893-tbaplfcb3a2sm1s1p71s71umrimn0c4n.apps.googleusercontent.com",
        callback: handleCredentialResponse,
    });
    google.accounts.id.renderButton(
        document.getElementById("google-signin"),
        { theme: "outline", size: "large" }, // customization attributes
    );
    google.accounts.id.prompt();
};

function handleCredentialResponse(response) {
    // Build Firebase credential with the Google ID token.
    const idToken = response.credential;
    const credential = GoogleAuthProvider.credential(idToken);

    // Sign in with credential from the Google user.
    signInWithCredential(auth, credential)
        .then((result) => {
            // This gives you a Google Access Token. You can use it to access the Google API.
            const token = credential.accessToken;
            sessionStorage.setItem("token", token);
            // The signed-in user info.
            const user = result.user;
            updateForm(user);
        })
        .catch((error) => {
            // Handle Errors here.
            const errorCode = error.code;
            const errorMessage = error.message;
            // The email of the user's account used.
            const email = error.email;
            // The credential that was used.
            const credential = GoogleAuthProvider.credentialFromError(error);
            // ...
        });
}

document.getElementById("order-form").addEventListener("submit", function (event) {
    event.preventDefault(); // Зупиняє звичайну відправку форми

    // Отримуємо значення з форми
    const formData = getData(event.target);
    const { name, email, phone, address, message, uid } = formData;

    // Отримуємо дані з кошика
    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    if (cart.length === 0) {
        showNotification("Кошик порожній");
        return;
    }
    // Якщо кошик порожній
    const cartItems = cart
        .map((item) => {
            return `${item.title} - ${item.quantity}шт.*${item.price}грн - ${item.price * item.quantity}грн`;
        })
        .join("<br>");

    // Створюємо запис в базі даних
    const record = {
        [new Date()]: {
            name: name,
            email: email,
            phone: phone,
            address: address,
            message: message,
            cart: cartItems,
        },
    };

    // Записуємо дані в базу даних
    set(ref(db, "orders/" + uid), record)
        .then(() => {
            // Відображаємо повідомлення про успішне замовлення
            showNotification("Замовлення успішно збережено!");
            // Очищаємо кошик
            localStorage.removeItem("cart");
            localStorage.removeItem("totalPrice");
        })
        .catch((error) => {
            // Відображаємо повідомлення про помилку
            showNotificationErrorOrder(error.message);
        });
});

function getData(form) {
    var formData = new FormData(form);
    const objFormData = Object.fromEntries(formData);

    return objFormData;
}

function updateForm({ displayName, email, phone_number = "", address = "", uid }) {
    document.getElementById("name").value = displayName;
    document.getElementById("email").value = email;
    document.getElementById("phone").value = phone_number;
    document.getElementById("address").value = address;
    document.getElementById("uid").value = uid;
    document.getElementById("request-order").disabled = false;
    document.getElementById("request-order").classList.toggle("disabled");
    document.getElementById("google-signin").classList.toggle("hidden");
    document.getElementById("sign-out").classList.toggle("hidden");
    document.getElementById("sign-out").addEventListener("click", signOut);
}

function signOut() {
    google.accounts.id.disableAutoSelect();
    document.getElementById("order-form").reset();
    document.getElementById("request-order").disabled = true;
    document.getElementById("request-order").classList.toggle("disabled");
    document.getElementById("google-signin").classList.toggle("hidden");
    document.getElementById("sign-out").classList.toggle("hidden");
    auth.signOut();
}

function showNotification(message) {
    const notification = document.getElementById("notification");
    notification.innerHTML = `<div class='notification-container'><h3>${message}</h3> <br> <a href='flowers.html'>Перейти до каталогу</a></div>`;
    notification.classList.remove("hidden");
    setTimeout(() => {
        notification.classList.add("hidden");
    }, 28000);
}

function showNotificationErrorOrder(errorMessage) {
    const notification = document.getElementById("notification");
    notification.innerHTML = "<div class='notification-container'><h3>Помилка: " + errorMessage + "</h3></div>";
    notification.classList.remove("hidden");
    setTimeout(() => {
        notification.classList.add("hidden");
        location.reload();
    }, 18000);
}
