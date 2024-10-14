const menuToggle = document.getElementById("menu-toggle");
const navItems = document.getElementById("navItems");

menuToggle.addEventListener("click", () => {
  navItems.classList.toggle("show");
});

const scrollToTopBtn = document.getElementById("scrollToTop");

window.addEventListener("scroll", () => {
  if (window.scrollY > 200) {
    scrollToTopBtn.style.display = "block";
  } else {
    scrollToTopBtn.style.display = "none";
  }
});

function updateCartCount() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const cartCounter = document.getElementById("counter");
  const counter = cart.reduce((sum, item) => sum + item.quantity, 0);
  cartCounter.textContent = counter;
}

const flowers = [
  {
    id: 1,
    title: "Троянда",
    description: "Квіткові троянди з великими квітами, які ми робимо від нас.",
    price: 50,
    image: "flowers/rosered.jpg",
    variants: [
      { id: 1, color: "red", image: "flowers/rosered.jpg" },
      { id: 2, color: "pink", image: "flowers/rosepin.jpg" },
      { id: 3, color: "white", image: "flowers/rosewhi.jpg" },
    ],
  },
  {
    id: 4,
    title: "Тюльпан",
    description: "Квіткові тюльпани з великими квітами, які ми робимо від нас.",
    price: 40,
    image: "flowers/tulipred.jpg",
    variants: [
      { id: 4, color: "red", image: "flowers/tulipred.jpg" },
      { id: 5, color: "pink", image: "flowers/tulippin.jpg" },
      { id: 6, color: "white", image: "flowers/tulipwhi.jpg" },
    ],
  },
  {
    id: 7,
    title: "Гортензія",
    description:
      "Квіткові гортензії з великими квітами, які ми робимо від нас.",
    price: 70,
    image: "flowers/hydrablu.jpg",
    variants: [
      { id: 7, color: "blue", image: "flowers/hydrablu.jpg" },
      { id: 8, color: "pink", image: "flowers/hydrapin.jpg" },
      { id: 9, color: "white", image: "flowers/hydrawhi.jpg" },
    ],
  },
  {
    id: 10,
    title: "Соняшник",
    description:
      "Квіткові соняшники з великими квітами, які ми робимо від нас.",
    price: 40,
    image: "flowers/sunflower.jpg",
  },
  {
    id: 11,
    title: "Півонія",
    description: "Квіткові півонії з великими квітами, які ми робимо від нас.",
    price: 60,
    image: "flowers/peonypin.jpg",
    variants: [
      { id: 11, color: "pink", image: "flowers/peonypin.jpg" },
      { id: 12, color: "white", image: "flowers/peonywhi.jpg" },
      { id: 13, color: "violet", image: "flowers/peonyvio.jpg" },
    ],
  },
  {
    id: 14,
    title: "Жоржина",
    description: "Квіткові жоржини з великими квітами, які ми робимо від нас.",
    price: 50,
    image: "flowers/dahliapin.jpg",
    variants: [
      { id: 14, color: "pink", image: "flowers/dahliapin.jpg" },
      { id: 15, color: "white", image: "flowers/dahliawhi.jpg" },
      { id: 16, color: "red", image: "flowers/dahliared.jpg" },
    ],
  },
  {
    id: 17,
    title: "Ромашка",
    description: "Квіткові ромашки з великими квітами, які ми робимо від нас.",
    price: 30,
    image: "flowers/camomile.jpg",
  },
];

window.flowers = flowers;
updateCartCount();

const cardTemplate = document.getElementById("cardTemplate");
const cardContainer = document.getElementById("cards");

flowers.forEach((flower) => {
  const card = cardTemplate.content.cloneNode(true);
  card.querySelector(".card").dataset.selectedid = flower.id;
  card.querySelector(".card").setAttribute("id", flower.id);
  card.querySelector(".name").textContent = flower.title;
  card.querySelector(".price").textContent = `${flower.price} грн`;
  card.querySelector(".image").setAttribute("src", flower.image);
  const colors = card.querySelector(".colors");

  let selectedVariantId =
    localStorage.getItem(`selectedVariant-${flower.id}`) || null;

  if (flower.variants) {
    flower.variants.forEach((variant) => {
      const color = document.createElement("div");
      color.addEventListener("click", () => {
        selectedVariantId = variant.id;
        localStorage.setItem(`selectedVariant-${flower.id}`, selectedVariantId);
        const imgCard = document.getElementById(flower.id);
        imgCard.querySelector(".image").setAttribute("src", variant.image);
        imgCard.dataset.selectedid = selectedVariantId;
      });
      color.classList.add("color");
      color.style.backgroundColor = variant.color;
      colors.append(color);
    });
  } else {
    colors.remove();
  }

  const quantity = card.querySelector(".quantity");
  quantity.querySelector(".minus-button").addEventListener("click", () => {
    if (quantity.querySelector("input").value > 1) {
      quantity.querySelector("input").value = --quantity.querySelector("input")
        .value;
    }
  });
  quantity.querySelector(".plus-button").addEventListener("click", () => {
    quantity.querySelector("input").value = ++quantity.querySelector("input")
      .value;
  });

  const addToCart = card.querySelector(".addToCart");
  addToCart.addEventListener("click", (event) => {
    const card = document.getElementById(flower.id);
    const selectedVariantId = card.dataset.selectedid;
    const quantityInput = card.querySelector("input");
    const quantity = parseInt(quantityInput.value);

    if (quantity > 0) {
      const cart = JSON.parse(localStorage.getItem("cart")) || [];
      const currentFlower = flowers.find((f) => f.id == flower.id);
      const variant = currentFlower.variants
        ? currentFlower.variants.find((v) => v.id == selectedVariantId)
        : null;
      const price = currentFlower.price;
      const title =
        currentFlower.title + (variant ? ` (${variant.color})` : "");

      const existingItemIndex = cart.findIndex(
        (item) => item.id == selectedVariantId
      );

      if (existingItemIndex > -1) {
        cart[existingItemIndex].quantity += quantity;
      } else {
        cart.push({
          id: selectedVariantId,
          quantity: quantity,
          title: title,
          price: price,
        });
      }
      localStorage.setItem("cart", JSON.stringify(cart));
      quantityInput.value = 1;

      calculateTotal();
      updateCartCount();
    }
  });

  function getVariant(flowerId, flowers) {
    let result;

    flowers.forEach((flower) => {
      if (flower.variants) {
        flower.variants.forEach((variant) => {
          if (variant.id == flowerId) {
            result = variant;
          }
        });
      }
      if (flower.id == flowerId) {
        result = flower;
      }
    });

    return result;
  }

  const seeMore = card.querySelector(".seeMore");
  seeMore.addEventListener("click", () => {
    const card = document.getElementById(flower.id);
    const selectedVariantId = parseInt(card.dataset.selectedid);

    const variant = getVariant(selectedVariantId, flowers);
    localStorage.setItem(
      `selectedVariant-${selectedVariantId}`,
      JSON.stringify(variant)
    );

    window.location.href = `more.html?id=${selectedVariantId}`;
  });

  function calculateTotal() {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    let total = 0;

    cart.forEach((item) => {
      const flower = flowers.find(
        (f) =>
          f.id == item.id ||
          (f.variants && f.variants.find((v) => v.id == item.id))
      );
      if (flower) {
        total += item.price * item.quantity;
      }
    });
    localStorage.setItem("totalPrice", total);
  }

  cardContainer.append(card);
});

function startCountdown() {
  const endDate = new Date('2024-10-19T00:00:00').getTime();

  const timerInterval = setInterval(function() {
      const now = new Date().getTime();
      const timeRemaining = endDate - now;

      // Обчислюємо кількість днів, годин, хвилин і секунд
      const days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
      const hours = Math.floor((timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);

      // Виводимо результат
      document.getElementById('days').innerText = days;
      document.getElementById('hours').innerText = hours;
      document.getElementById('minutes').innerText = minutes;
      document.getElementById('seconds').innerText = seconds;

      // Якщо таймер досягне 0, зупиняємо його
      if (timeRemaining < 0) {
          clearInterval(timerInterval);
          document.getElementById('timer').innerHTML = "Час вийшов!";
      }
  }, 1000);
}

// Запускаємо таймер
startCountdown();
