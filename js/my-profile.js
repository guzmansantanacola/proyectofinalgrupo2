
usuarioguardado = localStorage.getItem("nombredeusuario");
document.getElementById("nombreusuario").textContent = usuarioguardado;


//  <li><button id="modoDia">Modo Día</button> </li>
//  <li><button id="modoNoche">Modo Noche</button>  </li>


/*Desplegable*/
document.addEventListener("DOMContentLoaded", function () {

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








  });
  document.body.appendChild(menuDesplegable);

  /*MODOS*/




  //Boton cerrar Sesion
  let botonCerrarSesion = document.getElementById('cerrarSesion');

  botonCerrarSesion.addEventListener("click", () => {
    localStorage.setItem("sesionIniciada", JSON.stringify(false));
    window.location.href = "login.html";

  })





  //imagen de perfil
  let seleccionPerfil = document.getElementById("inputPerfil");
  let imagen = document.getElementById("imagenPerfil");
  let imagenDefault = 'https://thumbs.dreamstime.com/z/imagen-de-usuario-vectorial-icono-perfil-avatar-predeterminada-predeterminado-179582665.jpg'
  seleccionPerfil.addEventListener('change', e => {
    if (e.target.files[0]) {
      const reader = new FileReader()
      reader.onload = function(e) {
      imagen.src = e.target.result
      }
      reader.readAsDataURL(e.target.files[0])
    }
    else {
      imagen.src = imagenDefault;
    }

  })

  //mail precargado
  document.getElementById('mailPerfil').value = usuarioguardado

  let botonProfile = document.getElementById("cambiosProfile")
  botonProfile.addEventListener("click", function () {



    localStorage.setItem("primerNombre", document.getElementById("primerNombre").value);
    localStorage.setItem("segundoNombre", document.getElementById("segundoNombre").value);
    localStorage.setItem("primerApellido", document.getElementById("primerApellido").value);
    localStorage.setItem("segundoApellido", document.getElementById("segundoApellido").value);
    localStorage.setItem("contacto", document.getElementById("telefonoContacto").value);
    localStorage.setItem("imgPerfil", document.getElementById("imagenPerfil").src);
    console.log(document.getElementById("fotoDePerfil").src)






  });

  primerNombre = localStorage.getItem("primerNombre");
  segundoNombre = localStorage.getItem("segundoNombre");
  primerApellido = localStorage.getItem("primerApellido");
  segundoApellido = localStorage.getItem("segundoApellido");
  contacto = localStorage.getItem("contacto");
  imagenElegida= localStorage.getItem("imgPerfil");
  document.getElementById("primerNombre").value = primerNombre
  document.getElementById("segundoNombre").value = segundoNombre
  document.getElementById("primerApellido").value = primerApellido
  document.getElementById("segundoApellido").value = segundoApellido
  document.getElementById("telefonoContacto").value = contacto
  imagen.src = imagenElegida



  
  
  
  

});