let currentIndex = 0;
const slides = document.querySelector('.slides');
const totalSlides = document.querySelectorAll('.slide').length;

document.querySelector('.prev').addEventListener('click', showPrevSlide);
document.querySelector('.next').addEventListener('click', showNextSlide);

function updateSlidePosition() {
    const slideWidth = 100;
    slides.style.transform = `translateX(-${currentIndex * slideWidth}%)`; 
}

function showPrevSlide() {
    currentIndex = (currentIndex > 0) ? currentIndex - 1 : totalSlides - 1;
    updateSlidePosition();
}

// (() => setInterval(showNextSlide, 5000))()

function showNextSlide() {
    currentIndex = (currentIndex < totalSlides - 1) ? currentIndex + 1 : 0;
    updateSlidePosition();
}

const menuToggle = document.getElementById('menu-toggle');
const navItems = document.getElementById('navItems');

menuToggle.addEventListener('click', () => {
    navItems.classList.toggle('show');
});

const scrollToTopBtn = document.getElementById('scrollToTop');

window.addEventListener('scroll', () => {
    if (window.scrollY > 200) {
        scrollToTopBtn.style.display = 'block';
    } else {
        scrollToTopBtn.style.display = 'none';
    }
});

scrollToTopBtn.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const cartCounter = document.getElementById("counter");
    const counter = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCounter.textContent = counter;
  }

const gotoFlowers = document.getElementById('gotoButton');

gotoFlowers.addEventListener('click', () => {
        window.location.href = 'flowers.html';
})