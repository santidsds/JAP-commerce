const CAR_SECTION_URL = "https://japceibal.github.io/emercado-api/cats_products/101.json";
const ORDER_BY_COST = "Cost.";

orderDropBtn = document.getElementById("order-drop-btn");
masRelevantesBtn = document.getElementById("masRelevantes");
menosRelevantesBtn = document.getElementById("menosRelevantes");
mayorPrecioBtn = document.getElementById("mayorPrecio");
menorPrecioBtn = document.getElementById("menorPrecio");
dropdown = document.getElementById("myDropdown");
dropArrow = document.getElementById("drop-arrow");


let currentSortCriteria = undefined;
let CurrentSectionArray = [];

let navUl = document.getElementById("nav-izq");

navUl.innerHTML += `
        <li>
          <a href="">${localStorage.getItem("user")}</a>
        </li>
`


function showSection(){
    
    let htmlContentToAppend = "";
    
    

    document.getElementById("product-title").innerHTML = `
    <h1>${SectionArray.catName}</h1>
    
    
    
    `

    

    

    console.log(CurrentSectionArray)
    
    
    

    for(let i = 0; i < CurrentSectionArray.length; i++){
        let product = CurrentSectionArray[i];
        
        
       

        
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
                
                CurrentSectionArray = sortCategories("masRelevante", SectionArray.products)
                
                showSection()
                
                
                
                console.log(sortCategories(ORDER_BY_COST, SectionArray.products),"hello")



            }

            
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

