document.addEventListener("DOMContentLoaded", () => {

const switchButton = document.getElementById('switch');
console.log(switchButton);
 
switchButton.addEventListener('click', () => {
    let main = document.getElementById('main');
    main.classList.toggle('light');
    switchButton.classList.toggle('active');
    let botonesorden = document.getElementsByClassName('botonesorden');
    console.log(botonesorden);
    for (let i=0 ; i < botonesorden.length ; i++){
        botonesorden[i].classList.toggle('light');
    }
    console.log(botonesorden);

    let busquedaprecio = document.getElementsByClassName('busquedaprecio');
    for (let i=0 ; i < busquedaprecio.length ; i++){
        busquedaprecio[i].classList.toggle('light');
    }

    let busqueda = document.getElementsByClassName('busqueda');
    for (let i=0 ; i < busqueda.length ; i++){
        busqueda[i].classList.toggle('light');
    }
});

});