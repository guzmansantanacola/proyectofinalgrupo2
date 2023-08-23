
// capturamos el boton y agregamos el escuchador de eventos cambiando el valor a true y redireccionando
document
  .getElementById("formlogin")
  .addEventListener("submit", function () {
    localStorage.setItem("sesionIniciada", "true");
<<<<<<< Updated upstream
    window.location.href = "index.html";
  });
=======
    localStorage.setItem("nombredeusuario", document.getElementById("guardarusuario").value);
    window.location.href = "index.html";
    usuarioguardado = localStorage.getItem("nombredeusuario");
    document.getElementById("nombreusuario").innerHTML = usuarioguardado;
  }); 
>>>>>>> Stashed changes

  document
  .getElementById("googleImg")
  .addEventListener("click", function () {
    localStorage.setItem("sesionIniciada", "true");
    window.location.href = "index.html";
  });

  document
  .getElementById("githubImg")
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

  


