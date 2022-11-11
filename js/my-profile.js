
//Inputs
const nameInput = document.getElementById("name-input");
const secondNameInput = document.getElementById("second-name-input");
const lastnameInput = document.getElementById("lastname-input");
const secondLastnameInput = document.getElementById("second-lastname-input");
const emailInput = document.getElementById("email-input");
const phoneInput = document.getElementById("phone-input");

//Profile picture
const removeProfilePic = document.getElementById("remove-profile-pic");
const addProfilePic = document.getElementById("add-profile-pic");
const profilePic = document.getElementById("profile-pic");
const profilePicImg = document.getElementById("profile-picture-img")
const pictureInput = document.getElementById("chooseFile");

//Change content buttons
const profilePersonalInfoSection = document.getElementById("profile-personal-info");
const profileDirectionSection = document.getElementById("profile-directions");

//Container of the current content
const currentContent = document.getElementById("current-content");

//Alert paragraph 
const alertText = document.getElementById("alert-text");


document.addEventListener("DOMContentLoaded", () => {
  userDropdown()
  profilePersonalInfoSection.childNodes[0].style.display = "block"
  checkLocalStorage()
  setProfilePic()
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

        localStorage.setItem("secondName", secondNameInput.value);
        localStorage.setItem("secondLastname", secondLastnameInput.value);
        localStorage.setItem("phone", phoneInput.value);
      }
  })
}

function userDropdown () {
  //Display a dropdown when username is clicked (on left corner)

  //Redirects to: - Cart
  //              - Profile
  //              - Log out

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
    window.location.replace("my-profile.html")
  })
}

function showPersonalInformation () {
  //Displays "Personal Information section"

  window.location.reload()
}

function showDirectionSection () {
  //Displays "Direction section"

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
       
    secondNameInput.value = localStorage.getItem("secondName", secondNameInput.value);
    secondLastnameInput.value = localStorage.getItem("secondLastname", secondLastnameInput.value);
    phoneInput.value = localStorage.getItem("phone", phoneInput.value);
  } 
  else {
    emailInput.value = localStorage.getItem("user")
  }
}

function saveImg (){
  //Transforms input picture to DataURL and saves it on localstorage "profilePic"

  const reader = new FileReader();

  reader.addEventListener("load", () => {
    localStorage.setItem("profilePic", reader.result)
  })

  reader.readAsDataURL(pictureInput.files[0])
  window.location.reload()
}

function setProfilePic () {
  // sets saved image as profile picture

  const imgData = localStorage.getItem("profilePic")
  if(imgData){
    profilePicImg.src = imgData
  } 
}


