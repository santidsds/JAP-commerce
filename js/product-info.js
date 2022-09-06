let navUl = document.getElementById("nav-izq");

navUl.innerHTML += `
        <li>
          <button class="userBtn" id="userBtn" href="">${localStorage.getItem("user")}</button>
        </li>
`

document.getElementById("userBtn").addEventListener("click", () => {
            
  document.getElementById("user-settings-hide").classList.toggle("user-settings-swipe");
  
})

let arrayToShow = JSON.parse(localStorage.getItem("product"));
let mainSection = document.getElementById("main-section");
let item = arrayToShow[0];

document.addEventListener("DOMContentLoaded", () => {
  console.log(item)
  mainSection.innerHTML = `
  <div class="main-container">

      <div class="top-cont">
        <div class="img-cont">
          <div id="main-img" class="main-img">
            <img src="img/prod${item.id}_1.jpg" alt="">
          </div>

          <div id="secondary-img" class="secondary-img">
            <img src="img/prod${item.id}_2.jpg" alt="">
            <img src="img/prod${item.id}_3.jpg" alt="">
            <img src="img/prod${item.id}_4.jpg" alt="">
          </div>
        </div>

        <div class="info-cont">

          <div class="title">
            <h1>${item.name}</h1>
            <div class="price">
              <h2>${item.currency} ${item.cost}</h2>
              <p>o en <span>12 coutas de ${item.currency} ${parseInt(item.cost /12)} sin interés</span></p>
              <p class="stock">Stock disponible</p> 
              <p>Cantidad: 1</p>
            </div>
          </div>

          

          <div class="button-cont">
            <button id="buyBtn" class="buyBtn">Comprar ahora</button>
            <button id="cartAddBtn" class="cartAddBtn">Agregar al carrito</button>
          </div>
        </div>
      </div>

      <div class="bottom-cont">
        <div class="description">
          <h2>Descripción</h2>
          <p>${item.description}</p>
        </div>
        
        

      </div>
      <div class="comment-section">
        <h3>Reseñas</h3>
        <div class="comments">
          <h2>User</h2>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Laudantium cupiditate fugiat minus possimus quam magnam nostrum impedit facere quod alias dignissimos adipisci, dolor temporibus sint. Fugit in laudantium voluptatibus autem.</p>
        </div>
        <div class="comments">
          <h2>User</h2>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Laudantium cupiditate fugiat minus possimus quam magnam nostrum impedit facere quod alias dignissimos adipisci, dolor temporibus sint. Fugit in laudantium voluptatibus autem.</p>
        </div>
        <div class="comments">
          <h2>User</h2>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Laudantium cupiditate fugiat minus possimus quam magnam nostrum impedit facere quod alias dignissimos adipisci, dolor temporibus sint. Fugit in laudantium voluptatibus autem.</p>
        </div>
      </div>
    </div>
  `
  
} )