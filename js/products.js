const CAR_SECTION_URL = "https://japceibal.github.io/emercado-api/cats_products/101.json";
navbarUl = document.getElementById("navbar-ul");

navbarUl.innerHTML += `
        <li class="nav-item">
            <a class="user nav-link" href="#">${localStorage.getItem("user")}</a>
        </li>
`

let SectionArray = [];



function showSection(){
    
    let htmlContentToAppend = "";
    
    

    document.getElementById("product-title").innerHTML += `
    <h1>${SectionArray.catName}</h1>
    <p>explora todos los artículos de esta categoria</p>
    
    
    `
    
    
    

    for(let i = 0; i < SectionArray.products.length; i++){
        let product = SectionArray.products[i];
        
        
       

        
        htmlContentToAppend += `

        <div class="card">
            <img src="${product.image}" class="card-img-top" alt="...">
            <div class="card-body">
                <h5 class="card-title">${product.name}</h5>
                <p class="">${product.soldCount} vendidos</p>
                
                <div class = "price ">
                    <p class="currency card-text">${product.currency}</p>
                    <p class="cost card-text">${product.cost}</p>
                </div>

                <p class="card-text description">${product.description}</p>
                
                <a href="#" class="btn btn-primary">Comprar</a>
                
            </div>
        </div>
               
            `

        document.getElementById("Sections").innerHTML = htmlContentToAppend;

    }

        
    };
 
document.addEventListener("DOMContentLoaded", function(e){
    
        getJSONData(wantedSection).then(function(resultObj){
            if (resultObj.status === "ok"){
                SectionArray = resultObj.data
                showSection()
                
            }
        })

        

        
    });
 
orderDropBtn = document.getElementById("order-drop-btn");
masRelevantesBtn = document.getElementById("masRelevantes");
menosRelevantesBtn = document.getElementById("menosRelevantes");
mayorPrecioBtn = document.getElementById("mayorPrecio");
menorPrecioBtn = document.getElementById("menorPrecio");
dropdown = document.getElementById("myDropdown");
dropArrow = document.getElementById("drop-arrow");



orderDropBtn.addEventListener("click", () => {
    dropdown.classList.toggle("show");
    dropArrow.classList.toggle("drop-arrow-flip")
    
    
})



masRelevantesBtn.addEventListener("click", () => {
    orderDropBtn.innerHTML = masRelevantesBtn.innerHTML
    dropdown.classList.toggle("show");
    dropArrow.classList.toggle("drop-arrow-flip")

})

menosRelevantesBtn.addEventListener("click", () => {
    orderDropBtn.innerHTML = menosRelevantesBtn.innerHTML
    dropdown.classList.toggle("show");
    dropArrow.classList.toggle("drop-arrow-flip")

})

mayorPrecioBtn.addEventListener("click", () => {
    orderDropBtn.innerHTML = mayorPrecioBtn.innerHTML
    dropdown.classList.toggle("show");
    dropArrow.classList.toggle("drop-arrow-flip")

})

menorPrecioBtn.addEventListener("click", () => {
    orderDropBtn.innerHTML = menorPrecioBtn.innerHTML
    dropdown.classList.toggle("show");
    dropArrow.classList.toggle("drop-arrow-flip")

})








  


