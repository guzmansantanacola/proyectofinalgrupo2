
// capturamos el boton y agregamos el escuchador de eventos cambiando el valor a true y redireccionando

// document
//   .getElementById("formlogin")
//   .addEventListener("submit", function () {
//     event.preventDefault();
//     localStorage.setItem("sesionIniciada", "true");
//     localStorage.setItem("exampleExist", true);
//     localStorage.setItem("nombredeusuario", document.getElementById("guardarusuario").value);
//     window.location.href = "index.html";
//   }); 


// document
// .getElementById("googleImg")
// .addEventListener("click", function () {
//   localStorage.setItem("sesionIniciada", "true");
//   window.location.href = "index.html";
// });

/* VALIDACIÓN DEL LOGIN */

function validationLogin() {
  let formLogin = document.getElementById('formlogin');
  let warningEmail = document.getElementById('warningEmail');
  let warningPassword = document.getElementById('warningPassword');
  formLogin.addEventListener("submit", async (event) => {
    event.preventDefault();
    if (!formLogin.checkValidity()) {
      event.stopPropagation();
      console.log('invalidado');
      warningEmail.classList.remove('d-none');
      warningPassword.classList.remove('d-none');
    } else {
      localStorage.setItem("sesionIniciada", "true");
      localStorage.setItem("exampleExist", true);
      localStorage.setItem("nombredeusuario", document.getElementById("guardarusuario").value);
      
      await getToken()
      

      window.location.href = "index.html";
    }
    formLogin.classList.add('was-validated')
  });
}

validationLogin();


async function getToken() {
  let username = document.getElementById("guardarusuario").value;
  let password = document.getElementById("password").value;
  data = {username, password};
  try {
    const response = await fetch('http://localhost:3000/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      const data = await response.json();
      localStorage.setItem('token', data.token);
      console.log('Inicio de sesión exitoso. Token guardado en localStorage.');
    } else {
      console.error('Error en el inicio de sesión:', response.statusText);
    }
  } catch (error) {
    console.error('Error en la solicitud:', error);
  }
}





