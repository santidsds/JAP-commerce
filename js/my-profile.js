userDropdown()

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