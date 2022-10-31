
const continueBtn = document.getElementById("checkout-continue-btn");

const streetInp = document.getElementById("street-input");
const streetTitle = document.getElementById("street-title")
const streetCont = document.getElementById("street-cont")
const streetAlert = document.getElementById("street-alert")

const numberInp = document.getElementById("number-input");
const numberTitle = document.getElementById("number-title")
const numberCont = document.getElementById("number-cont")
const numberAlert = document.getElementById("number-alert")



const esqInp = document.getElementById("esq-input");
const esqTitle = document.getElementById("esq-title")
const esqCont = document.getElementById("esq-cont")
const esqAlert = document.getElementById("esq-alert")

const alertText = document.getElementById("alert-text")

let inputObj = [streetInp, numberInp, esqInp];
let alertObj = [streetAlert, numberAlert, esqAlert];


function validate () {

    if(streetInp.value && numberInp.value && esqInp.value ){
        window.location.replace("checkout-pay.html")
    } 

    inputObj.forEach(input => {
        alertObj.forEach(alert => {
            if (!input.value){
                input.style.borderBottom = "1px solid rgb(223, 80, 80)";
                alertText.innerHTML = `
                <img src="img/signo-de-exclamacion.png" alt="">
                <p>Ningún campo puede estar vacío</p>
                `
                }
        }) 
    })
}

function checkValidation () {
    inputObj.forEach( input => {
        alertObj.forEach(alert => {
            if(input.value){
                input.style.borderBottom = "1px solid gray";
                input.style.color = "gray";
                alertText.innerHTML = ""
                
                }   
        }) 
    });
}
 
