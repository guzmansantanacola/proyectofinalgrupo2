

    usuarioguardado = localStorage.getItem("nombredeusuario");
    document.getElementById("nombreusuario").innerHTML = usuarioguardado;
    
/** DESPLEGABLE */


    document.addEventListener("DOMContentLoaded", function () {
let nombreUsuarioButton = document.getElementById("nombreusuario");
let menuDesplegable = document.createElement("ul");
    menuDesplegable.id = "menu-desplegable";
   
    menuDesplegable.innerHTML = `
        <li class="iguales"><a href="carrito.html">Mi Carrito</a></li>
        <li class="iguales" ><a href="my-profile.html">Mi Perfil</a></li>
        <li class="iguales"><button id="cerrarSesion">Cerrar Sesión</button></li>
    `;
    menuDesplegable.style.display = "none";
nombreUsuarioButton.addEventListener("click", function (){

    const rect = nombreUsuarioButton.getBoundingClientRect();
    const top = rect.bottom;
    const left = rect.left;

    //
    menuDesplegable.style.position = "fixed";
    menuDesplegable.style.top = `${top}px`;
    menuDesplegable.style.left = `${left}px`;
  
    if (menuDesplegable.style.display === "none") {
        menuDesplegable.style.display = "block";
    } else {
        menuDesplegable.style.display = "block";
    }
});
document.body.appendChild(menuDesplegable);
});




