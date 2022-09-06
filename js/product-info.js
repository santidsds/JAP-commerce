let navUl = document.getElementById("nav-izq");

navUl.innerHTML += `
        <li>
          <button class="userBtn" id="userBtn" href="">${localStorage.getItem("user")}</button>
        </li>
`

document.getElementById("userBtn").addEventListener("click", () => {
            
  document.getElementById("user-settings-hide").classList.toggle("user-settings-swipe");
  
})

let arrayToShow = JSON.parse(localStorage.getItem("product"));
let mainSection = document.getElementById("main-section");
let item = arrayToShow[0];

document.addEventListener("DOMContentLoaded", () => {
  //mainSection.innerHTML = `
  
  //`
  
} )