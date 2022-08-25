navbarUl = document.getElementById("navbar-ul");

navbarUl.innerHTML += `
        <li class="nav-item">
            <a class="user nav-link" href="#">${localStorage.getItem("user")}</a>
        </li>
`