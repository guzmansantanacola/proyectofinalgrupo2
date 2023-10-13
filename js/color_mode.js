document.addEventListener("DOMContentLoaded", () => {
  const switchButton = document.getElementById('switch');
  const main = document.getElementById('main');

  function toggleLightMode() {
    
    main.classList.toggle('light');
    switchButton.classList.toggle('active');

    let botonesorden = document.getElementsByClassName('botonesorden');
    for (let i = 0; i < botonesorden.length; i++) {
      botonesorden[i].classList.toggle('light');
    }

    let bodyCart = document.getElementsByClassName('card-body-cart')
    console.log(bodyCart);
    for (let i = 0; i < botonbodyCart; i++) {
      botonbodyCartlassList.toggle('light');
    }

    let busquedaprecio = document.getElementsByClassName('busquedaprecio');
    for (let i = 0; i < busquedaprecio.length; i++) {
      busquedaprecio[i].classList.toggle('light');
    }

    let busqueda = document.getElementsByClassName('busqueda');
    for (let i = 0; i < busqueda.length; i++) {
      busqueda[i].classList.toggle('light');
    }

    //solucion error en consola si no estas en index
    if(window.location.href.includes("index")) {
      let divIndex = document.getElementById('divIndex');
      divIndex.classList.toggle('light');
    }

  }

  function saveMode() {
    // Actualiza el valor en localStorage después de cambiar las clases
    if (switchButton.classList.contains('active')) {
      localStorage.setItem('light-mode', 'true');
    } else {
      localStorage.setItem('light-mode', 'false');
    }

  }

  switchButton.addEventListener('click', toggleLightMode);
  switchButton.addEventListener('click', saveMode);

  // Obtiene el valor de localStorage y configura las clases al cargar la página
  if (localStorage.getItem('light-mode') === 'true') {
    toggleLightMode(); // Llama a la función para establecer la clase 'light'
  }
});