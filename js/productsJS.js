const displayProductData = (product) => {
    const picDesign = document.getElementById('showPicture');
    const picDetails = document.getElementById('detailProduct');

    picDesign.innerHTML = `
        <img src="../images/${product.src}" class="card-img-top small-img"> <!-- הוספת מחלקת small-img -->
    `;
    picDetails.innerHTML = `
       <div id="picDetails">
        <div class="text_details">
            <div class="reviews">
                <span class="stars">★★★★★</span>
                <span class="reviewCount">(${Math.floor(Math.random() * 100 + 1)} חוות דעת)</span>
            </div>
            <br>
            <h5 class="productName">${product.name}</h5>
            <p class="card-text">מחיר: ${product.price}</p>
            <p class="card-text-about">אודות המוצר: ${product.about}</p>
            <p class="card-text">שם על המוצר: 
            <input type="text" id="nameCustomForProduct"  name="nameOnP"  style="width: 8vw; height: 6vh;"></p><br>
            <input type="number" id="quantity" name="quantity" value="1" min="1" style="width: 6vw; ">
            <button id="addToCart" class="btn btn-primary" style="width: 10vw; height: 6vh;">הוסף לסל קניות</button>
        </div>
    </div>
    `;

    document.getElementById('addToCart').addEventListener('click', () => {
        const quantity = parseInt(document.getElementById('quantity').value);
        const customName = document.getElementById('nameCustomForProduct').value;
        addToCart(product, quantity, customName);
        updateCart();
    });
};

const addToCart = (product, quantity, customName) => {
    let cart = JSON.parse(localStorage.getItem('currentUser')).cart || [];

    const existingProductIndex = cart.findIndex(item => item.name === product.name);

    if (existingProductIndex >= 0) {
        const currentQuantityInCart = cart[existingProductIndex].quantity;

        if (product.amount >= currentQuantityInCart + quantity) {
            cart[existingProductIndex].quantity += quantity;
            cart[existingProductIndex].customName = customName;
        } else {
            alert(`אין מספיק כמות במלאי ל${product.name}`);
            return; 
        }
    } else {
        if (product.amount >= quantity) {
            cart.push({ ...product, quantity: quantity, customName: customName });
        } else {
            alert(`אין מספיק כמות במלאי ל${product.name}`);
            return; 
        }
    }

    const currentUser = JSON.parse(localStorage.getItem('currentUser')) || { cart: [] };
    currentUser.cart = cart;
    localStorage.setItem('currentUser', JSON.stringify(currentUser));

    let users = JSON.parse(localStorage.getItem('users')) || [];

    const userIndex = users.findIndex(user => currentUser.email === user.email && currentUser.password === user.password);
    if (userIndex !== -1) {
        users[userIndex] = currentUser;
        localStorage.setItem('users', JSON.stringify(users));
    }

    alert(`${quantity} יחידות מ${product.name} נוספו לסל הקניות`);
    updateCart(); 
};

const updateCart = () => {
    const cartItemsElement = document.getElementById('cartItems');
    const numProductsElement = document.getElementById('numProducts'); 

    const currentUser = JSON.parse(localStorage.getItem('currentUser')) || { cart: [] };
    const cart = currentUser.cart || [];

    let totalQuantity = 0;

    cartItemsElement.innerHTML = '';

    if (cart.length > 0) {
        cart.forEach(item => {
            const itemElement = document.createElement('div');
            itemElement.innerHTML = `
                <div class="cart-item">
                    <img src="../images/${item.src}" class="cart-img small-img">
                    <p>${item.name}</p>
                    <p>מחיר: ${item.price}</p>
                    <p>כמות: ${item.quantity}</p>
                    <p>שם מותאם: ${item.customName || 'לא הוזן שם מתאים'}</p>
                </div>
            `;
            cartItemsElement.appendChild(itemElement);
            totalQuantity += item.quantity; 
        });
    } else {
        cartItemsElement.innerHTML = '<p>סל הקניות ריק</p>';
    }

    numProductsElement.innerHTML = totalQuantity; 
};

document.addEventListener("DOMContentLoaded", () => {
    const product = JSON.parse(sessionStorage.getItem('selectedProduct'));
    if (product) {
        displayProductData(product);
    }
    updateCart(); 
});
