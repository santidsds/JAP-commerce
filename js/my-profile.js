
//Inputs
const nameInput = document.getElementById("name-input");
const secondNameInput = document.getElementById("second-name-input");
const lastnameInput = document.getElementById("lastname-input");
const secondLastnameInput = document.getElementById("second-lastname-input");
const emailInput = document.getElementById("email-input");
const phoneInput = document.getElementById("phone-input");

//Buttons that change content
const profilePersonalInfoSection = document.getElementById("profile-personal-info")
const profileDirectionSection = document.getElementById("profile-directions")

//Container of the current content
const currentContent = document.getElementById("current-content");

//Alert paragraph 
const alertText = document.getElementById("alert-text")



document.addEventListener("DOMContentLoaded", () => {
  userDropdown()
  profilePersonalInfoSection.childNodes[0].style.display = "block"
  checkLocalStorage()
  
})

function validateAndSave () {
  //validates and saves inputs on personal info
  //called onclick by: (save-btn) 
  let obj = [nameInput, lastnameInput, emailInput]
  
  obj.forEach(input => {
    if (!input.value){
      input.style.borderBottom = "1px solid rgb(223, 80, 80)";
      alertText.innerHTML = `
      <img src="img/signo-de-exclamacion.png" alt="">
      <p>Los campos obligatorios no pueden estar vacíos</p>
      `
      }
      else if (nameInput.value && lastnameInput.value && emailInput.value) {

        localStorage.setItem("name", nameInput.value);
        localStorage.setItem("lastname", lastnameInput.value);
        localStorage.setItem("email", emailInput.value);
      }
  })
}

function userDropdown  () {
  const navUl = document.getElementById("nav-izq");

  navUl.innerHTML += `
          <li>
            <button class="userBtn" id="userBtn" href="">${localStorage.getItem("user")}</button>
          </li>
  `

  document.getElementById("userBtn").addEventListener("click", () => {
    document.getElementById("user-settings-hide").classList.toggle("user-settings-swipe");
  })

  document.getElementById("user-settings-salir").addEventListener("click", () => {
    window.location.replace("index.html")
  })
  document.getElementById("user-settings-cart").addEventListener("click", () => {
    window.location.replace("cart.html")
  })
    document.getElementById("user-settings-perfil").addEventListener("click", () => {
      window.location.replace("my-profile.html")
    })
}

function showPersonalInformation () {
  window.location.reload()
}

function showDirectionSection () {
  profilePersonalInfoSection.childNodes[0].style.display = "none"
  profileDirectionSection.childNodes[0].style.display = "block"

  console.log(document.getElementById("profile-directions").childNodes[0])
  currentContent.innerHTML = 
  `
  <div class="mid-cont">
    <div id="street-cont" class="street-cont"><p id="street-title">Calle</p><input type="text" name="street" id="street-input" oninput="checkValidation()"></div>
    <div id="number-cont" class="number-cont"><p id="number-title">Número</p><input type="text" name="number" id="number-input"oninput="checkValidation()"></div>
    <div id="esq-cont" class="esq-cont"><p id="esq-title">Esq.</p><input type="text" name="esq" id="esq-input"oninput="checkValidation()"></div>
    <div class="alert-text" id="alert-text"></div>
  </div>
  `
}

function checkLocalStorage () {
  //Displays saved values on inputs 

  if (localStorage.getItem("name") != 0){
    nameInput.value = localStorage.getItem("name")
    lastnameInput.value = localStorage.getItem("lastname")
    emailInput.value = localStorage.getItem("email")
  } 
  else {
    emailInput.value = localStorage.getItem("user")
  }
}