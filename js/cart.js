
// Traer y maquetar el producto del servidor
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
    htmlContentToAppend += `
  
    <div id="${data.articles[0].id}">
    <tr>
    <td><img class="imagencarrito"src="${data.articles[0].image}" style="width: 140px;"></td>
    <td><p> ${data.articles[0].name} </p></td>
    <td><p> ${data.articles[0].currency} ${data.articles[0].unitCost}</p></td>
    <td><input id="inputExample" min="1" type="number" value="1" class="cantidad"></td>
    <td><p id="subtotalExample" class="subTotal">Sub-Total: ${data.articles[0].currency} ${data.articles[0].unitCost}</p></td>
      </tr>
    <div> 
        `;
    tabla.innerHTML = htmlContentToAppend;
    subTotal(data);
}

// maquetar lo que esta en el LocalStorage

let itemsLocalStorage = JSON.parse(localStorage.getItem("cartlist")) || [];
let tabla = document.getElementById("carrito");

itemsLocalStorage.forEach((i, index) => {
  fetch(`https://japceibal.github.io/emercado-api/products/${i.id}.json`)
    .then((response) => response.json())
    .then((data) => {
      // se crea la estructura de la tabla en la constante productoHTML y se actualiza cuando otro producto se añade
      const productoHTML = document.createElement("tr");
      productoHTML.id = data.id;
      const htmlContentToAppend = `
        <tr>
          <td><img class="imagencarrito" src="${data.images[0]}" style="width: 140px;"></td>
          <td><p>${data.name}</p></td>
          <td><p class="precioProducto">${data.currency} ${data.cost}</p></td>
          <td><input min="1" type="number" value="${i.mount}" class="cantidad"></td>
          <td><p class="subTotal">Sub-Total: ${data.currency} <span class="subtotal-valor">${data.cost * i.mount}</span></p></td>
        </tr>`

      productoHTML.innerHTML = htmlContentToAppend;
      tabla.appendChild(productoHTML);

      const cantidadInput = productoHTML.querySelector(".cantidad");
      const subTotalElement = productoHTML.querySelector(".subtotal-valor");

      // calcular el subtotal y cambiarlo en el HTML
      cantidadInput.addEventListener("input", () => {
        const cantidad = cantidadInput.value;
        const costo = data.cost;
        const subTotalValor = cantidad * costo;
        subTotalElement.textContent = subTotalValor;

       // sobreescribimos la cantidad en el LocalStorage
        itemsLocalStorage[index].mount = Number(cantidad);
        localStorage.setItem("cartlist", JSON.stringify(itemsLocalStorage));
      });
    });
});


// función para calcular el subtotal en el carrito traido del servidor
function subTotal(data) {
  let inputPrueba = document.getElementById("inputExample");
  let partedelsubtotal = document.getElementById('subtotalExample');
  inputPrueba.addEventListener("input", () => {
    let valornuevo = inputPrueba.value;
    partedelsubtotal.innerHTML = `<p id="subtotal" class="cantidad">Sub-Total: ${data.articles[0].currency} ${data.articles[0].unitCost * valornuevo}</p>`;
  });
}
