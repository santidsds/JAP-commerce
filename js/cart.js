
let id = 25801;
let cartArticlesURL = CART_INFO_URL + id + EXT_TYPE
let cartArticlesArray = []

let newArr = []
let updatedCart = JSON.parse(localStorage.getItem("newShopcart"))

//Ship types
let standard = document.getElementById("envio_standard");
let express = document.getElementById("envio_express");
let premium = document.getElementById("envio_premium");

//Principal container
let cartItemsCont = document.getElementById("cart-items-cont");

//Subtotal container
let cartSubtotalItemsCont = document.getElementById("subtotal-article");

//Subtotal value
let subtotal = document.getElementById("subtotal");

//Container of ship type inputs
let sellOptions = document.getElementById("ship-options");


window.addEventListener("DOMContentLoaded", () => {
  localStorage.setItem("subtotal", 0)
  userDropdown()

  getJSONData(cartArticlesURL).then((res) => {
    if(res.status === "ok"){
      cartArticlesArray = res.data
      addItem()
      showCartItems()
      shipType()
      
    }
  })
})

function showCartItems () {
  //Displays items on cart

  let subtotal = 0
  let itemCount = 0
  
  
 updatedCart[0].articles.forEach(function (item){

  //If currency is UYU, item.unitCost is converted to USD
    if(item.currency === "UYU"){
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
        <p id="cartPrice">USD ${parseInt(item.unitCost/40.7)}</p>
        <button id="cartRemoveItem" class="cartRemoveItem">Remove</button>
      </div>
    </div>
  
    `
    //Updates subtotal
    subtotal += parseInt(item.unitCost/40.7)
    }

    else {
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
    //Updates subtotal
    subtotal += item.unitCost
    }

    //Updates item count
    itemCount += item.count

    //Saves values on localstorage
    localStorage.setItem("subtotal", subtotal)
    localStorage.setItem("itemCount", itemCount)

    document.getElementById("subtotal").innerHTML = "USD" + " " + localStorage.getItem("subtotal")
    document.getElementById("itemCount").innerHTML = localStorage.getItem("itemCount") + " items"

  })
    
  }

  function btnMenos(ID) {
    // Removes -1 to itemResult and updates itemCount and subtotal.

    newArr[0].articles.forEach(function (item){
      const itemResult = document.getElementById("cartCounterResult" + item.id)
      if(ID === item.id){

        //Item count cant be less than 1
        if(parseInt(itemResult.innerHTML)===1){
          itemResult.innerHTML = 1
        }

        // Converts UYU to USD
        else if(item.currency === "UYU"){
          itemResult.innerHTML = parseInt(itemResult.innerHTML) - 1

          //Saves values on localstorage
          localStorage.setItem("itemCount", parseInt(parseInt(localStorage.getItem("itemCount")) - parseInt(1)))
          localStorage.setItem("subtotal", parseInt(parseInt(localStorage.getItem("subtotal")) - parseInt(item.unitCost / 40.7)))
        }
        
        else {
          itemResult.innerHTML = parseInt(itemResult.innerHTML) - 1

          //Saves values on localstorage
          localStorage.setItem("itemCount", parseInt(parseInt(localStorage.getItem("itemCount")) - parseInt(1)))
          localStorage.setItem("subtotal", parseInt(parseInt(localStorage.getItem("subtotal")) - parseInt(item.unitCost)))
        }

        //Updates subtotal
        document.getElementById("subtotal").innerHTML = "USD" + " " + localStorage.getItem("subtotal")

        //Updates item count
        document.getElementById("itemCount").innerHTML = localStorage.getItem("itemCount") + " items"

        //Shows selected ship cost
        shipType()
      }
    })
    
  }

  function btnMas(ID) {
    // Adds +1 to itemResult and updates itemCount and subtotal.

    newArr[0].articles.forEach(function (item){
      const itemResult = document.getElementById("cartCounterResult" + item.id)
      if(ID === item.id){

        //Updates item counter HTML
        
        itemResult.innerHTML = parseInt(itemResult.innerHTML) + 1

        localStorage.setItem("itemCount", parseInt(parseInt(localStorage.getItem("itemCount")) + parseInt(1)))

        // Converts UYU to USD
        if(item.currency === "UYU"){
          localStorage.setItem("subtotal", parseInt(parseInt(localStorage.getItem("subtotal")) + parseInt(item.unitCost / 40.7)))
        } 

        else {
          localStorage.setItem("subtotal", parseInt(parseInt(localStorage.getItem("subtotal")) + parseInt(item.unitCost)))
        }

        //Updates subtotal
        document.getElementById("subtotal").innerHTML = "USD" + " " + localStorage.getItem("subtotal")

        //Updates item count
        document.getElementById("itemCount").innerHTML = localStorage.getItem("itemCount") + " items"

        //Shows selected ship cost
        shipType()

      }

    })
    
  }

  function shipType () {
    //Calculates and prints each ship cost 

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

  function addItem() {
    //Item selected on products is added to cart 

    //This is set on Products (when add to cart button is clicked)
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
      localStorage.setItem("newShopcart", JSON.stringify(newArr))
      console.log(updatedCart)
      
    })
  }

function uniqueID () {
  //Creates an unique ID

  return new Date().getTime().toString();
}

function validate () {
  //Validates if atleast one shiptype is checked and redirects to second checkout step
  //(called by checkoutBtn onclick)

  const alert = document.getElementById("alert");

  if (!(standard.checked || express.checked || premium.checked)){
    alert.innerHTML = "Debes seleccionar un tipo de envío"
  }
   else {
    window.location.replace("checkout.html")
  }
}

function checkValidation () {
  //Checks if atleast one shiptype is checked and removes alert if so

  const alert = document.getElementById("alert");
  if ((standard.checked || express.checked || premium.checked)){
    alert.innerHTML = ""
  }
}

function userDropdown () {
  //Display a dropdown when username is clicked (on left corner)

  //Redirects: - Cart
  //           - Profile
  //           - Log out

  //Section inside navbar
  let navUl = document.getElementById("nav-izq");

  //Get username from localstorage
  navUl.innerHTML += `
          <li>
            <button class="userBtn" id="userBtn" href="">${localStorage.getItem("user")}</button>
          </li>
  `

  //User button
  document.getElementById("userBtn").addEventListener("click", () => {   
    document.getElementById("user-settings-hide").classList.toggle("user-settings-swipe");
  })

  //Log out button
  document.getElementById("user-settings-salir").addEventListener("click", () => {
    window.location.replace("index.html")
  })

  //Cart button
  document.getElementById("user-settings-cart").addEventListener("click", () => {
    window.location.replace("cart.html")
  })

  //Profile button
  document.getElementById("user-settings-perfil").addEventListener("click", () => {
    window.location.replace("my-profile.html")
  })
}
  
