
// usuarioguardado = localStorage.getItem("nombredeusuario");
// document.getElementById("nombreusuario").textContent = usuarioguardado;

//let seleccionPerfil = document.getElementById("inputPerfil");
//let imagen = document.getElementById("imagenPerfil");
//let imagenDefault = "https://thumbs.dreamstime.com/z/imagen-de-usuario-vectorial-icono-perfil-avatar-predeterminada-predeterminado-179582665.jpg?w=768"

//  <li><button id="modoDia">Modo Día</button> </li>
//  <li><button id="modoNoche">Modo Noche</button>  </li>




document.addEventListener("DOMContentLoaded", function () {


 

  // /*Desplegable*/
  // let nombreUsuarioButton = document.getElementById("nombreusuario");

  // let menuDesplegable = document.createElement("ul");

  // menuDesplegable.id = "menu-desplegable";

  // let menu = localStorage.getItem("menuVisible") === "true";

  // menuDesplegable.innerHTML = `<div id="gene">
  //       <li ><a href="cart.html">Mi Carrito</a></li>
  //       <li ><a href="my-profile.html">Mi Perfil</a></li>
  //       <li >
  //       <button id="cerrarSesion"> Cerrar Sesión </button>
  //         </li>
  //        <div class="modos">
  //        <button class="darkModeSwitch" id="switch">
  //        <span class="material-symbols-outlined">
  //        light_mode
  //        </span>
  //        <span class="material-symbols-outlined">
  //         dark_mode
  //        </span>
  //         </div> 
  //         </div> 
  //   `;

  // menuDesplegable.style.display = "none";
  // nombreUsuarioButton.addEventListener("click", function () {

  //   const rect = nombreUsuarioButton.getBoundingClientRect();
  //   const top = rect.bottom;
  //   const left = rect.left;


  //   menuDesplegable.style.position = "fixed";
  //   menuDesplegable.style.top = `${top}px`;
  //   menuDesplegable.style.left = `${left}px`;



  //   /*OCULTAR O MOSTRAR MENU*/


  //   if (menuDesplegable.style.display === "none") {
  //     menuDesplegable.style.display = "block";
  //     localStorage.setItem("menuVisible", "true")
  //   } else {
  //     menuDesplegable.style.display = "none";
  //     localStorage.setItem("menuVisible", "false");
  //   }








  // });
  // document.body.appendChild(menuDesplegable);

  /*MODOS*/




  //Boton cerrar Sesion
  // let botonCerrarSesion = document.getElementById('cerrarSesion');

  // //creo array con los datos a borrar en el local storage para iterarlos
  // let datos = ['primerNombre', 'segundoNombre', 'primerApellido', 'segundoApellido', 'contacto', 'imgPerfil']

  // botonCerrarSesion.addEventListener("click", () => {
  //   datos.map(i => {
  //     localStorage.removeItem(i);
  //   });
  //   localStorage.setItem("sesionIniciada", JSON.stringify(false));
  //   window.location.href = "login.html";

  // })





  //imagen de perfil
  let seleccionPerfil = document.getElementById("inputPerfil");
  let imagenPerfil = document.getElementById("imagenPerfil");

  if (localStorage.getItem("imgPerfil") != null) {
    imagenElegida = localStorage.getItem("imgPerfil");
    imagenPerfil.src = imagenElegida
  }

  let imagenDefault = "img/usuario.png"
  seleccionPerfil.addEventListener('change', e => {
    if (e.target.files[0]) {
      const reader = new FileReader()
      reader.onload = function (e) {
        imagenPerfil.src = e.target.result
      }
      reader.readAsDataURL(e.target.files[0])
    }
    else {
      imagenPerfil.src = imagenDefault;
    }

  })

  //mail precargado
  document.getElementById('mailPerfil').value = usuarioguardado;

  // let botonProfile = document.getElementById("cambiosProfile")
  // botonProfile.addEventListener("click", function () {
  //   localStorage.setItem("primerNombre", document.getElementById("primerNombre").value);
  //   localStorage.setItem("segundoNombre", document.getElementById("segundoNombre").value);
  //   localStorage.setItem("primerApellido", document.getElementById("primerApellido").value);
  //   localStorage.setItem("segundoApellido", document.getElementById("segundoApellido").value);
  //   localStorage.setItem("contacto", document.getElementById("telefonoContacto").value);
  //   localStorage.setItem("imgPerfil", document.getElementById("imagenPerfil").src);
  // });

  primerNombre = localStorage.getItem("primerNombre");
  segundoNombre = localStorage.getItem("segundoNombre");
  primerApellido = localStorage.getItem("primerApellido");
  segundoApellido = localStorage.getItem("segundoApellido");
  contacto = localStorage.getItem("contacto");
  //imagenElegida = localStorage.getItem("imgPerfil");
  document.getElementById("primerNombre").value = primerNombre
  document.getElementById("segundoNombre").value = segundoNombre
  document.getElementById("primerApellido").value = primerApellido
  document.getElementById("segundoApellido").value = segundoApellido
  document.getElementById("telefonoContacto").value = contacto
  //imagenPerfil.src = imagenElegida;

 

});



// document.getElementById('cambiosProfile').addEventListener('click', function () {
//   let apellido = document.getElementById("primerApellido").value;
//   let nombre = document.getElementById("primerNombre").value;
//   let email = document.getElementById("mailPerfil").value;

//   if (apellido === "ok" && nombre === "ok" && email ==="ok") {
//     document.getElementById('modalerror').textContent = "Datos guardados con éxito";
//     document.getElementById('modalerror').style.color = "green";
//   } else {
//     document.getElementById('modalerror').textContent = "Debes ingresar los campos requeridos";
//     document.getElementById('modalerror').style.color = "red";
//   }
// });

// VALIDACION DE FORMULARIO DE USUARIO

function validationUser() {
  let formUser = document.getElementById('form-user');

  formUser.addEventListener('submit', (event) => {
    event.preventDefault();
    if (!formUser.checkValidity()) {
      event.stopPropagation();
      console.log('invalidado');
    } else {
      console.log('validado');
      localStorage.setItem("primerNombre", document.getElementById("primerNombre").value);
      localStorage.setItem("segundoNombre", document.getElementById("segundoNombre").value);
      localStorage.setItem("primerApellido", document.getElementById("primerApellido").value);
      localStorage.setItem("segundoApellido", document.getElementById("segundoApellido").value);
      localStorage.setItem("contacto", document.getElementById("telefonoContacto").value);
      localStorage.setItem("imgPerfil", document.getElementById("imagenPerfil").src);
      //imagenPerfil.src = imagenElegida;
      savedSuccessfully()
      cerraralerta()
    }
    formUser.classList.add('was-validated');
  });
}

validationUser();

//Funciones de la alerta al guardar cambios exitosamente

let alertSuccess = document.getElementById('alertSavedSuccessfully')
let closeAlert = document.getElementById('closeAlert')
function savedSuccessfully() {
  alertSuccess.classList.remove('d-none');
  alertSuccess.classList.add('fade-in');
 
}
function cerraralerta() {
  setTimeout(function () {
    alertSuccess.classList.add('d-none');
}, 3000); 

  closeAlert.addEventListener('click', () => {
    alertSuccess.classList.add('d-none');
  })
}

