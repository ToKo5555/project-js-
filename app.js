let navbar = document.getElementById('navbar');
let ul = document.getElementById("myul")
let section = document.getElementById("mysct")
let section2 = document.getElementById("fullsection")
let li = document.getElementById("all")
let inputrange = document.getElementById("range")
let buttonreset = document.getElementsByClassName("reset")
let nuts = document.getElementById("nuts")
let vegan = document.getElementById("vegan")
let filterBtn = document.getElementById("filterBtn")
let label = document.getElementById("spiciness-label");
let card = document.getElementById("filtercard")
let reset = document.getElementsByClassName("reset")
let spicinessRange = document.getElementById("spicinessRange");
let spicinessValue = document.getElementById("spicinessValue");
let filterReset = document.getElementById("filterReset");
let filterApply = document.getElementById("filterApply");

window.onscroll = function () {
  let navbar = document.getElementById("navbar");
  if (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }
};



   fetch("https://restaurant.stepprojects.ge/api/Categories/GetAll").then(pasuxi2 => pasuxi2.json()).then(data2 =>{
     data2.forEach(item2 => myul.innerHTML +=showNavbar(item2))
    
    })
   function showNavbar(item2) {
     return `<li onclick="showCardsByCategory(${item2.id})">${item2.name}</li>`
   }
   function showCardsByCategory(id) {
    card.innerHTML = ""
   fetch(`https://restaurant.stepprojects.ge/api/Categories/GetCategory/${id}`).
   then(pasuxi => pasuxi.json())
   .then(finalData => finalData.products.forEach(list => card.innerHTML += showcards(list)
       ));
      }

      
      fetch("https://restaurant.stepprojects.ge/api/Products/GetAll")
.then(pasuxi => pasuxi.json ())
.then (data =>{
     data.forEach(list => card.innerHTML += showcards(list))
    
});
function showcards(list){
return `
           <div class= "allproductcard"> <img src="${list.image}" alt="">
            <h3>${list.name}</h3>
            <p>spiciness:${list.spiciness}</p>
            <div class = "inputradio">
                <i class=></i>
                <i class="${list.nuts ?"fa-regular fa-circle-check" : "fa-regular fa-circle"}"></i>
                <label for="">nuts</label>
                <i class="${list.vegeterian ?"fa-regular fa-circle-check" : "fa-regular fa-circle"}"></i>
                <label for="">Vegeterian</label>
            </div>
            <div class = "cardbottom">
                <h2>$${list.price}</h2>
                <button onclick = "addcart(${list.id},${list.price})"class = "borderblack" type="submit">Add To Cart</button>
            </div></div>`
            
  }
 
  

 function addcart(prodId,prodPrice){
  
  let cartinfo = {
    quantity: 1,
    price: prodPrice,
    productId:prodId,
   
  }
  fetch("https://restaurant.stepprojects.ge/api/Baskets/AddToBasket",{
    method: "POST",
    headers: {
      accept : 'text/plain',
      'Content-Type': 'application/json',
       
    },
    body:JSON.stringify(cartinfo)
  }).then(res => res.text()).then(() => alert("წარმატებით დაემატა"))
 }

 



let spiciness = "";
filterApply.addEventListener("click", function (e) {
  e.preventDefault();
  spicinessRange.value > "-1"
    ? (spiciness = spicinessRange.value)
    : (spiciness = "");
  nuts.checked ? (nuts.value = true) : "";
  vegan.checked ? (vegan.value = true , nuts.value = false) : (vegan.value = false,nuts.value = "");
  !nuts.checked ? (nuts.value = "") : (nuts.value = false);
  !vegan.checked ? (vegan.value = "") : (vegan.value = true);
 
  fetch(
    `https://restaurant.stepprojects.ge/api/Products/GetFiltered?vegeterian=${vegan.value}&nuts=${nuts.value}&spiciness=${spiciness}`
  )
    .then((res) => res.json())
    .then((data) => {
     card.innerHTML = "";
      data.forEach((list) => (card.innerHTML += showcards(list)));
      });
});
 
filterReset.addEventListener("click", function () {
  fetch("https://restaurant.stepprojects.ge/api/Products/GetAll")
    .then((response) => response.json())
    .then((data) => {
      card.innerHTML = "";
      data.forEach((list) => (card.innerHTML += showcards(list)));
      });
  spicinessRange.value = "-1";
  spicinessValue.innerText =
    spicinessRange > -1 ? spicinessRange : "Not Chosen";
  nuts.checked ? (nuts.checked = false) : "";
  vegan.checked ? (vegan.checked = false) : "";
});
 
spicinessRange.addEventListener("input", function () {
  let spicinessRangeVal = spicinessRange.value;
  spicinessValue.innerText =
    spicinessRangeVal > -1 ? spicinessRangeVal : "Not Chosen";
});



fetch("https://restaurant.stepprojects.ge/api/Products/GetAll")
.then(pasuxi => pasuxi.json ())
.then (data =>{
    console.log(data);
    showcards(data)
    
});

let line1 = document.getElementById("line1")
let line2 = document.getElementById("line2")
let line3 = document.getElementById("line3")
let burgerMenu = document.getElementById("burgerMenu")
burgerMenu.addEventListener("click", function(){
  line1.classList.toggle("line1rotate")
  line2.classList.toggle("line2rotate")
  line3.classList.toggle("line3rotate")
 
})



function toggleSlide(){
  const slide = document.getElementById('slide');
  if (slide.classList.contains('active')) {
      slide.classList.remove('active')
  } else {
      slide.classList.add('active');
  }
}



