
let loginBtn = document.getElementById("login-btn")
let passAlertp = document.getElementById("pass-alert")
let emailAlertp = document.getElementById("email-alert")
let emailInput = document.getElementById("email")
let passInput = document.getElementById("pass")

loginBtn.addEventListener("click", () => {
    localStorage.setItem("user", emailInput.value);
    
    console.log(passInput.value.length)
    
    if(emailInput.value.length === 0 || passInput.value.length === 0){
       passAlertp.innerHTML = "Ningún campo no puede estar vacío"
    } 
    else if(emailInput.value.length < 6 || passInput.value.length < 6){
        passAlertp.innerHTML = "La contraseña y el email deben ser mayor a 6 caracteres"
    }
    else {
        passAlertp.innerHTML = ""
        window.location.replace("main.html");

    }
        
    
    
    
})

