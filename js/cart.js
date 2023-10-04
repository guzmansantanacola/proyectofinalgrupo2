
const url = `https://japceibal.github.io/emercado-api/user_cart/25801.json`;

fetch(url)
    .then((response) => response.json())
    .then((data) => cartArticulos(data));


function cartArticulos(data) {
    let tabla = document.getElementById('carrito');
    
    console.log(data.articles);
    console.log(tabla);
    //let articulos = []


    let htmlContentToAppend = "";
    // data.articles.forEach(element => {
        for (let i=0 ; i < data.articles.length ; i++){

        
        htmlContentToAppend += `
  
    <div id="${data.articles[i].id}">
      <img src="${data.articles[i].image}">
      <p>Costo: ${data.articles[i].currency} ${data.articles[i].unitCost}</p>
      <input type="number" id="cantidad" value="1" class="cantidad">
      <p>Sub-Total: ${data.articles[i].currency} ${data.articles[i].unitCost}</p>
    <div> 
 
        `;
        tabla.innerHTML = htmlContentToAppend;
        //let inputCantidad = document.getElementById("cantidad");
    
        

        
        
        // inputCantidad.addEventListener('input', () => {

            
        //     let cantidad = inputCantidad.value;

        //     art.innerHTML += `
        //     <p>Sub-Total: ${data.articles[i].currency} ${data.articles[i].unitCost * cantidad}</p>
        //     `
        // })
        
    }
    subTotal(data)
    
}

    
// Funcion de abajo es para la parte 3, pero queda hacerla funcionar

function subTotal(data) {
    let cualquierInput = document.getElementsByClassName('cantidad');
    console.log(cualquierInput);
    let inputCantidad = document.getElementById("cantidad");
    console.log(inputCantidad.parentElement.id);
    let prevCantidad = document.getElementById("cantidad").value;
    inputCantidad.addEventListener('change', () => {
           
        let cantidad = inputCantidad.value;
        if(cantidad > prevCantidad){
            art.innerHTML += `
            <p>Sub-Total: ${data.articles[i].currency} ${data.articles[i].unitCost * cantidad}</p>
            `
        }
        console.log(cantidad);
        console.log(document.getElementById('50924'));

        // art.innerHTML += `
        // <p>Sub-Total: ${data.articles[i].currency} ${data.articles[i].unitCost * cantidad}</p>
        // `
    })
}


