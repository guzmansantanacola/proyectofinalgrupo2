// obtenemos el valor en Local Storage
const sesionIniciada = localStorage.getItem("sesionIniciada");

// verificar el valor
if (!sesionIniciada) {
    //si no lo encuentra lo creea y lo guarda
  if (!JSON.parse(localStorage.getItem("sesionIniciada"))) {
    // guardo el valor de la sesion en el Local Storage convirtiendolo en texto antes
    localStorage.setItem("sesionIniciada", JSON.stringify(false));
  }
  // Redireccionar a la página de inicio de sesión
  window.location.href = "login.html";

}