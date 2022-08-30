let navUl = document.getElementById("nav-izq");

navUl.innerHTML += `
        <li>
          <a href="">${localStorage.getItem("user")}</a>
        </li>
`