const CAR_SECTION_URL = "https://japceibal.github.io/emercado-api/cats_products/101.json";

let minCount = undefined;
let maxCount = undefined;

minPriceInput = document.getElementById("rangeFilterCountMin");
maxPriceInput = document.getElementById("rangeFilterCountMax");

backArrow = document.getElementById("backArrow");

let currentSortCriteria = undefined;
let CurrentSectionArray = [];
let shopCartArray = [];

document.addEventListener("DOMContentLoaded", function(e){
    userDropdown();

    getJSONData(wantedSection).then(function(resultObj){
        if (resultObj.status === "ok"){
            SectionArray = resultObj.data
            CurrentSectionArray = sortCategories("masRelevante", SectionArray.products)
            showSection();
            showProductInfo();
        }
    });
    sortContent();
    filterContent();
    });


function showSection(){
    let htmlContentToAppend = "";
        /*htmlContentToAppend += `
        <div class="backArrow-cont">
        <button id="backArrow"><img class="backArrow" src="img/backarrow.png" alt=""></button>
        </div>
        
        `*/
    
    document.getElementById("product-title").innerHTML = SectionArray.catName
    
    for(let i = 0; i < CurrentSectionArray.length; i++){
        let product = CurrentSectionArray[i];
    
        if (((minCount == undefined) || (minCount != undefined && parseInt(product.cost) >= minCount)) &&
            ((maxCount == undefined) || (maxCount != undefined && parseInt(product.cost) <= maxCount))){
            
            htmlContentToAppend += `
            <div id=${product.id} class="card">
                <img src="${product.image}" class="card-img-top" alt="...">
                <div id=${product.id} class="card-body">
                    <h5 class="card-title">${product.name}</h5>
                    <p class="">${product.soldCount} vendidos</p>
                    <div class = "price ">
                        <p class="currency card-text">${product.currency}</p>
                        <p class="cost card-text">${product.cost}</p>
                    </div>

                </div>
            </div>
                `
            }
            document.getElementById("Sections").innerHTML = htmlContentToAppend;
        }
        };
 
function sortCategories(criteria, array){
    let result = [];
    if (criteria === "mayor"){
        result = array.sort(function(a, b) {
            let aCost = parseInt(a.cost);
            let bCost = parseInt(b.cost);

            if ( aCost > bCost ){ return -1; }
            if ( aCost < bCost ){ return 1; }
            return 0;
        });
    } 
    else if (criteria === "menor"){
        result = array.sort(function(a, b) {
            let aCost = parseInt(a.cost);
            let bCost = parseInt(b.cost);

            if ( aCost < bCost ){ return -1; }
            if ( aCost > bCost ){ return 1; }
            return 0;
        })
    
    }
    else if(criteria === "masRelevante"){
        result = array.sort(function (a,b) {
            let aSold = parseInt(a.soldCount)
            let bSold = parseInt(b.soldCount)

            if ( aSold > bSold ){ return -1; }
            if ( aSold < bSold ){ return 1; }
            return 0;
        });
        
    }
    else if(criteria === "menosRelevante"){
        result = array.sort(function (a,b) {
            let aSold = parseInt(a.soldCount)
            let bSold = parseInt(b.soldCount)

            if ( aSold < bSold ){ return -1; }
            if ( aSold > bSold ){ return 1; }
            return 0;
        });
        
    }
    
    return result;
    
}

function showProductInfo () {
    for(let i=0;i<CurrentSectionArray.length;i++){
        product = CurrentSectionArray[i]
        
        let itemBuyBtn = document.getElementById(product.id);
        
        itemBuyBtn.addEventListener("click",()=>{
            
            console.log(itemBuyBtn.parentNode.id)

            localStorage.setItem("product", JSON.stringify(CurrentSectionArray.filter(x =>  x.id == (itemBuyBtn.id))));
            localStorage.setItem("itemSelectedId", itemBuyBtn.id);

            window.location.replace("product-info.html");
         })     
    }
}

function rangeFilter () {
    minCount = minPriceInput.value;
    maxCount = maxPriceInput.value;

    if ((minCount != undefined) && (minCount != "") && (parseInt(minCount)) >= 0){
        minCount = parseInt(minCount);
    }
    else{
        minCount = undefined;
    }

    if ((maxCount != undefined) && (maxCount != "") && (parseInt(maxCount)) >= 0){
        maxCount = parseInt(maxCount);
    }
    else{
        maxCount = undefined;
    }
    showSection();
    showProductInfo();
}

function sortAndShowCategories(sortCriteria, CurrentSectionArray){
    currentSortCriteria = sortCriteria;

    if(SectionArray != undefined){
        CurrentSectionArray = SectionArray;
    }

    CurrentSectionArray = sortCategories(currentSortCriteria, CurrentSectionArray);

    showSection();
    showProductInfo();
}

function userDropdown () {
    //Display a dropdown when username is clicked (on left corner)
  
    //Redirects: - Cart
    //           - Profile
    //           - Log out
  
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

function searchFunc () {
    searchBar = document.getElementById("search-bar");
    
    if(searchBar.value){
        CurrentSectionArray = CurrentSectionArray.filter(x =>  x.name.toUpperCase().includes(searchBar.value.toUpperCase()) || x.description.toUpperCase().includes(searchBar.value.toUpperCase()));
        showSection()
        showProductInfo()
    }
    else if(!searchBar.value){
        CurrentSectionArray = sortCategories("masRelevante", SectionArray.products)
        showSection()
        showProductInfo()
     }
}

function sortContent () {
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
        console.log("aloxd")
    })
    
    masRelevantesBtn.addEventListener("click", () => {
        orderDropBtn.innerHTML = masRelevantesBtn.innerHTML
        dropdown.classList.toggle("show");
        dropArrow.classList.toggle("drop-arrow-flip")
        CurrentSectionArray = sortCategories("masRelevante", SectionArray.products)
        showSection()
        showProductInfo()
    })
    
    menosRelevantesBtn.addEventListener("click", () => {
        orderDropBtn.innerHTML = menosRelevantesBtn.innerHTML
        dropdown.classList.toggle("show");
        dropArrow.classList.toggle("drop-arrow-flip")
        CurrentSectionArray = sortCategories("menosRelevante", SectionArray.products)
        showSection()
        showProductInfo()
    })
    
    mayorPrecioBtn.addEventListener("click", () => {
        orderDropBtn.innerHTML = mayorPrecioBtn.innerHTML
        dropdown.classList.toggle("show");
        dropArrow.classList.toggle("drop-arrow-flip")
        CurrentSectionArray = sortCategories("mayor", SectionArray.products)
        showSection()
        showProductInfo()
    })
    
    menorPrecioBtn.addEventListener("click", () => {
        orderDropBtn.innerHTML = menorPrecioBtn.innerHTML
        dropdown.classList.toggle("show");
        dropArrow.classList.toggle("drop-arrow-flip")
        CurrentSectionArray = sortCategories("menor", SectionArray.products)
        showSection()
        showProductInfo()
    })
}

function filterContent () {
    document.getElementById("clearRangeFilter").addEventListener("click", function(){
        document.getElementById("rangeFilterCountMin").value = "";
        document.getElementById("rangeFilterCountMax").value = "";
        minCount = undefined;
        maxCount = undefined;
        showSection();
    });

    document.getElementById("rangeFilterCount").addEventListener("click", function(){
        //Obtengo el mínimo y máximo de los intervalos para filtrar por cantidad
        //de productos por categoría.

        rangeFilter();
        
    });
}

function showFilter() {
    const filter = document.getElementById("filter-container");

    if(filter.style.display === "block") filter.style.display="none", document.getElementById("Sections").style.marginTop="2em"
    else {
        filter.style.display="block"
        filter.style.opacity ="0"

        function animation () {
            filter.style.opacity="100"
        } 

        setTimeout(animation, 100)
        document.getElementById("Sections").style.marginTop="5em"
    }
}



