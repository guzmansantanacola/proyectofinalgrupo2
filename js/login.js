

// capturamos el boton y agregamos el escuchador de eventos cambiando el valor a true y redireccionando
document
  .getElementById("formlogin")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    localStorage.setItem("sesionIniciada", "true");
    window.location.href = "index.html";
  });


