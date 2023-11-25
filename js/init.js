const CATEGORIES_URL = "https://japceibal.github.io/emercado-api/cats/cat.json";
const PUBLISH_PRODUCT_URL = "https://japceibal.github.io/emercado-api/sell/publish.json";
const PRODUCTS_URL = "https://japceibal.github.io/emercado-api/cats_products/";
const PRODUCT_INFO_URL = "https://japceibal.github.io/emercado-api/products/";
const PRODUCT_INFO_COMMENTS_URL = "https://japceibal.github.io/emercado-api/products_comments/";
const CART_INFO_URL = "https://japceibal.github.io/emercado-api/user_cart/";
const CART_BUY_URL = "https://japceibal.github.io/emercado-api/cart/buy.json";
const EXT_TYPE = ".json";

let showSpinner = function () {
  document.getElementById("spinner-wrapper").style.display = "block";
}

let hideSpinner = function () {
  document.getElementById("spinner-wrapper").style.display = "none";
}

let getJSONData = function (url) {
  let result = {};
  showSpinner();
  return fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        throw Error(response.statusText);
      }
    })
    .then(function (response) {
      result.status = 'ok';
      result.data = response;
      hideSpinner();
      return result;
    })
    .catch(function (error) {
      result.status = 'error';
      result.data = error;
      hideSpinner();
      return result;
    });
}

function redireccionarAlLogin() {
  // obtenemos el valor en Local Storage
  const sesionIniciada = JSON.parse(localStorage.getItem("sesionIniciada"));

  // verificar el valor
  if ((!sesionIniciada) || (JSON.parse(localStorage.getItem("sesionIniciada")) == null)) {
    // Redireccionar a la página de inicio de sesión
    window.location.href = "login.html";
  }
}

redireccionarAlLogin();

function toggleMenu() {
  const list = document.querySelector(".list");
  list.classList.toggle("show");
}

// Nombre de usuario en boton
usuarioguardado = localStorage.getItem("nombredeusuario");
document.getElementById("nombreusuario").textContent = usuarioguardado;


document.addEventListener("DOMContentLoaded", function () {
  /*Desplegable*/
  let nombreUsuarioButton = document.getElementById("nombreusuario");

  let menuDesplegable = document.createElement("ul");

  menuDesplegable.id = "menu-desplegable";

  let menu = localStorage.getItem("menuVisible") === "true";

  menuDesplegable.innerHTML = `<div id="gene">
      <li ><a href="cart.html">Mi Carrito</a></li>
      <li ><a href="my-profile.html">Mi Perfil</a></li>
      <li >
      <button id="cerrarSesion"> Cerrar Sesión </button>
        </li>
       <div class="modos">
       <button class="darkModeSwitch" id="switch">
       <span class="material-symbols-outlined">
       light_mode
       </span>
       <span class="material-symbols-outlined">
        dark_mode
       </span>
        </div> 
        </div> 
  `;

  menuDesplegable.style.display = "none";
  nombreUsuarioButton.addEventListener("click", function () {

    const rect = nombreUsuarioButton.getBoundingClientRect();
    const top = rect.bottom;
    const left = rect.left;


    menuDesplegable.style.position = "fixed";
    menuDesplegable.style.top = `${top}px`;
    menuDesplegable.style.left = `${left}px`;



    /*OCULTAR O MOSTRAR MENU*/


    if (menuDesplegable.style.display === "none") {
      menuDesplegable.style.display = "block";
      localStorage.setItem("menuVisible", "true")
    } else {
      menuDesplegable.style.display = "none";
      localStorage.setItem("menuVisible", "false");
    }

  let botonCerrarSesion = document.getElementById('cerrarSesion');

  //creo array con los datos a borrar en el local storage para iterarlos
  let datos = ['primerNombre', 'segundoNombre', 'primerApellido', 'segundoApellido', 'contacto', 'imgPerfil']

  botonCerrarSesion.addEventListener("click", () => {
    datos.map(i => {
      localStorage.removeItem(i);
    });
    localStorage.setItem("sesionIniciada", JSON.stringify(false));
    window.location.href = "login.html";

  })







  });
  document.body.appendChild(menuDesplegable);

  let botonCerrarSesion = document.getElementById('cerrarSesion');

  //creo array con los datos a borrar en el local storage para iterarlos
  let datos = ['primerNombre','nombredeusuario', 'segundoNombre', 'primerApellido', 'segundoApellido', 'contacto', 'imgPerfil']

  botonCerrarSesion.addEventListener("click", () => {
    datos.map(i => {
      localStorage.removeItem(i);
    });
    localStorage.setItem("sesionIniciada", JSON.stringify(false));
    window.location.href = "login.html";

  })



})
