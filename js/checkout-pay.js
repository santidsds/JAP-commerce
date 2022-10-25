const continueBtn = document.getElementById("checkout-continue-btn")
const addCardBtn = document.getElementById("add-payment-card")
const addBankaccBtn = document.getElementById("add-payment-bankacc")
const midCont = document.getElementById("mid-cont")

continueBtn.addEventListener("click", () => {
    
})

function addCard(){
    midCont.innerHTML =  `
    <div class="add-card-cont">
    <div class="street-cont"><p>Nombre de titular</p><input type="text" name="street" id="street-input"></div>
    <div class="number-cont"><p>Numero de tarjeta</p><input type="text" name="number" id="street-input"></div>
    
    <div class="esq-cont card-bottom-cont">
    <div><p>Fecha de vencimiento</p><input type="text" name="esq" id="card-expire-input"></div>
    <div><p>Código de seguridad</p><input type="text" name="esq" id="card-code-input">
    </div>
    </div>
    
    <div class="buttons">
    <button id="back-btn" onclick="goBack()">Volver</button>
    <button id="checkout-continue-btn" class="checkout-continue-btn" >Confirmar compra</button></div>
    </div>
    `
}
function addBankAcc(){
    midCont.innerHTML =  `
    <div class="add-card-cont">
    <div class="street-cont"><p>Nro de cuenta</p><input type="text" name="street" id="street-input"></div>
        <div class="buttons">
            <button id="back-btn" onclick="goBack()">Volver</button>
            <button id="checkout-continue-btn" class="checkout-continue-btn" >Confirmar compra</button></div>
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

