navbarUl = document.getElementById("navbar-ul");

document.addEventListener("DOMContentLoaded", function(){
    document.getElementById("autos").addEventListener("click", function() {
        localStorage.setItem("catID", 101);
        window.location = "products.html"
    });
    document.getElementById("juguetes").addEventListener("click", function() {
        localStorage.setItem("catID", 102);
        window.location = "products.html"
    });
    document.getElementById("muebles").addEventListener("click", function() {
        localStorage.setItem("catID", 103);
        window.location = "products.html"
    });
});

navbarUl.innerHTML += `
        <li class="nav-item">
            <a class="user nav-link" href="#">${localStorage.getItem("user")}</a>
        </li>
`

