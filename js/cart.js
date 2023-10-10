

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
    <tr>
    <td><img class="imagencarrito"src="${data.articles[i].image}" style="width: 140px;"></td>
    <td><p> ${data.articles[i].name} </p></td>
    <td><p> ${data.articles[i].currency} ${data.articles[i].unitCost}</p></td>
    <td><input type="number" id="cantidad" value="1" class="cantidad"></td>
    <td><p id="subtotal">Sub-Total: ${data.articles[i].currency} ${data.articles[i].unitCost}</p></td>
      </tr>
    <div> 
 
        `;
        tabla.innerHTML = htmlContentToAppend;

    }
    subTotal(data)
    
}

// maquetar lo que esta en el LocalStorage

let itemsLocalStorage = JSON.parse(localStorage.getItem("cartlist")) || [];

itemsLocalStorage.map(i => {
    //itemsId.push(i.id)
    fetch(`https://japceibal.github.io/emercado-api/products/${i.id}.json`)
        .then((response) => response.json())
        .then((data) => {
            let tabla = document.getElementById('carrito');
            let htmlContentToAppend = "";
           
            htmlContentToAppend += `
          
            <div id="${data.id}">
            <tr>
            <td><img class="imagencarrito"src="${data.images[0]}" style="width: 140px;"></td>
            <td><p> ${data.name} </p></td>
            <td><p> ${data.currency} ${data.cost}</p></td>
            <td><input type="number"  value="${i.mount}" class="cantidad"></td>
            <td><p id="subtotal">Sub-Total: ${data.currency} ${data.cost * i.mount}</p></td>
              </tr>
            <div> 
         
                `;
                tabla.innerHTML += htmlContentToAppend;
        
            
        });
});




    
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
            document.getElementById('subtotal').innerHTML += `
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


