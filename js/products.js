const CAR_SECTION_URL = "https://japceibal.github.io/emercado-api/cats_products/101.json";
let minCount = undefined;
let maxCount = undefined;

swipeBtn = document.getElementById("swipeBtn");

userBtn = document.getElementById("userBtn");

minPriceInput = document.getElementById("rangeFilterCountMin");
maxPriceInput = document.getElementById("rangeFilterCountMax");


orderDropBtn = document.getElementById("order-drop-btn");
masRelevantesBtn = document.getElementById("masRelevantes");
menosRelevantesBtn = document.getElementById("menosRelevantes");
mayorPrecioBtn = document.getElementById("mayorPrecio");
menorPrecioBtn = document.getElementById("menorPrecio");
dropdown = document.getElementById("myDropdown");
dropArrow = document.getElementById("drop-arrow");


let currentSortCriteria = undefined;
let CurrentSectionArray = [];
let shopCartArray = [];

let navUl = document.getElementById("nav-izq");

navUl.innerHTML += `
        <li>
          <button class="userBtn" id="userBtn" href="">${localStorage.getItem("user")}</button>
        </li>
`


function showSection(){
    
    let htmlContentToAppend = "";
    
    

    document.getElementById("product-title").innerHTML = `
    <h1>${SectionArray.catName}</h1>
    
    
    
    `

    

    

    console.log()
    
    
    

    for(let i = 0; i < CurrentSectionArray.length; i++){
        let product = CurrentSectionArray[i];

        if (((minCount == undefined) || (minCount != undefined && parseInt(product.cost) >= minCount)) &&
            ((maxCount == undefined) || (maxCount != undefined && parseInt(product.cost) <= maxCount))){
        
        
       

        
        htmlContentToAppend += `

        <div  class="card">
            <img src="${product.image}" class="card-img-top" alt="...">
            <div id=${product.id} class="card-body">
                <h5 class="card-title">${product.name}</h5>
                <p class="">${product.soldCount} vendidos</p>
                
                <div class = "price ">
                    <p class="currency card-text">${product.currency}</p>
                    <p class="cost card-text">${product.cost}</p>
                </div>

                <p class="card-text description">${product.description}</p>
                
                <button href="#" id="itemBuyBtn${i}" class="btn btn-primary buyButton">Comprar</button>
                
            </div>
        </div>
               
            `
        }
        document.getElementById("Sections").innerHTML = htmlContentToAppend;

        



    }
    

        
    };


    function checkId(elem){
        return elem.parentNode.id.value
    }
    
    
    let subtotalCalc = 0

document.addEventListener("DOMContentLoaded", function(e){
    

        getJSONData(wantedSection).then(function(resultObj){
            if (resultObj.status === "ok"){
                SectionArray = resultObj.data
                
                CurrentSectionArray = sortCategories("masRelevante", SectionArray.products)
                
                showSection()
                shopCartAppend()
                

            }

            
        })

        
        

        function shopCartAppend () {
            for(let i=0;i<CurrentSectionArray.length;i++){

                
                let buttonId = "itemBuyBtn"+i
                let itemBuyBtn = document.getElementById(buttonId);
                shopCartContent = document.getElementById("shopCartContent");
                shopCartRemove = document.getElementById("shopCartRemove");
                cartSubtotal = document.getElementById("cartSubtotal");
                itemPrice = document.getElementById("itemPrice");

                shopCartRemove.addEventListener("click", () => {
                    shopCartContent.innerHTML = ""
                    cartSubtotal.innerHTML = "$ 0";
                    subtotalCalc = 0
                })
                

                
                

                itemBuyBtn.addEventListener("click",()=>{
                    
                    console.log(itemBuyBtn.parentNode.id)

                    localStorage.setItem("product", JSON.stringify(CurrentSectionArray.filter(x =>  x.id == (itemBuyBtn.parentNode.id))));
                    
                    shopCartArray = CurrentSectionArray.filter(x =>  x.id == (itemBuyBtn.parentNode.id));

                    window.location.replace("product-info.html");

                    for(let i=0;i<shopCartArray.length;i++){
                          
                        let item = shopCartArray[i]

                        shopCartContent.innerHTML += `
                        <div class="item">
                            <p class="itemName">${item.name}</p>
                            <p id="itemPrice" class="itemPrice">${item.currency} ${item.cost}</p>
                        </div>
                        `
                        
                        subtotalCalc += parseInt(item.cost)
                        console.log(item)

                        cartSubtotal.innerHTML = item.currency+ " " + parseInt(subtotalCalc)

                        
                        
                    
                    } 

                    
                    
                    
                        
                 }) 
                
                 
            }
            
        }

        

        

        document.getElementById("userBtn").addEventListener("click", () => {
            
            document.getElementById("user-settings-hide").classList.toggle("user-settings-swipe");
            
        })

        

        swipeBtn.addEventListener("click", () => {
            document.getElementById("hero-hide").classList.toggle("swipe")
            
            document.getElementById("swipeImg").classList.toggle("swipeToggle")

            document.getElementById("Sections").classList.toggle("product-hero-section-margin")
            
        })
        
        

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

            console.log(minCount,maxCount)
    
            showSection();
        });

        

        
    });
 
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

function sortAndShowCategories(sortCriteria, CurrentSectionArray){
    currentSortCriteria = sortCriteria;

    if(SectionArray != undefined){
        CurrentSecionArray = SectionArray;
    }

    CurrentSectionArray = sortCategories(currentSortCriteria, CurrentSectionArray);

    showSection();
}

searchBar = document.getElementById("search-bar");

searchBar.addEventListener("input", () => {
    if(searchBar.value){
        CurrentSectionArray = CurrentSectionArray.filter(x =>  x.name.toUpperCase().includes(searchBar.value.toUpperCase()) || x.description.toUpperCase().includes(searchBar.value.toUpperCase()));
        showSection()
    }
    else if(!searchBar.value){
        CurrentSectionArray = sortCategories("masRelevante", SectionArray.products)
        showSection()
        
     }
    


    

    
})




