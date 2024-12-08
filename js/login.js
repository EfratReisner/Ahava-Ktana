let users = JSON.parse(localStorage.getItem('users')) || [];

const submit = document.getElementById("login");
const email = document.getElementById('email');
const code = document.getElementById('password');
const passwordToggle = document.getElementById('passwordToggle');


passwordToggle.onclick = () => {
    if (passwordToggle.checked) {
        code.type = 'text';
    } else {
        code.type = 'password';
    }
};

submit.onclick = (event) => {
    localStorage.removeItem('currentUser');
    localStorage.removeItem('cart');

    event.preventDefault();

    if (email.value.trim() === '' || code.value.trim() === '') {
        alert('אנא מלא/י את כל השדות');
        return; 
    }

    const existingUser = users.find(user => user.email === email.value);
    if (existingUser) {
        if (existingUser.code === code.value) {
            localStorage.setItem('currentUser', JSON.stringify(existingUser));
            alert('ברוך שובך!'); 
            location.href = "../html/Home.html";
        } else {
            alert('הקוד שהזנת אינו תואם לקוד השמור.');
            code.value = "";
        }
    } else {
        const user = { code: code.value, email: email.value, cart: [] }; 
        users.push(user);
        localStorage.setItem('users', JSON.stringify(users)); 
        localStorage.setItem('currentUser', JSON.stringify(user)); 
        alert("נרשמת בהצלחה!");
        location.href = "../html/Home.html";
    }
};
