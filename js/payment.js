const deliverySelect = document.getElementById("delivery");
const totalCostElement = document.getElementById("total-cost");
const shippingCostElement = document.getElementById("shipping-cost");

const totalCost = calculateTotalCostFromCart();

deliverySelect.addEventListener("change", function() {
    updateShippingCost(totalCost);
});

updateShippingCost(totalCost);

function updateShippingCost(totalCost) {
    const deliveryType = deliverySelect.value;
    let shippingCost = 0;

    if (deliveryType === "home") {
        if (totalCost < 200) {
            shippingCost = 20;
            shippingCostElement.textContent = `משלוח: 20 ש"ח`;
        } else {
            shippingCost = 0;
            shippingCostElement.textContent = `משלוח: 0 ש"ח`;
        }
    } else {
        shippingCostElement.textContent = `משלוח: 0 ש"ח`;
    }

    const finalCost = totalCost + shippingCost;
    totalCostElement.textContent = `סה"כ לתשלום: ${finalCost.toFixed(2)} ש"ח`;
}

function calculateTotalCostFromCart() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser')) || { cart: [] };
    const cart = currentUser.cart || [];
    let totalCost = 0;

    cart.forEach(item => {
        const price = parseFloat(item.price) || 0; 
        const quantity = parseInt(item.quantity) || 0; 
        totalCost += price * quantity;
    });

    return totalCost;
}

function updateStockAfterPurchase() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser')) || { cart: [] };
    currentUser.cart = currentUser.cart.filter(item => {
        item.amount -= item.quantity;
        return item.amount > 0;
    });
    localStorage.setItem('currentUser', JSON.stringify(currentUser));
}

function validateRequiredFields() {
    const requiredFields = document.querySelectorAll("[required]");
    for (let field of requiredFields) {
        if (!field.value.trim()) {
            return false;
        }
    }
    return true;
}

function handlePayment() {
    if (validateRequiredFields()) {
        updateStockAfterPurchase();
        let currentUser = JSON.parse(localStorage.getItem('currentUser'));
        let users = JSON.parse(localStorage.getItem('users')) || [];
        if (currentUser && currentUser.cart) {
            currentUser.cart = [];
            localStorage.setItem('currentUser', JSON.stringify(currentUser));    
            const userIndex = users.findIndex(user => user.email === currentUser.email);
            if (userIndex !== -1) {
                users[userIndex].cart = [];
                localStorage.setItem('users', JSON.stringify(users));
            }
        }
        localStorage.removeItem('cart');

        alert("התשלום בוצע בהצלחה");
        window.location.href = '../html/Home.html';
    } else {
        alert("אנא מלא את כל השדות הנדרשים");
    }
}

document.getElementById("submit").addEventListener("click", function(event) {
    event.preventDefault(); 
    handlePayment();
});
