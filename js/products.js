const CAR_SECTION_URL = "https://japceibal.github.io/emercado-api/cats_products/101.json";

let carSectionArray = [];

function showCarSection(){
    
    let htmlContentToAppend = "";
    
    console.log()

    for(let i = 0; i < carSectionArray.products.length; i++){
        let product = carSectionArray.products[i];
        console.log(product)
       

        
        htmlContentToAppend += `
            
            
               
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
 


