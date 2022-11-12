

let arrayToShow = JSON.parse(localStorage.getItem("product"));
let productCommentsUrl = PRODUCT_INFO_COMMENTS_URL + localStorage.getItem("itemSelectedId") + EXT_TYPE;
let productInfoUrl = PRODUCT_INFO_URL + localStorage.getItem("itemSelectedId") + EXT_TYPE;
let mainSection = document.getElementById("main-section");
let item = arrayToShow[0];
let productCommentArray = [];
let productInfo = [];
let AllProductsArray = []
let addItemtoCart = document.getElementById("cartAddBtn");



document.addEventListener("DOMContentLoaded", () => {
  userDropdown();

  getJSONData(productCommentsUrl).then(function(resultObj){
    if (resultObj.status === "ok"){
        productCommentArray = resultObj.data 
        Comments()
        userComment() 
    }})

    getJSONData(wantedSection).then(function(resultObj){
      if (resultObj.status === "ok"){
          AllProductsArray = resultObj.data.products
        }})

    getJSONData(productInfoUrl).then(function(resultObj){
      if (resultObj.status === "ok"){
          productInfo = resultObj.data

          localStorage.setItem("arr", JSON.stringify(productInfo))
          
          showRelatedProducts()
      }})

  mainSection.innerHTML += `
  <div class="main-container">
      
      <img id="backArrow" class="backArrow" src="img/backarrow.png" alt="">
      <div class="top-cont">
        <div class="img-cont">
          <div id="carouselExampleControls" class="carousel carousel-dark slide" data-bs-ride="carousel">
            <div class="carousel-inner">
              <div class="carousel-item active">
                <img src="img/prod${item.id}_1.jpg" class="d-block w-100" alt="...">
              </div>
              <div class="carousel-item">
                <img src="img/prod${item.id}_2.jpg" class="d-block w-100" alt="...">
              </div>
              <div class="carousel-item">
                <img src="img/prod${item.id}_3.jpg" class="d-block w-100" alt="...">
              </div>
              <div class="carousel-item">
                <img src="img/prod${item.id}_4.jpg" class="d-block w-100" alt="...">
              </div>
            </div>
            <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
              <span class="carousel-control-prev-icon" aria-hidden="true"></span>
              <span class="visually-hidden">Previous</span>
            </button>
            <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
              <span class="carousel-control-next-icon" aria-hidden="true"></span>
              <span class="visually-hidden">Next</span>
            </button>
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
      <div class = "relatedProducts" id = "relatedProducts">
      <h3>Productos relacionados</h3>
      <div class="relatedProducts-cont" id="relatedProducts-cont">
      </div>
      </div>

      <div id="comment-section" class="comment-section">
        <h3>Reseñas</h3>
        <div id="allComments">
        </div>
        
       
      </div>
    </div>
  `
  document.getElementById("backArrow").addEventListener("click", () => {
    window.location.replace("products.html")
  })

  addItemToCart();
})



function Comments() {
  
  if(productCommentArray.length === 0){
    document.getElementById("comment-section").innerHTML += `
    <div id="noComments" class="comments">   
      <div class="temp-cont">
        <p class="no-comments" >Todavía no hay comentarios</p>
      </div> 
      
    </div>
    `
  }

  for(let i = 0; i < productCommentArray.length; i++){
    let comment = productCommentArray[i];

    rating();

    document.getElementById("allComments").innerHTML +=
    `
        <div class="comments">
          <div class="cont">
            <div class="user-cont">
              <h2>${comment.user}</h2>
              <div class="rating" >
                ${rating(comment.score)}
              </div>
            </div>
              <div class="date">
              ${comment.dateTime}
              </div>
          </div>
          <p>${comment.description}</p>
        </div>
        
        `
  }

  document.getElementById("comment-section").innerHTML += `
  
  <div id="submit-comment" class="submit-comment">
      
      <div class="cont">
        <div class="submit-inner-cont">
          <div>
            <h2>${localStorage.getItem("user")}</h2>
          </div>
          <div id="rating-cont"class="rating-cont">
            <span id="ratingStar-1" class="fa fa-star checked"></span>
            <span id="ratingStar-2" class="fa fa-star "></span>
            <span id="ratingStar-3" class="fa fa-star "></span>
            <span id="ratingStar-4" class="fa fa-star "></span>
            <span id="ratingStar-5" class="fa fa-star"></span>
          </div>
        </div>
        <div class="input-cont">
          <input type="textarea" name="user-comment" id="user-comment" placeholder="Agregue un comentario">
        </div>
        <div class="button-cont">
          
          <button id="addComment" class="addComment">Publicar</button>
        </div>
        
      </div>
      <button id="submit-close" ><img class="submit-close" src="img/close.png" alt=""></button>
      
    </div>
  `
}

function rating (stars) {
  let ratingToAppend = ""
  if(stars === 1) {
    ratingToAppend = `
  
      <span class="fa fa-star checked"></span>
      <span class="fa fa-star"></span>
      <span class="fa fa-star"></span>
      <span class="fa fa-star"></span>
      <span class="fa fa-star"></span>
      `

      return ratingToAppend

  }
  else if(stars === 2) {
    ratingToAppend = `
  
      <span class="fa fa-star checked"></span>
      <span class="fa fa-star checked"></span>
      <span class="fa fa-star"></span>
      <span class="fa fa-star"></span>
      <span class="fa fa-star"></span>
      `
      return ratingToAppend

  }
  else if(stars === 3) {
    ratingToAppend = `
  
      <span class="fa fa-star checked"></span>
      <span class="fa fa-star checked"></span>
      <span class="fa fa-star checked"></span>
      <span class="fa fa-star"></span>
      <span class="fa fa-star"></span>
      `
      return ratingToAppend

  }
  else if(stars === 4) {
    ratingToAppend = `
  
      <span class="fa fa-star checked"></span>
      <span class="fa fa-star checked"></span>
      <span class="fa fa-star checked"></span>
      <span class="fa fa-star checked"></span>
      <span class="fa fa-star"></span>
      `
      return ratingToAppend

  }
  else if(stars === 5) {
    ratingToAppend = `
  
      <span class="fa fa-star checked"></span>
      <span class="fa fa-star checked"></span>
      <span class="fa fa-star checked"></span>
      <span class="fa fa-star checked"></span>
      <span class="fa fa-star checked"></span>
      `
      return ratingToAppend

  }
}

function userComment() {
  let ratingStar1 = document.getElementById("ratingStar-1"); 
  let ratingStar2 = document.getElementById("ratingStar-2"); 
  let ratingStar3 = document.getElementById("ratingStar-3"); 
  let ratingStar4 = document.getElementById("ratingStar-4"); 
  let ratingStar5 = document.getElementById("ratingStar-5"); 

  ratingStar2.addEventListener("mouseover", () => {
    ratingStar2.classList.add("checked")
  })
  ratingStar2.addEventListener("mouseout", () => {
    ratingStar2.classList.remove("checked")
  })

  ratingStar3.addEventListener("mouseover", () => {
    ratingStar2.classList.add("checked")
    ratingStar3.classList.add("checked")
  })
  ratingStar3.addEventListener("mouseout", () => {
    ratingStar2.classList.remove("checked")
    ratingStar3.classList.remove("checked")
  })

  ratingStar4.addEventListener("mouseover", () => {
    ratingStar2.classList.add("checked")
    ratingStar3.classList.add("checked")
    ratingStar4.classList.add("checked")
  })
  ratingStar4.addEventListener("mouseout", () => {
    ratingStar2.classList.remove("checked")
    ratingStar3.classList.remove("checked")
    ratingStar4.classList.remove("checked")
  })

  ratingStar5.addEventListener("mouseover", () => {
    ratingStar2.classList.add("checked")
    ratingStar3.classList.add("checked")
    ratingStar4.classList.add("checked")
    ratingStar5.classList.add("checked")
  })
  ratingStar5.addEventListener("mouseout", () => {
    ratingStar2.classList.remove("checked")
    ratingStar3.classList.remove("checked")
    ratingStar4.classList.remove("checked")
    ratingStar5.classList.remove("checked")
  })

  ratingStar1.addEventListener("click", () => {
    localStorage.setItem("userCommentRating", "1")
    document.getElementById("rating-cont").innerHTML = 
    `
    <span id="ratingStar-1" class="fa fa-star checked"></span>
    <span id="ratingStar-2" class="fa fa-star "></span>
    <span id="ratingStar-3" class="fa fa-star "></span>
    <span id="ratingStar-4" class="fa fa-star "></span>
    <span id="ratingStar-5" class="fa fa-star "></span>
    `
  })
  ratingStar2.addEventListener("click", () => {
    localStorage.setItem("userCommentRating", "2")
    document.getElementById("rating-cont").innerHTML = 
    `
    <span id="ratingStar-1" class="fa fa-star checked"></span>
    <span id="ratingStar-2" class="fa fa-star checked"></span>
    <span id="ratingStar-3" class="fa fa-star "></span>
    <span id="ratingStar-4" class="fa fa-star "></span>
    <span id="ratingStar-5" class="fa fa-star "></span>
    `
  })
  ratingStar3.addEventListener("click", () => {
    localStorage.setItem("userCommentRating", "3")
    document.getElementById("rating-cont").innerHTML = 
    `
    <span id="ratingStar-1" class="fa fa-star checked"></span>
    <span id="ratingStar-2" class="fa fa-star checked"></span>
    <span id="ratingStar-3" class="fa fa-star checked"></span>
    <span id="ratingStar-4" class="fa fa-star "></span>
    <span id="ratingStar-5" class="fa fa-star "></span>
    `
  })
  ratingStar4.addEventListener("click", () => {
    localStorage.setItem("userCommentRating", "4")
    document.getElementById("rating-cont").innerHTML = 
    `
    <span id="ratingStar-1" class="fa fa-star checked"></span>
    <span id="ratingStar-2" class="fa fa-star checked"></span>
    <span id="ratingStar-3" class="fa fa-star checked"></span>
    <span id="ratingStar-4" class="fa fa-star checked"></span>
    <span id="ratingStar-5" class="fa fa-star "></span>
    `
  })
  ratingStar5.addEventListener("click", () => {
    localStorage.setItem("userCommentRating", "5")
    document.getElementById("rating-cont").innerHTML = 
    `
    <span id="ratingStar-1" class="fa fa-star checked"></span>
    <span id="ratingStar-2" class="fa fa-star checked"></span>
    <span id="ratingStar-3" class="fa fa-star checked"></span>
    <span id="ratingStar-4" class="fa fa-star checked"></span>
    <span id="ratingStar-5" class="fa fa-star checked"></span>
    `
    
  })
  showUserComment();
}

function showUserComment() {
  document.getElementById("addComment").addEventListener("click", () => {
    localStorage.setItem("userComment" , document.getElementById("user-comment").value)

    if(String(document.getElementById("comment-section").innerHTML).includes("Todavía no hay comentarios")){
      document.getElementById("noComments").innerHTML = ""
      document.getElementById("noComments").classList.remove("comments")
    }
    
    document.getElementById("allComments").innerHTML +=
    `
        <div class="user-comments">
          <div class="cont">
            <div class="user-cont">
              <h2>${localStorage.getItem("user")}</h2>
              <div class="rating" >
                ${rating(parseInt(localStorage.getItem("userCommentRating")))}
              </div>
              
            </div>
              <div class="date">
              
              </div>
              
      
          </div>
        
          <p>${localStorage.getItem("userComment")}</p>
        </div>
        
        `

      document.getElementById("submit-comment").innerHTML = 
      `
      <div class="cont">
        <div class="submit-inner-cont">
          <div>
            <h2>${localStorage.getItem("user")}</h2>
          </div>
          <div id="rating-cont"class="rating-cont">
            <span id="ratingStar-1" class="fa fa-star checked"></span>
            <span id="ratingStar-2" class="fa fa-star "></span>
            <span id="ratingStar-3" class="fa fa-star "></span>
            <span id="ratingStar-4" class="fa fa-star "></span>
            <span id="ratingStar-5" class="fa fa-star"></span>
          </div>
        </div>
        <div class="input-cont">
          <input type="textarea" name="user-comment" id="user-comment" placeholder="Agregue un comentario">
        </div>
        <div class="button-cont">
          
          <button id="addComment" class="addComment">Publicar</button>
        </div>
        
      </div>
      <button id="submit-close" ><img class="submit-close" src="img/close.png" alt=""></button>
      `
      userComment();
      
  })

  document.getElementById("submit-close").addEventListener("click", () => {
    document.getElementById("submit-comment").innerHTML = 
      `
      <div class="cont">
        <div class="submit-inner-cont">
          <div>
            <h2>${localStorage.getItem("user")}</h2>
          </div>
          <div id="rating-cont"class="rating-cont">
            <span id="ratingStar-1" class="fa fa-star checked"></span>
            <span id="ratingStar-2" class="fa fa-star "></span>
            <span id="ratingStar-3" class="fa fa-star "></span>
            <span id="ratingStar-4" class="fa fa-star "></span>
            <span id="ratingStar-5" class="fa fa-star"></span>
          </div>
        </div>
        <div class="input-cont">
          <input type="textarea" name="user-comment" id="user-comment" placeholder="Agregue un comentario">
        </div>
        <div class="button-cont">
          
          <button id="addComment" class="addComment">Publicar</button>
        </div>
        
      </div>
      <button id="submit-close" ><img class="submit-close" src="img/close.png" alt=""></button>
      `
      userComment();
  })
}

function showRelatedProducts(){

  let relatedProductsSection = document.getElementById("relatedProducts-cont");
  
  for(let i=0; i<productInfo.relatedProducts.length ; i++){

    let product = productInfo.relatedProducts[i];
    let itemInfo = AllProductsArray.filter( item => item.id === product.id)[0]
    
    relatedProductsSection.innerHTML += `
    
    <div id="related-cont${product.id}"class="inner-container">
      
        <div class="img-container">
          <img src=${product.image} alt="">
        </div>

        <div class="body">
          <h2>${product.name}</h2>
        
          <div class="price">
          <h3>${itemInfo.currency}</h3>
          <h3>${itemInfo.cost}</h3>
          </div>

        </div>
        <div class ="button-cont">      
      </div>
    </div>
    
  `
   
  }
  
  for(let i=0; i<productInfo.relatedProducts.length ; i++){
    let product = productInfo.relatedProducts[i];
    let relatedBtn = document.getElementById("related-cont"+product.id);

    relatedBtn.addEventListener("click" , () => {

      localStorage.setItem("product", JSON.stringify(AllProductsArray.filter(x =>  x.id == (product.id))));
      localStorage.setItem("itemSelectedId", product.id);

      window.location.replace("product-info.html")
  
      
    })
    
  }

}

function addItemToCart () {
  let addItemtoCart = document.getElementById("cartAddBtn");

  addItemtoCart.addEventListener("click", () => {
    let itemToAdd = JSON.parse(localStorage.getItem("product"))[0]
    postData(itemToAdd)
    window.location.replace("cart.html")
    

  })
}

function userDropdown () {
  //Display a dropdown when username is clicked (on left corner)

  //Redirects to: - Cart
  //              - Profile
  //              - Log out

  let navUl = document.getElementById("nav-izq"); //Section inside navbar

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
  
