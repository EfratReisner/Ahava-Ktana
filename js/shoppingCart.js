const displayCart = () => {
    const cartItemsElement = document.getElementById("cartItems");
    const totalPriceElement = document.getElementById("totalPrice");

    const currentUser = JSON.parse(localStorage.getItem('currentUser')) || { cart: [] };
    const cart = currentUser.cart || [];

    cartItemsElement.innerHTML = '';
    let totalPrice = 0;

    if (cart.length > 0) {
        cart.forEach(item => {
            const itemElement = document.createElement('div');
            const itemPrice = parseFloat(item.price.replace('₪', '').trim());
            itemElement.classList.add('cart-item');
            itemElement.innerHTML = `
                <div style="display: flex; align-items: center; justify-content: space-between;">
                    <a href="../html/product.html?name=${encodeURIComponent(item.name)}">
                        <img src="../images/${item.src}" class="cart-img small-img">
                    </a>
                    <p>${item.name} - ${item.price} <br> כמות - x ${item.quantity} יחידות </p>
                    <p>מחיר - ${itemPrice * item.quantity}<p>
                    <div class="btn-group" role="group" aria-label="Basic outlined example">
                        <button type="button" class="btn btn-outline-primary btn-sm" onclick="updateQuantity('${item.name}', -1)">
                            <i class="bi bi-dash"></i>
                        </button>
                        <button type="button" class="btn btn-outline-primary btn-sm" onclick="updateQuantity('${item.name}', 1)">
                            <i class="bi bi-plus"></i>
                        </button>
                    </div>
                </div>
            `;
            cartItemsElement.appendChild(itemElement);
            totalPrice += itemPrice * parseInt(item.quantity, 10);
        });
        totalPriceElement.innerHTML = `
        <div class="total-price-container">
            <p>מחיר כולל: ₪${totalPrice.toFixed(2)}</p>
            <div class="button-container">
            <a href="payment.html" class="no-underline">
                    <button class="button">
                        למעבר לתשלום
                        <svg fill="currentColor" viewBox="0 0 24 24" class="icon">
                            <path clip-rule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm4.28 10.28a.75.75 0 000-1.06l-3-3a.75.75 0 10-1.06 1.06l1.72 1.72H8.25a.75.75 0 000 1.5h5.69l-1.72 1.72a.75.75 0 101.06 1.06l3-3z" fill-rule="evenodd"></path>
                        </svg>
                    </button>
                </a>
            </div>
        </div>
    `;
    
    } else {
        cartItemsElement.innerHTML = '<p>אין פה עדיין כלום... זה הזמן לחזור לחנות ולהתחיל למלא את היום שלכם באהבה :)</p>';
        totalPriceElement.innerText = ''; 
    }
};

function updateQuantity(productName, change) {
    const currentUser = JSON.parse(localStorage.getItem('currentUser')) || { cart: [] };
    const productIndex = currentUser.cart.findIndex(item => item.name === productName);
    if (productIndex >= 0) {
        const productInStock = currentUser.cart[productIndex]; 
        const newQuantity = parseInt(currentUser.cart[productIndex].quantity) + change; 

        if (newQuantity > 0) {
            currentUser.cart[productIndex].quantity = newQuantity; 
        } else if (newQuantity <= 0) {
            currentUser.cart.splice(productIndex, 1); 
        } 

        if (newQuantity > productInStock.amount) {
            alert(`הכמות שבחרת גדולה מהכמות במלאי. הכמות המקסימלית היא ${productInStock.amount} יחידות.`);
            currentUser.cart[productIndex].quantity = productInStock.amount; 
        }

        localStorage.setItem('currentUser', JSON.stringify(currentUser));
        let users = JSON.parse(localStorage.getItem('users')) || []; 
        const userIndex = users.findIndex(user => currentUser.email === user.email && currentUser.password === user.password); 
        if (userIndex !== -1) {
            users[userIndex] = currentUser; 
            localStorage.setItem('users', JSON.stringify(users)); 
        }
        displayCart();
    }
}

setTimeout(() => {
    const customAlert = document.getElementById('custom-alert');
    customAlert.style.display = 'block';

    setTimeout(() => {
        customAlert.style.display = 'none';
    }, 10000);
}, 3000); 

document.addEventListener("DOMContentLoaded", displayCart);