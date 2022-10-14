let navUl = document.getElementById("nav-izq");

navUl.innerHTML += `
        <li>
          <button class="userBtn" id="userBtn" href="">${localStorage.getItem("user")}</button>
        </li>
`

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

window.addEventListener("DOMContentLoaded", () => {
  getJSONData(cartArticlesURL).then((res) => {
    if(res.status === "ok"){
      cartArticlesArray = res.data
      showCartItems()
      
    }
    
  })
  
  
})

function showCartItems () {
  for(let i=0; i<cartArticlesArray.articles.length; i++){
    let subtotalCount = 0
    let item = cartArticlesArray.articles[0]
    

    cartItemsCont.innerHTML += `
    <div class="left-cont-cart">
    <img src=${item.image} alt="">
    <div class="about">
      <h1 class="title">${item.name}</h1>
      <div class="counter">
        <div id="cartCounterBtnMenos${i}" class="btn">-</div>
        <div id="cartCounterResult${i}" class="count">1</div>
        <div id="cartCounterBtnMas${i}" class="btn">+</div>
      </div>
      
    </div>
  </div>
  

  <div class="prices">
    <p id="cartPrice">${item.currency} ${item.unitCost}</p>
    <button id="cartRemoveItem" class="cartRemoveItem">Remove</button>
  </div>
    `

    
  let itemCounter = parseInt(document.getElementById("cartCounterResult"+i).innerHTML);
  let counter = 0
  let itemCounterMas = document.getElementById("cartCounterBtnMas"+i);
  let itemCounterMenos = document.getElementById("cartCounterBtnMenos"+i);
  let subtotalItemCount = document.getElementById("itemCount");
  
  subtotalCount = item.unitCost
    
    itemCounterMas.addEventListener("click", () => {
      counter += 1
      
      document.getElementById("cartCounterResult"+i).innerHTML = itemCounter + counter

      let currentItemCounter = parseInt(document.getElementById("cartCounterResult"+i).innerHTML);

      subtotal.innerHTML = `
        ${item.currency} ${subtotalCount * currentItemCounter}
      `
      subtotalItemCount.innerHTML = `
        ${currentItemCounter} items
      `
    })
  
    itemCounterMenos.addEventListener("click", () => {
      counter -= 1

      document.getElementById("cartCounterResult"+i).innerHTML = itemCounter + counter

      let currentItemCounter = parseInt(document.getElementById("cartCounterResult"+i).innerHTML);

      subtotal.innerHTML = `
        ${item.currency} ${subtotalCount * currentItemCounter}
      `
      subtotalItemCount.innerHTML = `
        ${currentItemCounter} items
      `
    })
  
  subtotal.innerHTML = `
    ${item.currency} ${subtotalCount}
  `
  }
}