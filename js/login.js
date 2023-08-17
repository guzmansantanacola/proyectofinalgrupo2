
// capturamos el boton y agregamos el escuchador de eventos cambiando el valor a true y redireccionando
document
  .getElementById("formlogin")
  .addEventListener("submit", function () {
    localStorage.setItem("sesionIniciada", "true");
    window.location.href = "index.html";
  });

  document
  .getElementById("googleImg")
  .addEventListener("click", function () {
    localStorage.setItem("sesionIniciada", "true");
    window.location.href = "index.html";
  });

  document
  .getElementById("instagramImg")
  .addEventListener("click", function () {
    localStorage.setItem("sesionIniciada", "true");
    window.location.href = "index.html";
  });

  document
  .getElementById("facebookImg")
  .addEventListener("click", function () {
    localStorage.setItem("sesionIniciada", "true");
    window.location.href = "index.html";
  });

  


