let products = [];
const callPics = async () => {
    const data = await fetch("../json/data.json");
    const product_arr = await data.json();
    sessionStorage.arr_p = JSON.stringify(product_arr);
    products = product_arr;

    const searchValue = sessionStorage.getItem('searchValue');
    if (searchValue) {
        const filteredProducts = products.filter(product => product.name.toLowerCase().includes(searchValue.toLowerCase()));
        displayProducts(filteredProducts, searchValue);
        sessionStorage.removeItem('searchValue'); // נקה את החיפוש לאחר הטיפול בו
    } else {
        // בדוק אם יש קטגוריה שנשמרה ב-sessionStorage
        const selectedCategory = sessionStorage.getItem('selectedCategory');
        if (selectedCategory) {
            const categoryType = categoryTypes.get(selectedCategory);
            if (categoryType) {
                const filteredProducts = products.filter(product => product.category === categoryType);
                displayProducts(filteredProducts, "");
            }
            sessionStorage.removeItem('selectedCategory'); // נקה את הקטגוריה לאחר הטיפול בה
        } else {
            // אם אין חיפוש או קטגוריה, הצג את כל המוצרים
            displayProducts(products, "");
        }
    }

    if (sessionStorage.getItem('musicPlaying') === 'true') {
        const backgroundMusic = document.getElementById("backgroundMusic");
        backgroundMusic.volume = 0.2; 
        backgroundMusic.play().catch(error => {
            console.error("Autoplay failed: ", error);
        }); 
    }
};

// אירוע DOMContentLoaded - מבטיח שהקוד יופעל לאחר שה-DOM נטען לחלוטין
document.addEventListener("DOMContentLoaded", (event) => {
    if (!sessionStorage.getItem('musicPlaying')) {
        sessionStorage.setItem('musicPlaying', 'false');
    }

    callPics();

    // מאזין לאינטראקציה ראשונה מהמשתמש
    const handleUserInteraction = () => {
        if (sessionStorage.getItem('musicPlaying') === 'false') {
            const backgroundMusic = document.getElementById("backgroundMusic");
            backgroundMusic.volume = 0.2; // הגדרת עוצמת הקול
            backgroundMusic.play().catch(error => {
                console.error("Autoplay failed: ", error);
            }); // התחלת ניגון המוזיקה
            sessionStorage.setItem('musicPlaying', 'true'); // שמירה במצב שהמוזיקה מתנגנת
        }
        // הסרת המאזינים לאחר האינטראקציה הראשונה
        document.removeEventListener('click', handleUserInteraction);
        document.removeEventListener('keydown', handleUserInteraction);
    };

    // הוספת מאזינים לאינטראקציה מהמשתמש
    document.addEventListener('click', handleUserInteraction);
    document.addEventListener('keydown', handleUserInteraction);
});

// טיפול בניווט ורענון העמוד
window.addEventListener("beforeunload", (event) => {
    const backgroundMusic = document.getElementById("backgroundMusic");
    backgroundMusic.pause(); // הפסקת המוזיקה לפני שהעמוד נפרק
    sessionStorage.setItem('musicPlaying', 'false'); // ניקוי הסטטוס ב-sessionStorage
});

const collections = document.getElementById("collections");
const gift = document.getElementById("gift");
const div1 = document.querySelector("#div1");
const div2 = document.querySelector("#div2");
const logo = document.querySelector("#logo");
const user = document.querySelector("#icon2");
const icon_search = document.querySelector("#icon");
const content_start = document.getElementById("content_start");
const text = document.getElementById("text");
const btn_search = document.getElementById("btn_search");

logo.onclick = () => {
    location.href = '../html/Home.html';
};
user.onclick = () => {
    location.href = '../html/login.html';
};

div1.innerHTML = `
    <a href="#products-container" class="aa">גיבורי על</a><br>
    <a href="#products-container" class="aa">חד קרן</a><br>
    <a href="#products-container" class="aa">קרקס</a><br>
    <a href="#products-container" class="aa">קשת בענן</a><br>
    <a href="#products-container" class="aa">ציפחה</a><br>
`;

div2.innerHTML = `
    <a href="#products-container" class="aa">מתנות לשבועות</a><br>
    <a href="#products-container" class="aa">מתנות לאישה </a><br>
    <a href="#products-container" class="aa">מתנות ליום האהבה </a><br>
    <a href="#products-container" class="aa">מתנות למורות</a><br>
    <a href="#products-container" class="aa">מתנות לאירוח</a><br>
    <a href="#products-container" class="aa">מתנות לגבר</a><br>
    <a href="#products-container" class="aa">מתנות להורים</a><br>
`;

// מציג את div1 בעת ריחוף על קולקציות
collections.addEventListener("mouseover", function (event) {
    event.stopPropagation(); 
    div1.style.display = "block"; 
});

// משאיר את div1 פתוח בעת ריחוף עליו
div1.addEventListener("mouseover", function (event) {
    event.stopPropagation();
    div1.style.display = "block";
});

// מסיר את div1 בעת עזיבת ריחוף
div1.addEventListener("mouseout", function (event) {
    div1.style.display = "none";
    event.stopPropagation();
});

// מציג את div2 בעת ריחוף על מתנות
gift.addEventListener("mouseover", function (event) {
    event.stopPropagation();
    div2.style.display = "block";
});

// משאיר את div2 פתוח בעת ריחוף עליו
div2.addEventListener("mouseover", function (event) {
    event.stopPropagation();
    div2.style.display = "block";
});

// מסיר את div2 בעת עזיבת ריחוף
div2.addEventListener("mouseout", function (event) {
    div2.style.display = "none"; 
    event.stopPropagation(); 
});

// מערך של נתיבים לתמונות שברצונך להחליף ביניהם
   const imageSources = [
    "../images/פרסומת.png",
    "../images/פרסומתת.png",
];

// פונקציה להחלפת התמונה
function changeImage() {
    const picture = document.getElementById('picture');
    let currentIndex = 0;

    // החלפה ראשונית
    picture.src = imageSources[currentIndex];

    // כל 5 שניות, החלף לתמונה הבאה
    setInterval(() => {
        currentIndex = (currentIndex + 1) % imageSources.length;
        picture.src = imageSources[currentIndex];
    }, 5000); // כל 5 שניות (5000 מילישניות)
}

// קריאה לפונקציה לאחר טעינת העמוד
window.onload = changeImage;

// פונקציה למעבר בין מצבי הצגת הצ'אט
function toggleChat() {
    const chatBox = document.getElementById('chat-box');
    chatBox.style.display = (chatBox.style.display === 'none' || chatBox.style.display === '') ? 'flex' : 'none';
}
// פונקציה לשליחת הודעה בצ'אט
function sendMessage() {
    const messageInput = document.getElementById('messageInput');
    const message = messageInput.value.trim();

    if (message !== '') {
        const chatMessages = document.getElementById('chat-messages');
        const messageElement = document.createElement('div');
        messageElement.textContent = message;
        chatMessages.appendChild(messageElement);
        messageInput.value = '';
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }
}
// הצגת הצ'אט בעת טעינת העמוד
document.addEventListener("DOMContentLoaded", () => {
    const chatBox = document.getElementById('chat-box');
    chatBox.style.display = 'none'; // הסתרת הצ'אט כברירת מחדל
});
// פונקציה שמחזירה את הברכה המתאימה לפי השעה
const greeting = () => {
    const now = new Date();
    const hours = now.getHours();
    if (hours > 5 && hours < 12) {
        return 'בוקר טוב';
    } else if (hours >= 12 && hours < 18) {
        return 'צהריים טובים';
    } else if (hours >= 18 && hours < 22) {
        return 'ערב טוב';
    } else {
        return 'לילה טוב';
    }
}
// פונקציה להצגת הודעת הפרסומת
function showAdPopup() {
    // קבלת הברכה המתאימה
    const greetingText = greeting();

    // יצירת אלמנט ההודעה
    const adPopup = document.createElement('div');
    adPopup.className = 'adPopupStyle';

    // תוכן ההודעה
    adPopup.innerHTML = `
        <div class="adPopupHeader">
            <span class="closeButton">&times;</span>
        </div>
        <div class="adPopupContent">
        <h2 id="hh">${greetingText}</h2>
        <h3>ברוכים הבאים לאתר </h3>
        <h3 id="nSite"> אהבה קטנה </h3>
        <button class="signupButton" onclick="location.href='../html/login.html'">להצטרפות לאתר שלנו</button>
    </div>
    `;

    // הוספת ההודעה לגוף הדף
    document.body.appendChild(adPopup);

    // סגירת ההודעה בלחיצה על כפתור הסגירה
    document.querySelector('.closeButton').addEventListener('click', function() {
        adPopup.remove();
    });
}
// הפעלת הטיימר של 2 שניות להצגת ההודעה
setTimeout(showAdPopup, 2000);
//עיצוב הפרסומת
const style = document.createElement('style');
style.innerHTML = `
#hh {font-size: 6vh;
    color: rgb(130, 170, 136);
}
    .adPopupStyle {
        position: fixed;
        top: 40%;
        left: 50%;
        transform: translate(-50%, -50%);
        background-color: #f5f7f3;
        color: rgb(141, 176, 136);
        border: 1px solid black;
        padding: 45px;
        border-radius: 10px;
        box-shadow: 0 0 10px rgba(0,0,0,0.1);
        z-index: 1000;
        width: 300px;
        text-align: center;
    }
    .adPopupHeader {
        display: flex;
        justify-content: flex-end;
    }
    .closeButton {
        cursor: pointer;
        font-size: 20px;
        position: absolute;
        top: 5px;
        right: 10px;
    }
    .signupButton {
        margin-top: 13px;
        padding: 10px 20px;
        background-color: #4CAF50;
        color: white;
        border: none;
        border-radius: 5px;
        cursor: pointer;
    }
    .signupButton:hover {
        background-color: rgb(55, 254, 118);
    }
`;
document.head.appendChild(style);

//הצגת המוצרים
const displayProducts = (products, searchValue) => { 
    const productsContainer = document.getElementById('products-container'); 
    productsContainer.innerHTML = ""; 
    if (products.length === 0) {
        text.innerHTML = " ";
        content_start.innerHTML = `<p style="font-size: 24px; text-align: center; margin-top: 20vh">אוי, לא מצאנו באתר שום עמוד שקשור ל "${searchValue}". אולי כדאי לבדוק את האיות או לנסות מילים נרדפות</p>`;
        return;
    }
    products.forEach((product, index) => {
        if (index % 3 === 0) {
            const row = document.createElement('div');
            row.classList.add('row');
            productsContainer.appendChild(row);
        }
        const productDiv = document.createElement('div'); 
        productDiv.classList.add('product'); 
        productDiv.innerHTML = `
            <div class="cardProduct">
                <img src="../images/${product.src}" class="cardImg" alt="${product.name}">
                <div class="cardBody">
                    <h5 class="cardTitle">${product.name}</h5>
                    <p class="cardText">מחיר: ${product.price}</p>
                    <div class="reviews">
                    <span class="stars">★★★★★</span>
                    <span class="reviewCount">(${Math.floor(Math.random() * 100 + 1)} חוות דעת)</span>
                </div>
                </div>
            </div>
        `;
        productsContainer.lastChild.appendChild(productDiv); 

        productDiv.onclick = () => {
            sessionStorage.setItem('selectedProduct', JSON.stringify(product));
            location.href = "../html/products.html"
        }
    });
};
const categories = [
    "collections", "gift", "stickers_name", "Door_signs", "children", 
    "Workspace", "Home_Design", "paper_products", "superheroes", 
    "unicorn", "circus", "rainbow", "chipha", 
    "shavuot_gifts", "gifts_for_women", "valentines_gifts", 
    "teacher_gifts", "hosting_gifts", "gifts_for_men", "parent_gifts"
];

const categoryTypes = new Map([
    ["collections", "קולקציות"],
    ["gift", "מתנות"],
    ["stickers_name", "מדבקות שם"],
    ["Door_signs", "שלטים לדלת"],
    ["children", "ילדים"],
    ["Workspace", "לסביבת העבודה"],
    ["Home_Design", "עיצוב הבית"],
    ["paper_products", "מוצרי נייר"],
    ["superheroes", "גיבורי על"],
    ["unicorn", "חד קרן"],
    ["circus", "קרקס"],
    ["rainbow", "קשת בענן"],
    ["chipha", "ציפחה"],
    ["shavuot_gifts", "מתנות לשבועות"],
    ["gifts_for_women", "מתנות לאישה"],
    ["valentines_gifts", "מתנות ליום האהבה"],
    ["teacher_gifts", "מתנות למורות"],
    ["hosting_gifts", "מתנות לאירוח"],
    ["gifts_for_men", "מתנות לגבר"],
    ["parent_gifts", "מתנות להורים"]
]);

categories.forEach(categoryId => {
    debugger
    const categoryElement = document.getElementById(categoryId);
    if (categoryElement) {
        categoryElement.addEventListener('click', () => {
            const categoryType = categoryTypes.get(categoryId);
            if (categoryType) {
                const filteredProducts = products.filter(product => product.category === categoryType);
                content_start.innerHTML=" ";
                displayProducts(filteredProducts);
            }
        });
    }
});

let history_search = [];
btn_search.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        showProductSearch();
    }
});

icon_search.onclick=() => {
showProductSearch();
};
const showProductSearch=()=>{
    content_start.innerHTML="";
    const searchValue = btn_search.value.toLowerCase(); 
    history_search.push(searchValue);
    localStorage.search = JSON.stringify(history_search); 
    const filteredProducts = products.filter(product => product.name.toLowerCase().includes(searchValue));
    displayProducts(filteredProducts, searchValue);
    btn_search.value = ""; 
    location.href = "#products-container"; 
};

function displayShoppingCart() {
    const cartItemsElement = document.getElementById('cartItems');

    if (user && user.cart && user.cart.length > 0) {
        cartItemsElement.innerHTML = user.cart.map(item => `
            <p>${item.name}: ${item.quantity}</p>
            <p>${item.price}</p>
            <p>שם מותאם: ${item.customName || 'לא הוזן שם מותאם'}</p>
        `).join('');
    } else {
        cartItemsElement.innerHTML = '<p>סל הקניות ריק</p>';
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    displayShoppingCart();  
});

document.addEventListener("DOMContentLoaded", function() {
    const cartIcon = document.getElementById("icon1");
    const cartModal = new bootstrap.Modal(document.getElementById('exampleModal'), {});
    if (cartIcon) {
        cartIcon.onclick = () => {
            displayShoppingCart(); 
            cartModal.show();
        };
    }
    const closeButton = document.querySelector('#exampleModal .btn-close');
    if (closeButton) {
        closeButton.onclick = () => {
            cartModal.hide(); 
        };
    }
});

const addToCart = (product, quantity) => {
    const currentUser = JSON.parse(localStorage.getItem('currentUser')) || { cart: [] };

    const existingProductIndex = currentUser.cart.findIndex(item => item.name === product.name);

    if (existingProductIndex >= 0) {
        const currentQuantityInCart = currentUser.cart[existingProductIndex].quantity;
        if (product.amount >= currentQuantityInCart + quantity) {
            currentUser.cart[existingProductIndex].quantity += quantity;
        } else {
            alert(`אין מספיק כמות במלאי ל${product.name}`);
            return; 
        }
    } else {
        if (product.amount >= quantity) {
            currentUser.cart.push({ ...product, quantity: quantity });
        } else {
            alert(`אין מספיק כמות במלאי ל${product.name}`);
            return; 
        }
    }

    localStorage.setItem('currentUser', JSON.stringify(currentUser));
    sessionStorage.setItem('currentUser', JSON.stringify(currentUser)); // שמירה ב-Session Storage
    alert(`${quantity} יחידות מ${product.name} נוספו לסל הקניות`);
    updateCartCount(); // עדכון הכמות בעמוד הבית
};

const updateCartCount = () => {
    const currentUser = JSON.parse(localStorage.getItem('currentUser')) || { cart: [] };
    const totalItems = currentUser.cart.reduce((count, item) => count + item.quantity, 0);
    const numProductsElement = document.getElementById('numProducts');
    if (numProductsElement) {
        numProductsElement.textContent = totalItems;
    }
};

// קריאה לפונקציה בעת טעינת העמוד
document.addEventListener("DOMContentLoaded", updateCartCount);

document.addEventListener("DOMContentLoaded", function() {
    updateCartCount(); // עדכון כמות המוצרים בסל
    const cartIcon = document.getElementById("icon1");
    const cartModal = new bootstrap.Modal(document.getElementById('exampleModal'), {});
    if (cartIcon) {
        cartIcon.onclick = () => {
            displayShoppingCart(); 
            cartModal.show();
        };
    }
    const closeButton = document.querySelector('#exampleModal .btn-close');
    if (closeButton) {
        closeButton.onclick = () => {
            cartModal.hide(); 
        };
    }
});

function displayShoppingCart() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    const cartItemsElement = document.getElementById('cartItems');

    if (currentUser && currentUser.cart && currentUser.cart.length > 0) {
        cartItemsElement.innerHTML = currentUser.cart.map(item => `
            <div class="cart-item">
                <img src="../images/${item.src}" class="cart-img small-img">
                <p>${item.name}</p>
                <p>כמות: ${item.quantity}</p>
                <p>מחיר: ${item.price}</p>
                <p>שם מותאם: ${item.customName || 'לא הוזן שם מותאם'}</p>
            </div>
        `).join('');
    } else {
        cartItemsElement.innerHTML = '<p>סל הקניות ריק</p>';
    }
}
