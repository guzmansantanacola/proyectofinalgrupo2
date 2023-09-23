


    usuarioguardado = localStorage.getItem("nombredeusuario");
    document.getElementById("nombreusuario").innerHTML = usuarioguardado;
    
/** DESPLEGABLE */


    document.addEventListener("DOMContentLoaded", function () {
let nombreUsuarioButton = document.getElementById("nombredeusuario");
let menuDesplegable = document.createElement("ul");
    menuDesplegable.id = "menu-desplegable";
   
    menuDesplegable.innerHTML = `
        <li><a href="carrito.html">Mi Carrito</a></li>
        <li><a href="my-profile.html">Mi Perfil</a></li>
        <li><button id="cerrarSesion">Cerrar Sesión</button></li>
    `;
nombreUsuarioButton.addEventListener("click", function (){
    if (menuDesplegable.style.display === "block") {
        menuDesplegable.style.display = "none";
    } else {
        menuDesplegable.style.display = "block";
    }
});
document.body.appendChild(menuDesplegable);
});






