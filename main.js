import{ data } from "./js/data.js";
import Swal from 'https://cdn.jsdelivr.net/npm/sweetalert2@11/src/sweetalert2.js'
const contentShoes = document.querySelector(".content_shoes");
const cartShopping = document.querySelector(".cartShopping");
const containerShopping = document.querySelector(".container__shopping");
const contentShopping = document.querySelector(".content__shopping");
const shoppingTotal = document.querySelector(".shoppingTotal");

let shoppingObj =  JSON.parse(localStorage.getItem("shoppingObj")) || {}; 
console.log(shoppingObj);

contentShopping.addEventListener("click",(event)=>{
 if (event.target.classList.contains("rest")) {
     const id = parseInt(event.target.parentElement.id);
     if (shoppingObj[id].amount === 1) {
        Swal.fire({
            title: 'Desea Eliminar?',
            showCancelButton: true,
            confirmButtonText: 'OK',
            denyButtonText: `Cancelar`,
          }).then((result) => {
            if (result.isConfirmed) {            
              delete shoppingObj[id];  
                  
            }else{
                  shoppingObj[id].amount--;
            }
            amountProductInCart();
            printTotalPrice();
            printShoppingCart(); 
          })
        
     }else{
        shoppingObj[id].amount--;
     }
     localStorage.setItem("shoppingObj",JSON.stringify(shoppingObj));
     amountProductInCart();
     printTotalPrice();
     printShoppingCart();
 }
 if (event.target.classList.contains("add")) {
    const id = parseInt(event.target.parentElement.id);
    if (shoppingObj[id].stock > shoppingObj[id].amount) {
        shoppingObj[id].amount++;       
        localStorage.setItem("shoppingObj",JSON.stringify(shoppingObj));  
     }else{
        Swal.fire('No hay stock')
     }
     localStorage.setItem("shoppingObj",JSON.stringify(shoppingObj));
     amountProductInCart();
    printTotalPrice();
    printShoppingCart();
}
if (event.target.classList.contains("del")) {
    const id = parseInt(event.target.parentElement.id);
    Swal.fire({
        title: 'Desea Eliminar?',
        showCancelButton: true,
        confirmButtonText: 'OK',
        denyButtonText: `Cancelar`,
      }).then((result) => {
        if (result.isConfirmed) {            
          delete shoppingObj[id];  
              
        }else{
              shoppingObj[id].amount--;
        }
        localStorage.setItem("shoppingObj",JSON.stringify(shoppingObj));
        amountProductInCart();
        printTotalPrice();
        printShoppingCart(); 
      })
}
 
});

contentShoes.addEventListener("click",(event)=>{
 if (event.target.classList.contains("add_principal")) {
     const id = parseInt(event.target.parentElement.id);
     const [currentProduct] = data.filter((n) => n.id === id);

     if(shoppingObj[id]){
         if (shoppingObj[id].stock > shoppingObj[id].amount) {
            shoppingObj[id].amount++;    
            localStorage.setItem("shoppingObj",JSON.stringify(shoppingObj));            
         }else{
            Swal.fire('Agotado')
         }
          
     }else{
        shoppingObj[id] = currentProduct;
        shoppingObj[id].amount=1;
        localStorage.setItem("shoppingObj",JSON.stringify(shoppingObj));
     }

   

   
     amountProductInCart();
     printTotalPrice();
     printShoppingCart();
 }
});

function amountProductInCart() {    
    const infoQuatityProducts = document.querySelector(".infoQuatityProducts");
    infoQuatityProducts.textContent = Object.values(shoppingObj).length;
 }

function printTotalPrice() {
    const shoppingArray = Object.values(shoppingObj);
     let suma =0;

     shoppingArray.forEach((n)=>{
        suma += n.amount * n.price;
     });

     shoppingTotal.textContent = suma;
}

function printShoppingCart(params) {
    const shoppingArray = Object.values(shoppingObj);
    let html='';
    shoppingArray.forEach(({id,name,price,stock,urlImages,amount}) => {
        html += `
        <div class="shopping">
        <div class="shopping__header">
            <div class="shopping__img">
                <img src="${urlImages}" alt="${name}">
            </div>
            <div class="shopping__info">
                <p>Nombre: ${name}</p>
                <p>Precio: ${price}</p>
                <p>Stock: ${stock}</p>
            </div>
        </div>                
       
        <div class="shopping__actions" id="${id}">
            <span class="rest">-</span>
            <b class="amount">${amount}</b>
            <span class="add">+</span>
            <i class='bx bxs-trash del'></i>
        </div>
    </div>`;
    });
    contentShopping.innerHTML = html;
}

function printShoes(){
    let html = '';

    data.forEach(({ id,name,price,stock,urlImages
    })=>{
    html += `
            <div class="shoes">
                <div class="shoes__img">
                    <img src="${urlImages}" alt="">
                </div>
                <div class="shoes__info">
                    <p class="shoes__info-name">Nombre: ${name} </p>
                    <p class="shoes__info-stock">Stock: ${stock} </p>
                    <p class="shoes__info-price">Precio: ${price} </p>
                </div>
                <div class="shoes__action" id="${id}">
                    <button type="button" class="add_principal">Agregar</button>
                </div>
            </div>`;

    });
    contentShoes.innerHTML = html;
}
printShoes();

printShoppingCart();
amountProductInCart();
printTotalPrice();
cartShopping.addEventListener('click',()=>{       
    containerShopping.classList.toggle("show__shopping");
});