const url = `https://japceibal.github.io/emercado-api/user_cart/25801.json`;

fetch(url)
  .then((response) => response.json())
  .then((data) => cartArticulos(data));

function cartArticulos(data) {
  let tabla = document.getElementById("carrito");

  console.log(data.articles);
  //console.log(tabla);
  //let articulos = []

  let htmlContentToAppend = "";
  // data.articles.forEach(element => {
  for (let i = 0; i < data.articles.length; i++) {
    htmlContentToAppend += `
  
    <div id="${data.articles[i].id}">
    <tr>
    <td><img class="imagencarrito"src="${data.articles[i].image}" style="width: 140px;"></td>
    <td><p> ${data.articles[i].name} </p></td>
    <td><p> ${data.articles[i].currency} ${data.articles[i].unitCost}</p></td>
    <td><input type="number"  value="1" class="cantidad"></td>
    <td><p id="subtotal" class="subTotal">Sub-Total: ${data.articles[i].currency} ${data.articles[i].unitCost}</p></td>
      </tr>
    <div> 
 
        `;
    tabla.innerHTML = htmlContentToAppend;

    // let inputPruebaExample = document.getElementById('50924input');
    // let partedelsubtotalExample = document.getElementsByClassName('cantidad');
    // console.log(partedelsubtotalExample[0]);
    // console.log(inputPruebaExample.value);
    // inputPruebaExample.addEventListener('input', () => {
    // let valornuevoExample = inputPruebaExample.value;
    // console.log(valornuevoExample);
    // partedelsubtotalExample[1].innerHTML = `<p id="subtotal" class="cantidad">Sub-Total: ${data.articles[0].currency} ${data.articles[0].unitCost * valornuevoExample}</p>`
    // })
  }
  // subTotal(data); // Descomentar

  //probando input para calcular subtotal
}

// maquetar lo que esta en el LocalStorage

let itemsLocalStorage = JSON.parse(localStorage.getItem("cartlist")) || [];
console.log(itemsLocalStorage)
let tabla = document.getElementById("carrito");
itemsLocalStorage.forEach((i) => {
  fetch(`https://japceibal.github.io/emercado-api/products/${i.id}.json`)
    .then((response) => response.json())
    .then((data) => {
    
      let htmlContentToAppend = "";
      htmlContentToAppend += `
            <div id="${data.id}">
            <tr>
            <td><img class="imagencarrito"src="${
              data.images[0]
            }" style="width: 140px;"></td>
            <td><p> ${data.name} </p></td>
            <td><p> ${data.currency} ${data.cost}</p></td>
            <td><input type="number"  value="${i.mount}" class="cantidad"></td>
            <td><p class="subTotal">Sub-Total: ${data.currency} ${data.cost * i.mount}</p></td>
              </tr>
            <div> `;
      tabla.innerHTML += htmlContentToAppend;
    });
    
});






function subTotal(data) {
  let idInput = data.id + "input";
  let idp = data.id + "subtotal";
  //probando input para calcular subtotal
  let inputPrueba = document.getElementById(idInput);
  //console.log(inputPrueba);
  let partedelsubtotal = document.getElementById(idp);
  //console.log(partedelsubtotal);
  //console.log(inputPrueba.value);
  inputPrueba.addEventListener("input", () => {
    let valornuevo = inputPrueba.value;
    //console.log(valornuevo);
    partedelsubtotal.innerHTML = `<p id="subtotal" class="cantidad">Sub-Total: ${
      data.currency
    } ${data.cost * valornuevo}</p>`;
  });
}

// SI SE EJECUTA LA FUNCION FUERA DEL FETCH, NO ENCUENTRA LOS ELEMENTOS DEL HTML

// console.log(itemsLocalStorage);
// console.log(variable)
// function subTotal(){
//     for(let e of itemsLocalStorage){
//         console.log(e);
//         console.log(e.id)
//         let idInput = e.id + "input";
//         console.log(idInput)
//         let idp = e.id + "subtotal";
//         let inputPrueba = document.getElementById(idInput);
//         console.log(inputPrueba)
//         let partedelsubtotal = document.getElementById(idp);
//         inputPrueba.addEventListener('input', () => {
//             let valornuevo = inputPrueba.value;
//             console.log(valornuevo);
//             partedelsubtotal.innerHTML = `<p id="subtotal" class="cantidad">Sub-Total: ${data.currency} ${data.cost * valornuevo}</p>`
//         });
//     }
// }

// Funcion de abajo es para la parte 3, pero queda hacerla funcionar

// Descomentar lo de abajo

// function subTotal(data) {
//     let cualquierInput = document.getElementsByClassName('cantidad');
//     console.log(cualquierInput);
//     let inputCantidad = document.getElementById("cantidad");
//     console.log(inputCantidad.parentElement.id);
//     let prevCantidad = document.getElementById("cantidad").value;
//     inputCantidad.addEventListener('change', () => {

//         let cantidad = inputCantidad.value;
//         if(cantidad > prevCantidad){
//             document.getElementById('subtotal').innerHTML += `
//             <p>Sub-Total: ${data.articles[i].currency} ${data.articles[i].unitCost * cantidad}</p>
//             `
//         }
//         console.log(cantidad);
//         console.log(document.getElementById('50924'));

//         // art.innerHTML += `
//         // <p>Sub-Total: ${data.articles[i].currency} ${data.articles[i].unitCost * cantidad}</p>
//         // `
//     })
// }
