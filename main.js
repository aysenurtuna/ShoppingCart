const localStorage = window.localStorage;
const cartBtn = document.querySelectorAll(".btn-cart");
const deleteBtn = document.querySelectorAll(".delete");

eventListener();

function eventListener() {
    window.addEventListener("load", function () {
        for (let i = 0; i < cartBtn.length; i++) {
            cartBtn[i].addEventListener("click", AddCart);
        }
        FillDetailTable();
    })
}



function AddCart(e) {
    let id = e.target.name;   // name değerinde id var
    let price = parseInt(document.querySelector("#p-price-"+id).innerText.split(" ")[0]);
    let count = parseInt(document.querySelector("#p-count-"+id).value);

    let cart = {
        product_name: document.querySelector("#p-name-"+id).innerText,
        product_price: price,
        product_count: count,
        total_price: price * count
    }

    AddCartsToStorage(cart);
    
    ShowAlert();
}

function GetCartsFromStorage() {
    let carts;

    if (localStorage.getItem("carts") === null) {
        carts = [];
    }
    else
        carts = JSON.parse(localStorage.getItem("carts"));

    return carts;
}

function AddCartsToStorage(data) {
    let carts = GetCartsFromStorage();
    carts.push(data);

    localStorage.setItem("carts", JSON.stringify(carts));
}

function DeleteCartsFromStorage(id) {
    let carts = GetCartsFromStorage();
    carts.splice(id, 1);

    localStorage.setItem("carts", JSON.stringify(carts));
    GetDetailPage();
}

function ShowAlert() {
    $("#success-alert").show();
    setTimeout(function () {
        $("#success-alert").hide();
    }, 2000);
}

function GetDetailPage() {
    window.location.href = '/detay.html';
}

function GetShoppingCartPage() {
    window.location.href = '/index.html';
}

function FillDetailTable() {

    document.querySelector("#carts").innerHTML = "";
    let carts = GetCartsFromStorage();
    let total = 0;
    for (let i = 0; i < carts.length; i++) {
        let cart = `<tr>
        <td>${carts[i].product_name}</td>
        <td>${carts[i].product_price}</td>
        <td>${carts[i].product_count}</td>
        <td>${carts[i].total_price}</td>
        <td><i class="fa-solid fa-trash" onclick="DeleteCartsFromStorage('${i}');"></i></td>
        </tr>`;
        total +=carts[i].total_price;
        document.querySelector("#carts").innerHTML += cart;
    }
    document.querySelector("#total").innerHTML = total;
    
}
