const callPics = async () => {
    const data = await fetch("../json/data.json");
    const product_arr = await data.json();
    sessionStorage.arr_p = JSON.stringify(product_arr);
    products = product_arr;
};

callPics();

const collections = document.getElementById('collections');
const gift = document.getElementById("gift");
const div1 = document.querySelector("#div1");
const div2 = document.querySelector("#div2");
const logo = document.querySelector("#logo");
const user = document.querySelector("#icon2");
const btn_search = document.getElementById('btn_search');
const numProductsElement = document.getElementById('numProducts'); 
const iconSearch = document.getElementById('icon'); 


logo.onclick = () => {
    location.href = '../html/Home.html';
};
user.onclick = () => {
    location.href = '../html/login.html';
};

div1.innerHTML = `
    <a href="gifts" class="aa">גיבורי על</a><br>
    <a href="gifts" class="aa">חד קרן</a><br>
    <a href="gifts" class="aa">קרקס</a><br>
    <a href="gifts" class="aa">קשת בענן</a><br>
    <a href="gifts" class="aa">ציפחה</a><br>
`;
div2.innerHTML = `
    <a href="gifts" class="aa">מתנות לשבועות</a><br>
    <a href="gifts" class="aa">מתנות לאישה </a><br>
    <a href="gifts" class="aa">מתנות ליום האהבה </a><br>
    <a href="gifts" class="aa">מתנות למורות</a><br>
    <a href="gifts" class="aa">מתנות לאירוח</a><br>
    <a href="gifts" class="aa">מתנות לגבר</a><br>
    <a href="gifts" class="aa">מתנות להורים</a><br>
`;

collections.addEventListener("mouseover", function (event) {
    event.stopPropagation();
    div1.style.display = "block";
});

div1.addEventListener("mouseover", function (event) {
    event.stopPropagation();
    div1.style.display = "block";
});

div1.addEventListener("mouseout", function (event) {
    div1.style.display = "none";
    event.stopPropagation();
});

gift.addEventListener("mouseover", function (event) {
    event.stopPropagation();
    div2.style.display = "block";
});

div2.addEventListener("mouseover", function (event) {
    event.stopPropagation();
    div2.style.display = "block";
});

div2.addEventListener("mouseout", function (event) {
    div2.style.display = "none";
    event.stopPropagation();
});

const showProducts = () => {
    const categories = [    "collections", "gift", "stickers_name", "Door_signs", "children", 
        "Workspace", "Home_Design", "paper_products", "superheroes", 
        "unicorn", "circus", "rainbow", "chipha", 
        "shavuot_gifts", "gifts_for_women", "valentines_gifts", 
        "teacher_gifts", "hosting_gifts", "gifts_for_men", "parent_gifts"];
    categories.forEach(categoryId => {
        debugger;
        const categoryElement = document.getElementById(categoryId);
        if (categoryElement) {
            categoryElement.addEventListener('click', () => {
                sessionStorage.setItem('selectedCategory', categoryId);
                location.href = '../html/Home.html';
            });
        }
    });
};

btn_search.addEventListener("keydown", (event) => {debugger
    if (event.key === "Enter") {
        sessionStorage.setItem('searchValue', btn_search.value.toLowerCase());
        location.href = '../html/Home.html';
    }
});