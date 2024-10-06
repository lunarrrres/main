const menuToggle = document.getElementById('menu-toggle');
const navItems = document.getElementById('navItems');

menuToggle.addEventListener('click', () => {
    navItems.classList.toggle('show');
});
const flowers = [
    {
        id: 1,
        title:"Троянда",
        care: "Щоб троянди довше стояли, воду у вазі потрібно змінювати 1 раз на 3 дні, якщо міняти воду щодня вони простоять ще довше. Вазу треба щоразу промивати. Троянди люблять обприскування. Тому букет слід обприскувати кілька разів на день з пульверизатора, але так щоб вода не потрапляла в центр бутонів, а тільки на пелюстки.", 
        variants: [
            {
                id: 1,
                color: "червоний",
                image: "flowers/rosered.jpg",
                country: "Кенія",
                meaning: "Головна роль червоної троянди – висловлювати абсолютну любов і пристрасть. Червоні троянди говорять про глибокої пристрасті, буйних бажаннях і романтичних стосунках. Червоні троянди — це символ захоплення, поваги, хоробрості.",
            },
            {
                id: 2,
                color: "рожевий",
                image: "flowers/rosepin.jpg",
                country: "Нідерланди",
                meaning: "Рожеві троянди – це витонченість, елегантність, вишуканість. На відміну від червоних троянд, рожеві троянди говорять про щойно пробуджуються почуття і ніжної прихильності.",
            },
            {
                id: 3,
                color: "білий",
                image: "flowers/rosewhi.jpg",
                country: "Україна",
                meaning: "Білі троянди символізують невинність, чистоту, вірність. За їх допомогою дарувальник демонструє піднесенні почуття: любов, чисті наміри, поклоніння, повагу, захоплення досконалістю.",                                                          
            }
        ]
    },
    {
        id: 4,
        title:"Тюльпан",
        care: "Якщо тюльпани зберігаються уводі, варто надати їй температури не вище чотирьох градусів вище нуля за Цельсієм. При таких умовах квіти зберігаються довше та перебувають у свіжості до семи днів. Якщо немає можливості зберігати квіти у воді, варто виконати умовну повітряну обгортку, у якій тюльпани пролежать довше.",
        variants: [
            {
                id: 4,
                color: "red",
                image: "flowers/tulipred.jpg",
                country: "Україна",
                meaning: "Червоні тюльпани - це символ бажання, любові та пристрасті. Часто їх використовують замість слів, які скажуть про почуття. Тюльпани символ гармонії, духовності, багатства, розкоші й жіночої краси.",
            },
            {
                id: 5,
                color: "pink",
                image: "flowers/tulippin.jpg",
                country: "Нідерланди",
                meaning: "Будучи приємними та чудовими, рожеві тюльпани чудово символізують щирі побажання щастя та радості. Вони відомі як символ платонічної любові, а також ніжності, грації та молодості.",
            },
            {
                id: 6,
                color: "white",
                image: "flowers/tulipwhi.jpg",
                country: "Нідерланди",
                meaning: "Білі тюльпані – символ чистої та безтурботної любові. А ще за допомогою цих нижніх квітів можна попросити пробачення. Вони можуть також символізувати мирну і чисту любов і щирість чувств.",                                                         
            }
        ]
    },
    {
        id: 7,
        title:"Гортензія",
        care: "Оптимальні умови зберігання Гортензії, як і багато інших зрізаних квітів, не люблять прямих сонячних променів та високих температур. Важливо зберігати їх у прохолодному місці, далеко від опалювальних приладів та протягів.",

        variants: [
            {
                id: 7,
                color: "blue",
                image: "flowers/hydrablu.jpg",
                country: "Еквадор",
                meaning: "Синя гортензія символізує прохолоду, мир і вибачення. Її часто дарують, щоб висловити жаль або примирення, прощення за минулі образи.",
            },
            {
                id: 8,
                color: "pink",
                image: "flowers/hydrapin.jpg",
                country: "Колумбія",
                meaning: "Рожева гортензія асоціюється з романтикою, щирістю і теплими почуттями. Вона символізує щиру любов і взаємну прихильність.",
            },
            {
                id: 9,
                color: "white",
                image: "flowers/hydrawhi.jpg",
                country: "Україна",
                meaning: "Біла гортензія уособлює чистоту, благородство і невинність. Вона також може символізувати нові початки або духовний спокій.",                                                          
            }
        ]
    },
    {
        id: 10,
        title:"Соняшник",
        image: "flowers/sunflower.jpg",
        country: "Україна",
        care: "Для великого букета соняшників потрібна простора ваза, інакше важкі квіти можуть перекинутися, а листя швидко зів'яне. Перед тим, як ставити квіти у вазу, їх слід охолодити, помістивши на 3-4 години у прохолодну воду, щоб вони ввібрали вологу та довше зберігали свіжість. Нижнє листя, що буде у воді, потрібно видалити, щоб уникнути гниття. Також рекомендується використовувати підставку через вагу букета. Робити надрізи на стеблах не потрібно, достатньо подряпати їх бічну частину голкою або ножем.",
        meaning: "Значення соняшника пов'язують із теплом, світлом, життєвою силою, щастям та радістю. Соняшники нагадують нам про спекотне літо і безтурботні часи, коли все, що ми могли відчувати, — це легкість та невимушеність.",

    },
    {
        id: 11,
        title:"Півонія",
        care: "Півонії потрібно поставити далеко від протягів, яскравого сонця, джерел тепла та фруктів; щодня потрібно міняти воду; підрізати стебла перед тим як поставити квіти у вазу на 1-2 см під гострим кутом; зверху півонії можна обприскувати з пульверизатора прохолодною відстояною водою.",
        variants: [
            {
                id: 11,
                color: "pink",
                image: "flowers/peonypin.jpg",
                country: "Кенія",
                meaning: "Рожеві півонії - це квітка, яка ідеально доповнює річницю весілля, оскільки за фен-шуй є символом щасливого шлюбу, честі та багатства. Завдяки своїй широкій популярності вона була названа офіційною квіткою 12-ї річниці весілля.",
            },
            {
                id: 12,
                color: "white",
                image: "flowers/peonywhi.jpg",
                country: "Нідерланди",
                meaning: "Білі півонії виражають сором так само, як і красу. Тому, якщо ви хочете щиро попросити пробачення або просто сказати: 'Я облажався', вони стануть чудовим подарунком.",                                                          
            },
            {
                id: 13,
                color: "violet",
                image: "flowers/peonyvio.jpg",
                country: "Кенія",
                meaning: "Фіолетова півонія символізує велич, королівську гідність і загадковість. Цей колір також пов'язаний з духовністю, трансцендентністю та вишуканістю.",
            }
        ]
    },
    {
        id : 14,
        title:"Жоржина",
        care: "Додавати у вазу з водою можна аспірин (1 пігулка на 1 л води), оцет (1 чайна ложка на 1 л води) чи цукор (1 чайна ложка на літр води). Квіти простоять довше, якщо вливати у вазу 50 грам газованої води. Довше підтримати свіжість квітів можна, змішавши воду з нашатирним спиртом (2 чайні ложки на вазу об'ємом 2-3 літри).",
        variants: [
            {
                id: 14,
                color: "pink",
                image: "flowers/dahliapin.jpg",
                country: "Еквадор",
                meaning: "Рожева жоржина асоціюється з ніжністю, жіночністю, романтикою та вдячністю. Вона є символом добрих намірів, теплих емоцій та турботи.",
            },
            {
                id: 15,
                color: "white",
                image: "flowers/dahliawhi.jpg",
                country: "Еквадор",
                meaning: "Біла жоржина символізує чистоту, невинність і духовну гармонію. Її часто дарують для вираження щирих почуттів і побажань спокою.",                                                          
            },
            {
                id: 16,
                color: "red",
                image: "flowers/dahliared.jpg",
                country: "Україна",
                meaning: "Червона жоржина символізує силу, пристрасть, любов та енергію. Вона також може передавати почуття впевненості та сміливості.",
            }
        ]
    },
    {
        id: 17,
        title:"Ромашка",
        image: "flowers/camomile.jpg",
        country: "Польща",
        care: "Щоб квіти довше стояли, важливо регулярно замінювати воду у вазі. Робіть це кожні два-три дні. Під час заміни води не забудьте промити вазу, щоб видалити бактерії та залишки старої води. Це допоможе підтримувати свіжість квітів і продовжити їхнє життя.",
        meaning: "Білі ромашки вважаються символом невинності та духовної простоти. Вони також позначають вірність, щирість та безкорисливість.",
    }
];

window.flowers = flowers;

document.addEventListener("DOMContentLoaded", () => {

    const params = new URLSearchParams(window.location.search);
    const flowerId = parseInt(params.get('id')); 

    const flower = flowers.find(flower => flower.id === flowerId);

    if (flower) {
        const imageElement = document.querySelector(".image");
        const nameElement = document.querySelector(".name");
        const colorElement = document.querySelector(".color");
        const countryElement = document.querySelector(".country");
        const careElement = document.querySelector(".care");
        const meaningElement = document.querySelector(".meaning");

        if (imageElement && flower.image) {
            imageElement.setAttribute("src", flower.image || "default_image_path.jpg"); 
        }

        nameElement.textContent = `Квітка ${flower.title}`; 
        colorElement.textContent = `Колір: ${flower.variants ? flower.variants[0].color : 'Інформація відсутня'}`;
        countryElement.textContent = `Країна: ${flower.variants ? flower.variants[0].country : 'Інформація відсутня'}`;
        careElement.textContent = `Догляд: ${flower.care}`; 
        meaningElement.textContent = `Значення: ${flower.meaning || 'Інформація відсутня'}`; 
    } else {
        const infoContainer = document.getElementById("info");
        if (infoContainer) {
            infoContainer.textContent = "Інформація про квітку не знайдена.";
        }
    }
});
