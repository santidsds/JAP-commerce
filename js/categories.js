const ORDER_ASC_BY_NAME = "AZ";
const ORDER_DESC_BY_NAME = "ZA";
const ORDER_BY_PROD_COUNT = "Cant.";
let currentCategoriesArray = [];
let currentSortCriteria = undefined;
let minCount = undefined;
let maxCount = undefined;


//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){
    userDropdown();
    hideDiv()
    getJSONData(CATEGORIES_URL).then(function(resultObj){
        if (resultObj.status === "ok"){
            currentCategoriesArray = resultObj.data
            showCategoriesList()
            //sortAndShowCategories(ORDER_ASC_BY_NAME, resultObj.data);
        }
    });
    sortContent()
});


function sortCategories(criteria, array){
    let result = [];
    if (criteria === "mayor"){
        result = array.sort(function(a, b) {
            let aCost = parseInt(a.productCount);
            let bCost = parseInt(b.productCount);

            if ( aCost > bCost ){ return -1; }
            if ( aCost < bCost ){ return 1; }
            return 0;
        });
    } 
    else if (criteria === "menor"){
        result = array.sort(function(a, b) {
            let aCost = parseInt(a.productCount);
            let bCost = parseInt(b.productCount);

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

function setCatID(id) {
    localStorage.setItem("catID", id);
    window.location = "products.html"
}

function showCategoriesList(){
    let htmlContentToAppend = "";
    for(let i = 0; i < currentCategoriesArray.length; i++){
        let category = currentCategoriesArray[i];
        console.log(category)

        if (((minCount == undefined) || (minCount != undefined && parseInt(category.productCount) >= minCount)) &&
            ((maxCount == undefined) || (maxCount != undefined && parseInt(category.productCount) <= maxCount))){
            

            htmlContentToAppend += `
            <div onclick="setCatID(${category.id})">
                <ul class="card-wrapper">
                    <li class="card">
                        <img src='${category.imgSrc}' alt=''>
                        <div class="card-cont">
                            <div class="card-inner-cont">
                                <h3><a href="">${category.name}</a></h3>
                                <p class="vendidos">${category.productCount} vendidos</p>
                            </div>
                        
                            <p>${category.description}</p>
                        </div>
                        
                    </li>
                </ul>
            </div>
            `
        }

        document.getElementById("cat-list-container").innerHTML = htmlContentToAppend;
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
    showCategoriesList()
}

function sortAndShowCategories(sortCriteria, categoriesArray){
    currentSortCriteria = sortCriteria;

    if(categoriesArray != undefined){
        currentCategoriesArray = categoriesArray;
    }

    currentCategoriesArray = sortCategories(currentSortCriteria, currentCategoriesArray);

    //Muestro las categorías ordenadas
    showCategoriesList();
}

function searchFunc () {
    searchBar = document.getElementById("search-bar");
    
    if(searchBar.value){
        currentCategoriesArray = currentCategoriesArray.filter(x =>  x.name.toUpperCase().includes(searchBar.value.toUpperCase()) || x.description.toUpperCase().includes(searchBar.value.toUpperCase()));
        showCategoriesList()
    }
    else if(!searchBar.value){
        currentCategoriesArray = sortCategories("masRelevante", currentCategoriesArray)
        showCategoriesList()
     }
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
        if(localStorage.getItem("user")){
            window.location.replace("my-profile.html")
        }
        else {
            window.location.replace("index.html");
        }
    })
 }

  function showFilter() {
    const filter = document.getElementById("filter-container");
    
    
    setTimeout( function () {
        if(filter.style.display === "block") filter.style.display="none", document.getElementById("Sections").style.marginTop="2em"
        else {
        filter.style.display="block"
        filter.style.opacity ="0"

        function animation () {
            
        } 

        setTimeout(() => {
            filter.style.opacity="100"
        }, 50)

        document.getElementById("Sections").style.marginTop="5em"
    }
    }, 250)
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
    })
    
    masRelevantesBtn.addEventListener("click", () => {
        orderDropBtn.innerHTML = masRelevantesBtn.innerHTML
        dropdown.classList.toggle("show");
        dropArrow.classList.toggle("drop-arrow-flip")
        sortAndShowCategories("masRelevante",CurrentSectionArray)
    })
    
    menosRelevantesBtn.addEventListener("click", () => {
        orderDropBtn.innerHTML = menosRelevantesBtn.innerHTML
        dropdown.classList.toggle("show");
        dropArrow.classList.toggle("drop-arrow-flip")
        sortAndShowCategories("menosRelevante",CurrentSectionArray)
    })
    
    mayorPrecioBtn.addEventListener("click", () => {
        orderDropBtn.innerHTML = mayorPrecioBtn.innerHTML
        dropdown.classList.toggle("show");
        dropArrow.classList.toggle("drop-arrow-flip")
        sortAndShowCategories("mayor",CurrentSectionArray)
    })
    
    menorPrecioBtn.addEventListener("click", () => {
        orderDropBtn.innerHTML = menorPrecioBtn.innerHTML
        dropdown.classList.toggle("show");
        dropArrow.classList.toggle("drop-arrow-flip")
        sortAndShowCategories("menor",CurrentSectionArray)
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

function hideDiv () {
    const hide = document.getElementById("hide-div")

    setTimeout(() => {
        hide.style.opacity="0"
        hide.style.zIndex="-1"
    },600)
}

function hamMenu () {
    const menu = document.getElementById("ham-menu");
    const openMenu = document.getElementById("open-ham-menu");
    const closeMenuIcon = document.getElementById("close-ham-menu"); 

    const primaryCont = document.getElementById("primary-container")
    const catListCont = document.getElementById("cat-list-container")
    const contentBar = document.getElementById("content-bar")

    //Open menu and show close button
    menu.style.display="block"
    closeMenuIcon.style.display="block"
    openMenu.style.display="none"

    //Add blur on background
    catListCont.classList.add("blur")
    contentBar.classList.add("blur")
    primaryCont.classList.add("blur")
    
}

function closeMenu () {
    const menu = document.getElementById("ham-menu");
    const openMenu = document.getElementById("open-ham-menu");
    const closeMenuIcon = document.getElementById("close-ham-menu"); 

    const primaryCont = document.getElementById("primary-container")
    const catListCont = document.getElementById("cat-list-container")
    const contentBar = document.getElementById("content-bar")

    
    //Close menu and show open menu button    
    menu.style.display="none"
    closeMenuIcon.style.display="none"
    openMenu.style.display="block"

    //Remove blur filter
    catListCont.classList.remove("blur")
    contentBar.classList.remove("blur")
    primaryCont.classList.remove("blur")
}