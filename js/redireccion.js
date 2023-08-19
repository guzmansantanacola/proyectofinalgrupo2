
// obtenemos el valor en Local Storage
const sesionIniciada = JSON.parse(localStorage.getItem("sesionIniciada"));

// verificar el valor
if (!sesionIniciada) {
    //si no lo encuentra lo cree y lo guarda
  
  // Redireccionar a la página de inicio de sesión
  window.location.href = "login.html";

}