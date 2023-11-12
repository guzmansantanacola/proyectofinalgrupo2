
document.addEventListener("DOMContentLoaded", function () {

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
      localStorage.setItem("nombredeusuario", document.getElementById('mailPerfil').value);
      localStorage.setItem("imgPerfil", document.getElementById("imagenPerfil").src);
      //imagenPerfil.src = imagenElegida;
      
    }
    formUser.classList.add('was-validated');
  });
}

validationUser();