
// Traer y maquetar el producto del servidor
const url = `https://japceibal.github.io/emercado-api/user_cart/25801.json`;

document.addEventListener("DOMContentLoaded", () => {

  fetch(url)
    .then((response) => response.json())
    .then((data) => cartArticulos(data));

  function cartArticulos(data) {
    let tabla = document.getElementById("carrito");

    // console.log(data.articles);
    //console.log(tabla);
    //let articulos = []

    let htmlContentToAppend = "";
    htmlContentToAppend += `
  
    <div id="${data.articles[0].id}">
    <tr clase="productCard">
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

  setTimeout(() => {
    itemsLocalStorage.forEach((i, index) => {
      fetch(`https://japceibal.github.io/emercado-api/products/${i.id}.json`)
        .then((response) => response.json())
        .then((data) => {
          // se crea la estructura de la tabla en la constante productoHTML y se actualiza cuando otro producto se añade
          const productoHTML = document.createElement("tr");
          productoHTML.id = data.id;
          const htmlContentToAppend = `
        <tr clase="productCard">
          <td><img class="imagencarrito" src="${data.images[0]}" style="width: 140px;"></td>
          <td class="nombre"><p >${data.name}</p></td>
          <td><p class="precioProducto">${data.currency} ${data.cost}</p></td>
          <td><input min="1" type="number" value="${i.mount}" class="cantidad"></td>
          <td><p class="subTotal">Sub-Total: ${data.currency} <span class="subtotal-valor">${data.cost * i.mount}</span></p></td>
        </tr>`

          productoHTML.innerHTML = htmlContentToAppend;
          tabla.appendChild(productoHTML);
          let closeButton = document.createElement('button');
          closeButton.type = 'button';
          closeButton.className = 'btn-close';
          closeButton.setAttribute('aria-label', 'Close');
          productoHTML.cells[4].appendChild(closeButton);
          closeButton.addEventListener('click', () => {
            closeButton.parentElement.parentElement.remove();
            const productId = productoHTML.id;
            const index = itemsLocalStorage.findIndex(item => item.id === productId);
            if(index > -1) {
              itemsLocalStorage.splice(index, 1); 
            }
            localStorage.setItem('cartlist', JSON.stringify(itemsLocalStorage));
            //precioFinal();
          })
        
          const cantidadInput = productoHTML.querySelector(".cantidad");
          console.log(cantidadInput)  
          const subTotalElement = productoHTML.querySelector(".subtotal-valor");
          let subTotalAlLocal = {
            price: subTotalElement.textContent,
            currency: data.currency
          };
          localStorage.setItem(i.id, JSON.stringify(subTotalAlLocal)) // Guarda en localStorage el subtotal por elemento

          // calcular el subtotal y cambiarlo en el HTML
          cantidadInput.addEventListener("input", () => {
            subtotales = 0;
            const cantidad = cantidadInput.value;
            const costo = data.cost;
            const subTotalValor = cantidad * costo;
            subTotalElement.textContent = subTotalValor;
            let subTotalAlLocal = {
              price: subTotalElement.textContent,
              currency: data.currency
            };
            localStorage.setItem(i.id, JSON.stringify(subTotalAlLocal))
            // sobreescribimos la cantidad en el LocalStorage
            itemsLocalStorage[index].mount = Number(cantidad);
            localStorage.setItem("cartlist", JSON.stringify(itemsLocalStorage)); // Sobreescribimos el subtotal cuando cambia la cantidad

            precioFinal()

          });

        });
    });
  }, 800);

  const prodInCart = JSON.parse(localStorage.getItem("cartlist")) || []; // Trae los productos del localStorage (los que están en el carrito)

  let toDolar = 0.025;

  // funcion para agregar subtotal, costo de envio y total de todos los productos
  let check1 = document.getElementById('flexRadioDefault1');
  let check2 = document.getElementById('flexRadioDefault2');
  let check3 = document.getElementById('flexRadioDefault3');
  let checks = [check1, check2, check3];
  console.log(checks);
  let subtotales = 0;
  let total = 0;
  let costoEnvio = 0;
  function precioFinal() {
    for (let i = 0; i < prodInCart.length; i++) {
      let productSubtotalArray = JSON.parse(localStorage.getItem(prodInCart[i].id))
      let productSubtotal = Number(productSubtotalArray.price);
      if (productSubtotalArray.currency != "USD") {
        let productSubtotal = Number(productSubtotalArray.price) * toDolar;
        subtotales += productSubtotal;
      } else {
        subtotales += productSubtotal;
      }
    }
    for (let check of checks) {
      if (check.checked) {
        total = subtotales * check.value;
        costoEnvio = (total - subtotales);
      }
      check.addEventListener('click', () => {
        total = subtotales * check.value;
        costoEnvio = (total - subtotales);
        console.log(total)
        document.getElementById("costoEnvio").innerHTML = costoEnvio.toFixed(2);
        document.getElementById("totalFinal").innerHTML = total.toFixed(2);
      })
    }
    console.log(total)
    console.log(subtotales);

    document.getElementById("subTotalFinal").innerHTML = subtotales.toFixed(2);
    document.getElementById("costoEnvio").innerHTML = costoEnvio.toFixed(2)
    document.getElementById("totalFinal").innerHTML = total.toFixed(2);
  }

  setTimeout(() => {
    precioFinal();
  }, 1300);




  // función para calcular el subtotal en el carrito traido del servidor
  function subTotal(data) {
    let inputPrueba = document.getElementById("inputExample");
    let partedelsubtotal = document.getElementById('subtotalExample');
    inputPrueba.addEventListener("input", () => {
      let valornuevo = inputPrueba.value;
      partedelsubtotal.innerHTML = `<p id="subtotal" class="cantidad">Sub-Total: ${data.articles[0].currency} ${data.articles[0].unitCost * valornuevo}</p>`;
    });
  }



});



let tarjetaDeCredito = document.getElementById('radio1');
let transferenciaBancaria = document.getElementById('radio2');
let accountinput= document.getElementById('accountinput')
let accountnumber = document.getElementById('accountnumber');
const cardnumber = document.getElementById('cardnumber');
const cardcode = document.getElementById('cardcode');
const cardven = document.getElementById('cardven')
let cardinputs = document.getElementById('cardinputs')



tarjetaDeCredito.addEventListener("change", ()=> {
  if(tarjetaDeCredito.checked){
   accountnumber.disabled = true;
   cardnumber.disabled = false;
   cardcode.disabled = false;
   cardven.disabled = false;
    cardinputs.classList.remove('d-none');
    accountinput.classList.add('d-none')
  }
 })

transferenciaBancaria.addEventListener("change", ()=> {
  if(transferenciaBancaria.checked){
    accountnumber.disabled = false;
    cardnumber.disabled = true;
    cardcode.disabled = true;
    cardven.disabled = true;
    cardinputs.classList.add('d-none');
    accountinput.classList.remove('d-none');
  }
})


