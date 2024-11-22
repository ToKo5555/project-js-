let table = document.querySelector("table")
let navbar = document.querySelector("nav");
let tBody = document.getElementById("rows");
let  table2 = document.getElementById("table2")
let sum = document.getElementById("sum")
window.onscroll = function () {
    let navbar = document.getElementById("navbar");
    if (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  };
async function getCart() {
    let cartList = await fetch("https://restaurant.stepprojects.ge/api/Baskets/GetAll")
    return cartList.json()
}
getCart().then(data => data.forEach(item => tBody.innerHTML += cartRows(item)))





function cartRows(item){
  
    return `   
             <tr class = "background">
                <td class = "mytd" ><i class="fa-solid fa-x" onclick = "deleteX(${item.product.id})"></i> <i class="fa-solid fa-pencil"></i></td>
                <td><img src= "${item.product.image}"</td>
                <td class = "mainproductname">${item.product.name}</td>
                <td><i class="fa-solid fa-circle-plus" onclick = "miumate (${item.price},${item.quantity},${item.product.id})"></i>${item.quantity}<i class="fa-solid fa-circle-minus"onclick = "daaminuse (${item.price},${item.quantity},${item.product.id})"></i></td>
                <td>$${item.price}</td>
                <td>$${item.price * item.quantity}</td>
            </tr> `;
          
}
async function async() {
    let listItems = fetch(
      "https://restaurant.stepprojects.ge/api/Baskets/GetAll"
    );
    return (await listItems).json();
  }
  
  function deleteX(id) {
    fetch(`https://restaurant.stepprojects.ge/api/Baskets/DeleteProduct/${id}`, {
      method: "DELETE",
      headers: {
        accept: "*/*",
      },
    })
      .then((data) => data.text())
      .then((deleteData) => {
        tBody.innerHTML = ""
        async().then((data) =>
          data.forEach((item) => tBody.innerHTML += cartRows(item)));
      });
  }
function miumate(cardPrice,cardQuantity,cardId){
    cardQuantity ++
    let dasaafteibeli = {
     quantity: cardQuantity,
     price: cardPrice,
     productId: cardId,
    }
fetch("https://restaurant.stepprojects.ge/api/Baskets/UpdateBasket",{
    method:"PUT",
    headers:{
        accept:'*/*',
       'Content-Type': 'application/json',
    },
    body: JSON.stringify(dasaafteibeli)
    }).then(res => res.text()).then(data =>{
     tBody.innerHTML =""
    getCart().then(data => data.forEach(item => 
        tBody.innerHTML += cartRows(item)))
})

}
function daaminuse(cardPrice,cardQuantity,cardId){
    cardQuantity --;
    let dasaafteibeli = {
     quantity: cardQuantity,
     price: cardPrice,
     productId: cardId,
    }
fetch("https://restaurant.stepprojects.ge/api/Baskets/UpdateBasket",{
    method:"PUT",
    headers:{
        accept:'*/*',
       'Content-Type': 'application/json',
    },
    body: JSON.stringify(dasaafteibeli)
}).then(res => res.text()).then(data =>{
   tBody.innerHTML = ""
    getCart().then(data => data.forEach(item => tBody.innerHTML += cartRows(item)))
})

}
fetch("https://restaurant.stepprojects.ge/api/Baskets/GetAll")
.then(res => res.json())
.then(data => {
  let allPrice = data.map((item) => item.quantity * item.price);
  let sumPrice = allPrice.reduce((prev,current) => {
    return prev + current
  })
   sum.innerText +=  sumPrice + "$"
  
   
})

let line1 = document.getElementById("line1")
let line2 = document.getElementById("line2")
let line3 = document.getElementById("line3")
let burgerMenu = document.getElementById("burgerMenu")
burgerMenu.addEventListener("click", function(){
  line1.classList.toggle("line1rotate")
  line2.classList.toggle("line2rotate")
  line3.classList.toggle("line3rotate")
 
});

function toggleSlide() {
  const slide = document.getElementById('slide');
  if (slide.classList.contains('active')) {
      slide.classList.remove('active');
  } else {
      slide.classList.add('active');
  }
}

