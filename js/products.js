const CAR_SECTION_URL = "https://japceibal.github.io/emercado-api/cats_products/101.json";

let carSectionArray = [];



function showCarSection(){
    
    let htmlContentToAppend = "";
    
    console.log()

    document.getElementById("product-title").innerHTML += `
    <h1>${carSectionArray.catName}</h1>
    <p>Aquí encontraras todos los productos disponibles de la categoría: ${carSectionArray.catName}</p>
    
    `

    for(let i = 0; i < carSectionArray.products.length; i++){
        let product = carSectionArray.products[i];
        console.log(product.image)
       

        
        htmlContentToAppend += `

        <div class="card" style="width: 18rem;">
            <img src="${product.image}" class="card-img-top" alt="...">
            <div class="card-body">
                <h5 class="card-title">${product.name}</h5>
                
                <div class = "price ">
                    <p class="card-text">${product.currency}</p>
                    <p class="card-text">${product.cost}</p>
                </div>

                <p class="card-text description">${product.description}</p>
                
                <a href="#" class="btn btn-primary">Comprar</a>
            </div>
        </div>
               
            `

        document.getElementById("carSection").innerHTML = htmlContentToAppend;

    }

        
    };
 
document.addEventListener("DOMContentLoaded", function(e){
        getJSONData(CAR_SECTION_URL).then(function(resultObj){
            if (resultObj.status === "ok"){
                carSectionArray = resultObj.data
                showCarSection()
                
            }
        })
    });
 


