
// ---------------------------- PARTE DESAFIO --------------------------------------------

// Consulto si el LocalStoraje esta disponible en el navegador
// if (typeof (Storage) !== "undefined") {
//     console.log("Storage disponible");
// } else {
//     console.log("Storage no disponible");
// }


// verifico que no halla una sesion guardada en el Local Storage para no reescribirla al reiniciar la pagina
if (!JSON.parse(localStorage.getItem("sesionIniciada"))) {
    
    // Creo una constante con un objeto para guardar el valor de la sesion.login en booleano
    const sesion = { login: false };

    // guardo el valor de la sesion en el Local Storage convirtiendolo en texto antes
    localStorage.setItem("sesionIniciada", JSON.stringify(sesion));
}



// recupero la informacion del Local Storage convirtiendolo en un objeto
let sesionGuardada = JSON.parse(localStorage.getItem("sesionIniciada"));

//verifico el estado de la sesion
if (sesionGuardada.login === true) {
    console.log("sesion iniciada");
} else {
    console.log("necesitas iniciar sesion");
}

//Extraigo dos botones del DOM para recrear los botones de "Iniciar sesion" y "Cerrar sesion"
const botonSalir = document.getElementById("botonSalir");
const botonEntrar = document.getElementById("botonEntrar");

//agrego escuchadores de eventos evitando que recargue la pagina, cambiando el valor de sesion.login, guardando los cambios en Local Storage, y redirecciono la pagina
botonEntrar.addEventListener("click", function (event) {
    event.preventDefault();
    sesionGuardada.login = true;
    // actualizo el valor de la sesion en el Local Storage convirtiendolo en texto antes
    localStorage.setItem("sesionIniciada", JSON.stringify(sesionGuardada));
    window.location.href = "index.html"
});

botonSalir.addEventListener("click", function (event) {
    event.preventDefault();
    sesionGuardada.login = false;
    localStorage.setItem("sesionIniciada", JSON.stringify(sesionGuardada));
    window.location.href = "index.html"
});



//console.log(sesionGuardada.login);


// ---------------------------------------------------------------------------------------------------------------------------------------------