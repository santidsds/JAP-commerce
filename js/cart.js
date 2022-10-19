let navUl = document.getElementById("nav-izq");
const getSubtotal = localStorage.getItem("subtotal")


navUl.innerHTML += `
        <li>
          <button class="userBtn" id="userBtn" href="">${localStorage.getItem("user")}</button>
        </li>
`

let obj = {
"articles": [
{
"id": 50924,
"name": "Peugeot 208",
"count": 1,
"unitCost": 20000,
"currency": "USD",
"image": "img/prod50924_1.jpg"
}, 
{
  "id": 50922,
  "name": "Ferrari 208",
  "count": 1,
  "unitCost": 10000,
  "currency": "USD",
  "image": "img/prod50922_3.jpg"
  }, 
  {
    "id": 50932,
    "name": "Ferrari 208",
    "count": 1,
    "unitCost": 10000,
    "currency": "USD",
    "image": "img/prod50922_3.jpg"
    }, 
    {
      "id": 50942,
      "name": "Ferrari 208",
      "count": 1,
      "unitCost": 10000,
      "currency": "USD",
      "image": "img/prod50922_3.jpg"
      }
]
}

document.getElementById("userBtn").addEventListener("click", () => {
            
  document.getElementById("user-settings-hide").classList.toggle("user-settings-swipe");
  
})

document.getElementById("user-settings-salir").addEventListener("click", () => {
  window.location.replace("index.html")
})
document.getElementById("user-settings-cart").addEventListener("click", () => {
  window.location.replace("cart.html")
})
document.getElementById("user-settings-perfil").addEventListener("click", () => {
  window.location.replace("my-profile.html")
})

let id = 25801;
let cartArticlesURL = CART_INFO_URL + id + EXT_TYPE
let cartArticlesArray = []

let cartItemsCont = document.getElementById("cart-items-cont");
let cartSubtotalItemsCont = document.getElementById("subtotal-article");
let subtotal = document.getElementById("subtotal");
let sellOptions = document.getElementById("sell-options");

window.addEventListener("DOMContentLoaded", () => {
  getJSONData(cartArticlesURL).then((res) => {
    if(res.status === "ok"){
      cartArticlesArray = res.data
      showCartItems()
      
    }
    
  })

  localStorage.setItem("subtotal", 0)
  
  
})

function showCartItems () {
  let subtotal = 0
  let itemCount = 0

  obj.articles.forEach(function (item){

    cartItemsCont.innerHTML += `
    <div class="items-inner-cont">
      <img class="item-image"src=${item.image} alt="">
      <div class="about">
        <h1 class="title">${item.name}</h1>
        <div class="counter">
          <div id="cartCounterBtnMenos${item.id}"  onclick="btnMenos(${item.id})" class="btn"><img src="img/minus.png" alt=""></div>
          <div id="cartCounterResult${item.id}" class="count">1</div>
          <div id="cartCounterBtnMas${item.id}" onclick="btnMas(${item.id})" class="btn"><img src="img/plus.png" alt=""></div>
        </div>
        
      </div>
      <div class="prices">
        <p id="cartPrice">${item.currency} ${item.unitCost}</p>
        <button id="cartRemoveItem" class="cartRemoveItem">Remove</button>
      </div>
    </div>
  
    `

    subtotal += item.unitCost
    itemCount += item.count

    localStorage.setItem("subtotal", subtotal)
    localStorage.setItem("itemCount", itemCount)

    document.getElementById("subtotal").innerHTML = item.currency + " " + localStorage.getItem("subtotal")
    document.getElementById("itemCount").innerHTML = localStorage.getItem("itemCount") + " items"

  })
    
  }

  function btnMenos(ID) {
    obj.articles.forEach(function (item){
      const itemResult = document.getElementById("cartCounterResult" + item.id)
      if(ID === item.id){
        if(parseInt(itemResult.innerHTML)===0){
          itemResult.innerHTML = 0
        }
        else {

          itemResult.innerHTML = parseInt(itemResult.innerHTML) - 1

          localStorage.setItem("itemCount", parseInt(parseInt(localStorage.getItem("itemCount")) - parseInt(1)))

          localStorage.setItem("subtotal", parseInt(parseInt(localStorage.getItem("subtotal")) - parseInt(item.unitCost)))

          document.getElementById("subtotal").innerHTML = item.currency + " " + localStorage.getItem("subtotal")
          document.getElementById("itemCount").innerHTML = localStorage.getItem("itemCount") + " items"

        }
      

      }
    })
    
  }

  function btnMas(ID) {
    obj.articles.forEach(function (item){
      const itemResult = document.getElementById("cartCounterResult" + item.id)
      if(ID === item.id){
        
        itemResult.innerHTML = parseInt(itemResult.innerHTML) + 1

        localStorage.setItem("itemCount", parseInt(parseInt(localStorage.getItem("itemCount")) + parseInt(1)))

        localStorage.setItem("subtotal", parseInt(parseInt(localStorage.getItem("subtotal")) + parseInt(item.unitCost)))

        document.getElementById("subtotal").innerHTML = item.currency + " " + localStorage.getItem("subtotal")
        document.getElementById("itemCount").innerHTML = localStorage.getItem("itemCount") + " items"

      }

    })
    
  }

