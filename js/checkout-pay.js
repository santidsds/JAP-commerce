
const continueBtn = document.getElementById("checkout-continue-btn")

const addCardBtn = document.getElementById("add-payment-card")

const addBankaccBtn = document.getElementById("add-payment-bankacc")

const midCont = document.getElementById("mid-cont")

const wholeSection = document.getElementById("whole-section")


function addCard(){
    midCont.innerHTML =  `
    <div class="add-card-cont">
        <div class="street-cont"><p id="card-name-title">Nombre de titular</p><input type="text" name="card-name" id="card-name-input" oninput="checkValidation()"></div>
        <div class="number-cont"><p id="card-number-title">Numero de tarjeta</p><input type="text" name="number" id="card-number-input" oninput="checkValidation()"></div>
        
        <div class="esq-cont card-bottom-cont">
            <div><p id="card-expire-title">Fecha de vencimiento</p><input type="text" name="card-expire" id="card-expire-input" oninput="checkValidation()"></div>
            <div><p id="card-code-title">Código de seguridad</p><input type="text" name="card-code" id="card-code-input" oninput="checkValidation()">
        </div>
        
    </div>
    <div class="alert-text" id="alert-text"></div>
    
    <div class="buttons">
        <button id="back-btn" onclick="goBack()">Volver</button>
        <button id="checkout-continue-btn" class="checkout-continue-btn" onclick="validate()">Confirmar compra</button></div>
    </div>
    `
}


function addBankAcc(){
    midCont.innerHTML =  `
    <div class="add-card-cont">
        <div class="street-cont"><p>Nro de cuenta</p><input type="text" name="bankacc" id="bank-acc-input"></div>
        <div class="alert-text" id="alert-text"></div>    
        <div class="buttons">
            <button id="back-btn" onclick="goBack()">Volver</button>
            <button id="checkout-continue-btn" class="checkout-continue-btn" onclick="validateBankAcc()" >Confirmar compra</button></div>
        </div>
    </div>
    `
}


function goBack() {
    midCont.innerHTML =  `
    <div class="button-cont">
        <button class="add-payment-card" id="add-payment-card" onclick="addCard()"><img src="img/add-creditcard.png" alt=""><p>Agregar tarjeta</p></button>
        <button class="add-payment-bankacc" id="add-payment-bankacc" onclick="addBankAcc()"><img src="img/add-bankacc.png" alt=""><p>Agregar cuenta bancaria</p></button>
    </div>
    <div class="button-cont-2">
        <button class="paypal-btn"><img class="paypal-img" src="img/paypal.png" alt=""></button>
        <button class="mercado-pago-btn"><img class="mp-img" src="img/mercado-pago.svg" alt=""></button>
        <button class="applepay-btn"><img class="applepay-img" src="img/apple-pay.png" alt=""></button>
    </div>
    ` 
}


function validate () {

    //This function validates inputs on add-payment-card and add-payment-bank-acc //

    const cardNameInp = document.getElementById("card-name-input");
    const cardNumberInp = document.getElementById("card-number-input");
    const cardExpireInp = document.getElementById("card-expire-input");
    const cardCodeInp = document.getElementById("card-code-input");

    const alertText = document.getElementById("alert-text")
    
    let inputObj = [cardNameInp, cardNumberInp, cardCodeInp, cardExpireInp];

    //This shows the "successfull buy" pop up

    if(cardCodeInp.value && cardExpireInp.value && cardNameInp.value && cardNumberInp.value ){
        setTimeout(() => {
            wholeSection.innerHTML = `
        <div class="buy-succes">
            <div class="buy-succes-top-cont" id="buy-succes-top-cont" >
                <img src="img/success.png" alt="">
                <h2>Compra exitosa</h2>
            </div>

            <div class="buy-success-mid-cont" id="buy-success-mid-cont">
            
            </div>

            <div class="buy-succes-bot-cont" id="buy-succes-bot-cont">
                <button class="back-to-index" id="back-to-index" onclick="backToIndex()" >Volver al inicio</button>
            </div>
        </div>
        `
            
        }, 1000);
        } 
    
    inputObj.forEach(input => {
            
            if (!input.value){
                input.style.borderBottom = "1px solid rgb(223, 80, 80)";
                alertText.innerHTML = `
                <img src="img/signo-de-exclamacion.png" alt="">
                <p>Ningún campo puede estar vacío</p>
                `
                }           
            })
    }

    
    
    
function checkValidation () {

    const cardNameInp = document.getElementById("card-name-input");
    const cardNumberInp = document.getElementById("card-number-input");
    const cardExpireInp = document.getElementById("card-expire-input");
    const cardCodeInp = document.getElementById("card-code-input");
    const alertText = document.getElementById("alert-text")
    
    let inputObj = [cardNameInp, cardNumberInp, cardCodeInp, cardExpireInp];

    inputObj.forEach( input => {
            if(input.value){
                input.style.borderBottom = "1px solid gray";
                input.style.color = "gray";
                alertText.innerHTML = ""
                
                }
    });
}

function backToIndex () {
    window.location.replace("main.html")
}

function validateBankAcc () {

    const alertText = document.getElementById("alert-text")

    const bankAccInp = document.getElementById("bank-acc-input")

    if(bankAccInp.value){
        setTimeout(() => {
            wholeSection.innerHTML = `
        <div class="buy-succes">
            <div class="buy-succes-top-cont" id="buy-succes-top-cont" >
                <img src="img/success.png" alt="">
                <h2>Compra exitosa</h2>
            </div>

            <div class="buy-success-mid-cont" id="buy-success-mid-cont">
            
            </div>

            <div class="buy-succes-bot-cont" id="buy-succes-bot-cont">
                <button class="back-to-index" id="back-to-index" onclick="backToIndex()" >Volver al inicio</button>
            </div>
        </div>
        `
            
        }, 1000);
    } 
    
    else {
        bankAccInp.style.borderBottom = "1px solid rgb(223, 80, 80)";
        alertText.innerHTML = `
        <img src="img/signo-de-exclamacion.png" alt="">
        <p>Ningún campo puede estar vacío</p>
        `
     }
    

}
