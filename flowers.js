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

const flowers = [
    {
        id: 1,
        title:"Троянда", 
        description: "Квіткові троянди з великими квітами, які ми робимо від нас.",
        price: 50,
        image: "flowers/rosered.jpg",
        variants: [
            {
                id: 1,
                color: "red",
                image: "flowers/rosered.jpg",
            },
            {
                id: 2,
                color: "pink",
                image: "flowers/rosepin.jpg",
            },
            {
                id: 3,
                color: "white",
                image: "flowers/rosewhi.jpg",                                                          
            }
        ]
    },
    {
        id: 4,
        title:"Тюльпан", 
        description: "Квіткові тюльпани з великими квітами, які ми робимо від нас.",
        price: 40,
        image: "flowers/tulipred.jpg",
        variants: [
            {
                id: 4,
                color: "red",
                image: "flowers/tulipred.jpg",
            },
            {
                id: 5,
                color: "pink",
                image: "flowers/tulippin.jpg",
            },
            {
                id: 6,
                color: "white",
                image: "flowers/tulipwhi.jpg",                                                          
            }
        ]
    },
    {
        id: 7,
        title:"Гортензія",
        description: "Квіткові гортензії з великими квітами, які ми робимо від нас.",
        price: 70,
        image: "flowers/hydrablu.jpg",
        variants: [
            {
                id: 7,
                color: "blue",
                image: "flowers/hydrablu.jpg",
            },
            {
                id: 8,
                color: "pink",
                image: "flowers/hydrapin.jpg",
            },
            {
                id: 9,
                color: "white",
                image: "flowers/hydrawhi.jpg",                                                          
            }
        ]
    },
    {
        id: 10,
        title:"Соняшник",
        description: "Квіткові соняшники з великими квітами, які ми робимо від нас.",
        price: 40,
        image: "flowers/sunflower.jpg"
    },
    {
        id: 11,
        title:"Півонія",
        description: "Квіткові півонії з великими квітами, які ми робимо від нас.",
        price: 60,
        image: "flowers/peonypin.jpg",
        variants: [
            {
                id: 11,
                color: "pink",
                image: "flowers/peonypin.jpg",
            },
            {
                id: 12,
                color: "white",
                image: "flowers/peonywhi.jpg",                                                          
            },
            {
                id: 13,
                color: "violet",
                image: "flowers/peonyvio.jpg",
            }
        ]
    },
    {
        id : 14,
        title:"Жоржина",
        description: "Квіткові жоржини з великими квітами, які ми робимо від нас.",
        price: 50,
        image: "flowers/dahliapin.jpg",
        variants: [
            {
                id: 14,
                color: "pink",
                image: "flowers/dahliapin.jpg",
            },
            {
                id: 15,
                color: "white",
                image: "flowers/dahliawhi.jpg",                                                          
            },
            {
                id: 16,
                color: "red",
                image: "flowers/dahliared.jpg",
            }
        ]
    },
    {
        id: 17,
        title:"Ромашка",
        description: "Квіткові ромашки з великими квітами, які ми робимо від нас.",
        price: 30,
        image: "flowers/camomile.jpg"
    }
];

window.flowers = flowers;
    

const cardTemplate = document.getElementById("cardTemplate");
    const cardContainer = document.getElementById("cards");

    console.log(flowers);
    
    flowers.forEach((flower) => {
        const card = cardTemplate.content.cloneNode(true);
        card.querySelector(".card").dataset.selectedid = flower.id;
        card.querySelector(".card")
        .setAttribute("id", flower.id);
        card.querySelector(".name").textContent = flower.title;
        card.querySelector(".price").textContent = `${flower.price} грн`;
        card.querySelector(".image").setAttribute("src", flower.image);
        const colors = card.querySelector(".colors");

        if (flower.variants) {
            flower.variants.forEach((variant) => {
                const color = document.createElement("div");
                color.addEventListener("click", () => {
                    const imgCard = document.getElementById(flower.id);
                    imgCard.querySelector(".image").setAttribute("src", variant.image);
                    imgCard.dataset.selectedid = variant.id;
                    
                })
                color.classList.add("color");
                color.style.backgroundColor = variant.color;
                colors.append(color);
            })
        } 
        else{
            colors.remove();
        }

        const quantity = card.querySelector(".quantity");
        quantity.querySelector(".minus-button").addEventListener("click", () => {
            if (quantity.querySelector("input").value > 1) {
                quantity.querySelector("input").value = --quantity.querySelector("input").value;
            }
        })
        quantity.querySelector(".plus-button").addEventListener("click", () => {
            quantity.querySelector("input").value = ++quantity.querySelector("input").value;
        })
  
        const addToCart = card.querySelector(".addToCart");
addToCart.addEventListener("click", (event) => {
    const card = document.getElementById(flower.id);
    const selectedVariantId = card.dataset.selectedid;  // id варіанту або самої квітки
    const quantityInput = card.querySelector("input");
    const quantity = parseInt(quantityInput.value);  // кількість товару

    if (quantity > 0) {
        const cart = JSON.parse(localStorage.getItem("cart")) || [];

        // Знайдемо квітку та варіант за обраним id
        const currentFlower = flowers.find(f => f.id == flower.id); // зміна тут
        const variant = currentFlower.variants ? currentFlower.variants.find(v => v.id == selectedVariantId) : null;

        // Визначимо ціну та заголовок (назва квітки та колір, якщо обрано варіант)
        const price = currentFlower.price; // зміна тут
        const title = currentFlower.title + (variant ? ` (${variant.color})` : '');

        // Знайдемо вже наявний товар у кошику
        const existingItemIndex = cart.findIndex(item => item.id == selectedVariantId);

        if (existingItemIndex > -1) {
            // Якщо товар вже є у кошику, просто збільшуємо його кількість
            cart[existingItemIndex].quantity += quantity;
        } else {
            // Додаємо новий товар до кошика
            cart.push({ id: selectedVariantId, quantity: quantity, title: title, price: price });
        }

        // Оновлюємо кошик в Local Storage
        localStorage.setItem("cart", JSON.stringify(cart));
        quantityInput.value = 1;  // Скидаємо кількість до 1 після додавання

        // Оновлюємо загальну вартість
        calculateTotal();
    }
});

        function calculateTotal() {
            const cart = JSON.parse(localStorage.getItem("cart")) || [];
            let total = 0;
        
            cart.forEach(item => {
                const flower = flowers.find(f => f.id == item.id || (f.variants && f.variants.find(v => v.id == item.id)));
                if (flower) {
                    total += item.price * item.quantity;  // Використовуємо ціну з localStorage
                }
            });
        
            // Збереження загальної вартості в Local Storage
            localStorage.setItem("totalPrice", total);
        }
        addToCart.addEventListener("click", (event) => {
            const card = document.getElementById(flower.id);
            const id = card.dataset.selectedid;
            const input = card.querySelector("input");
            const s = input.value;
            
            
        
            if (s > 0) {
                const cart = JSON.parse(localStorage.getItem("cart")) || [];
                const title = window.flowers.find((flower) => `${flower.id}` === id).title;
                const price = window.flowers.find((flower) => `${flower.id}` === id).price;
                
                cart.push({ id, quantity: s, title, price});
                localStorage.setItem("cart", JSON.stringify(cart));
                input.value = 1;
        
                // Підрахунок загальної суми після додавання квітки
                calculateTotal();
            }
        });
        cardContainer.append(card);
    })

    
    
