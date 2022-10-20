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

let realArr = []






//Métodos de envío
let standard = document.getElementById("envio_standard");
let express = document.getElementById("envio_express");
let premium = document.getElementById("envio_premium");

let cartItemsCont = document.getElementById("cart-items-cont");
let cartSubtotalItemsCont = document.getElementById("subtotal-article");
let subtotal = document.getElementById("subtotal");
let sellOptions = document.getElementById("sell-options");




window.addEventListener("DOMContentLoaded", () => {

  getJSONData(cartArticlesURL).then((res) => {
    if(res.status === "ok"){
      cartArticlesArray = res.data
      addItem()
      showCartItems()
      shipType()
      
      
      
    }
    
  })

  localStorage.setItem("subtotal", 0)
  
  standard.addEventListener("click", () => {
    shipType() 
  })
  express.addEventListener("click", () => {
    shipType() 
  })
  premium.addEventListener("click", () => {
    shipType() 
  })

  addPayment();

  
  
  
})

function showCartItems () {
  let subtotal = 0
  let itemCount = 0
  
  console.log(realArr[0][0].articles)
  realArr[0][0].articles.forEach(function (item){

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
    realArr[0][0].articles.forEach(function (item){
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
          shipType()

        }
      

      }
    })
    
  }

  function btnMas(ID) {
    realArr[0][0].articles.forEach(function (item){
      const itemResult = document.getElementById("cartCounterResult" + item.id)
      if(ID === item.id){
        
        itemResult.innerHTML = parseInt(itemResult.innerHTML) + 1

        localStorage.setItem("itemCount", parseInt(parseInt(localStorage.getItem("itemCount")) + parseInt(1)))

        localStorage.setItem("subtotal", parseInt(parseInt(localStorage.getItem("subtotal")) + parseInt(item.unitCost)))

        document.getElementById("subtotal").innerHTML = item.currency + " " + localStorage.getItem("subtotal")
        document.getElementById("itemCount").innerHTML = localStorage.getItem("itemCount") + " items"
        shipType()

      }

    })
    
  }

  function shipType () {
    let shipCost = document.getElementById("costo-envio");
    let p = document.getElementById("costo-title-p")
    let total = document.getElementById("total")
    let divToHide = document.getElementById("resumen-pagos")
    let shipPorcentage = 0
    let obj = [standard, express, premium];

    

    obj.forEach((each) => {
      
      if(each.checked){
        divToHide.classList.remove("collapse")
        shipPorcentage = (each.value) / 100

        localStorage.setItem("shipCost", parseInt(localStorage.getItem("subtotal") * shipPorcentage) )
        shipCost.innerHTML = `USD ${localStorage.getItem("shipCost")}`

        p.innerHTML = `Costo de envío (${parseInt((shipPorcentage*100))}%):`
      }
    })

    total.innerHTML = `USD ${parseInt(localStorage.getItem("subtotal")) + parseInt(localStorage.getItem("shipCost")) }`

  }

  function addPayment () {
    let addPaymentBtn = document.getElementById("addPayment");
    let addPaymentDone = document.getElementById("addPaymentDone");
    let addPaymentCancel = document.getElementById("addPaymentCancel");
    let addPaymentDIV = document.getElementById("checkout");
    let mainDIV = document.getElementById("main");
    let nav = document.getElementById("nav-container");

    addPaymentBtn.addEventListener("click", (e) => {
      addPaymentDIV.classList.toggle("chckShow");
      mainDIV.classList.toggle("blurFilter");
      
    })
  
    addPaymentDone.addEventListener("click", () => {
      addPaymentDIV.classList.toggle("chckShow");
      mainDIV.classList.toggle("blurFilter");
      
    });

    addPaymentCancel.addEventListener("click", () => {
      addPaymentDIV.classList.toggle("chckShow");
      mainDIV.classList.toggle("blurFilter");
      
    });



  }

  function addItem() {
    let newArr = []
    let cartLocalStorage = JSON.parse(localStorage.getItem("Shopcart"))
    
    newArr.push(cartArticlesArray)
    cartLocalStorage.forEach(item => {
      const cartObj = {
        id: item.id,
        name: item.name,
        count: 1,
        unitCost: item.cost,
        currency: item.currency,
        image: item.image
      }
  
      newArr[0].articles.push(cartObj)
      
    })
  
    
    
  
    realArr.push(newArr)
    
  
  }

