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
let productCommentsUrl = PRODUCT_INFO_COMMENTS_URL + localStorage.getItem("itemSelectedId") + EXT_TYPE
let mainSection = document.getElementById("main-section");
let item = arrayToShow[0];
let productCommentArray = []

document.addEventListener("DOMContentLoaded", () => {

  getJSONData(productCommentsUrl).then(function(resultObj){
    if (resultObj.status === "ok"){
        productCommentArray = resultObj.data
        
        showComments()
        
        
    }

    
})

  
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
      <div id="comment-section" class="comment-section">
        <h3>Reseñas</h3>
       
      </div>
    </div>
  `
  
} )

function showComments() {
  for(let i = 0; i < productCommentArray.length; i++){
    let comment = productCommentArray[i];

    function rating () {
      let ratingToAppend = ""
      if(comment.score === 1) {
        ratingToAppend = `
      
          <span id="ratingStar-1" class="fa fa-star checked"></span>
          <span id="ratingStar-2" class="fa fa-star"></span>
          <span id="ratingStar-3" class="fa fa-star"></span>
          <span id="ratingStar-4" class="fa fa-star"></span>
          <span id="ratingStar-5" class="fa fa-star"></span>
          `

          return ratingToAppend

      }
      else if(comment.score === 2) {
        ratingToAppend = `
      
          <span id="ratingStar-1" class="fa fa-star checked"></span>
          <span id="ratingStar-2" class="fa fa-star checked"></span>
          <span id="ratingStar-3" class="fa fa-star"></span>
          <span id="ratingStar-4" class="fa fa-star"></span>
          <span id="ratingStar-5" class="fa fa-star"></span>
          `
          return ratingToAppend

      }
      else if(comment.score === 3) {
        ratingToAppend = `
      
          <span id="ratingStar-1" class="fa fa-star checked"></span>
          <span id="ratingStar-2" class="fa fa-star checked"></span>
          <span id="ratingStar-3" class="fa fa-star checked"></span>
          <span id="ratingStar-4" class="fa fa-star"></span>
          <span id="ratingStar-5" class="fa fa-star"></span>
          `
          return ratingToAppend

      }
      else if(comment.score === 4) {
        ratingToAppend = `
      
          <span id="ratingStar-1" class="fa fa-star checked"></span>
          <span id="ratingStar-2" class="fa fa-star checked"></span>
          <span id="ratingStar-3" class="fa fa-star checked"></span>
          <span id="ratingStar-4" class="fa fa-star checked"></span>
          <span id="ratingStar-5" class="fa fa-star"></span>
          `
          return ratingToAppend

      }
      else if(comment.score === 5) {
        ratingToAppend = `
      
          <span id="ratingStar-1" class="fa fa-star checked"></span>
          <span id="ratingStar-2" class="fa fa-star checked"></span>
          <span id="ratingStar-3" class="fa fa-star checked"></span>
          <span id="ratingStar-4" class="fa fa-star checked"></span>
          <span id="ratingStar-5" class="fa fa-star checked"></span>
          `
          return ratingToAppend

      }
    }

    document.getElementById("comment-section").innerHTML +=
    `
        <div class="comments">
        <div class="cont">
          <div class="user-cont">
            <h2>${comment.user}</h2>
            <div class="rating" >
              ${rating()}
            </div>
            
          </div>
            <div class="date">
            ${comment.dateTime}
            </div>
            
    
        </div>
        
          <p>${comment.description}</p>
        </div>
        `
    console.log(comment)
  }
}