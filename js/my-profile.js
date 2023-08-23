<<<<<<< Updated upstream
/* Obtengo el nombre de usuario con en el login.html*/
const inputElement=document.querySelector(input-bx);

/*Creo otra constante para llamar al nombre*/
const nombre=inputElement.value;
/* Guardo en el localStorage*/
localStorage.setItem(usuario, nombre);
=======
usuarioguardado = localStorage.getItem("nombredeusuario");
document.getElementById("nombreusuario").innerHTML = usuarioguardado;
>>>>>>> Stashed changes
