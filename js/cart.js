
/* ------------   NOTA: los elemento con la palabra EXAMPLE refieren al ARTÍCULO PRECARGADO en el carrito (no agregado por el usuario)   ------------ */


// Traer y maquetar el artículo de ejemplo del servidor
const url = `https://japceibal.github.io/emercado-api/user_cart/25801.json`;


document.addEventListener("DOMContentLoaded", () => {

  if (localStorage.getItem('exampleExist')) { // Comprueba que el artículo de ejemplo no se haya eliminado
    fetch(url)
      .then((response) => response.json())
      .then((data) => showExample(data));

    function showExample(data) { // función para mostrar el artículo de ejemplo en la página

      let tabla = document.getElementById("carrito");

      let productExample = JSON.parse(localStorage.getItem(50924)) || { // Comprueba si se ha modificado la cantidad, sino inserta un costo y cantidad unitarios
        price: data.articles[0].unitCost,
        currency: data.articles[0].currency,
        inputValue: 1
      }

      let htmlContentToAppend = "";
      htmlContentToAppend += `  
    <div id="${data.articles[0].id}">
      <tr clase="productCard" id="productCardExample">
        <td><img class="imagencarrito"src="${data.articles[0].image}" style="width: 140px;"></td>
        <td><p> ${data.articles[0].name} </p></td>
        <td><p> ${data.articles[0].currency} ${data.articles[0].unitCost}</p></td>
        <td><input id="inputExample" min="1" type="number" value="${productExample.cantidad}" class="cantidad"></td>
        <td><p class="subTotal">Sub-Total: ${data.articles[0].currency} <span id="subtotalExample">${productExample.price}</span></p></td>
      </tr>
    <div> 
        `;
      tabla.innerHTML = htmlContentToAppend;

      const exampleInHTML = document.getElementById('productCardExample'); // Recuperamos el artículo de ejemplo del HTML

      const closeButton = document.createElement('button'); // Creamos el botón de eliminar artículo
      closeButton.type = 'button';
      closeButton.className = 'btn-close';
      closeButton.setAttribute('aria-label', 'Close');
      exampleInHTML.appendChild(closeButton);

      closeButton.addEventListener('click', () => { // Elimina el artículo de ejemplo del HTML y del Local Storage
        exampleInHTML.innerHTML = "";
        localStorage.removeItem("exampleExist")
        window.location.reload();
      });

      subTotalExample(data);
    }
  }
  /*   ---------------   Fin del fetch del artículo de ejemplo   ---------------   */


  function subTotalExample(data) { // función para calcular el subtotal del artículo de ejemplo
    let inputExample = document.getElementById("inputExample"); // input de cantidad
    let subTotalExample = document.getElementById('subtotalExample');
    let subTotalAlLocal = { // la variable subTotalAlLocal se usa para guardar individualmente el subtotal y tipo de moneda de cada artículo
      price: data.articles[0].unitCost,
      currency: data.articles[0].currency,
      inputValue: 1
    };

    if (localStorage.getItem(50924) == undefined) { // Si aún no se ha modificado la cantidad se setea al LocalStorage con valores unitarios
      localStorage.setItem(data.articles[0].id, JSON.stringify(subTotalAlLocal))
    }

    inputExample.addEventListener("input", () => {
      let cantidadExample = inputExample.value;
      subTotalExample.innerHTML = `<span id="subtotalExample">${data.articles[0].unitCost * cantidadExample}</span>`;
      let subTotalAlLocal = {
        price: subTotalExample.textContent,
        currency: data.articles[0].currency,
        cantidad: cantidadExample
      }
      localStorage.setItem(data.articles[0].id, JSON.stringify(subTotalAlLocal)); // Al modificarse la cantidad guardamos el valor en el Local Storage

      precioFinal();
    });
  }

  /* ----- COMIENZA FUNCIONALIDAD DE PRODUCTOS AGREGADOS POR EL USUARIO ----- */

  let itemsLocalStorage = JSON.parse(localStorage.getItem("cartlist")) || []; // en carlist están los articulos agregados por el usuario
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
            </tr>
          `
          productoHTML.innerHTML = htmlContentToAppend;
          tabla.appendChild(productoHTML);

          const closeButton = document.createElement('button');
          closeButton.type = 'button';
          closeButton.className = 'btn-close';
          closeButton.setAttribute('aria-label', 'Close');
          productoHTML.cells[4].appendChild(closeButton);
          closeButton.addEventListener('click', () => {
            closeButton.parentElement.parentElement.remove();
            const productId = productoHTML.id;
            const index = itemsLocalStorage.findIndex(item => item.id === productId);
            if (index > -1) {
              itemsLocalStorage.splice(index, 1);
            }
            localStorage.setItem('cartlist', JSON.stringify(itemsLocalStorage));
            window.location.reload()
          })

          const cantidadInput = productoHTML.querySelector(".cantidad");
          const subTotalArticle = productoHTML.querySelector(".subtotal-valor");
          let subTotalAlLocal = {
            price: subTotalArticle.textContent,
            currency: data.currency
          };
          localStorage.setItem(i.id, JSON.stringify(subTotalAlLocal)) // Guarda en localStorage el subtotal por elemento

          cantidadInput.addEventListener("input", () => {
            const cantidad = cantidadInput.value;
            const costo = data.cost;
            const subTotalValor = cantidad * costo;
            subTotalArticle.textContent = subTotalValor;
            let subTotalAlLocal = {
              price: subTotalArticle.textContent,
              currency: data.currency
            };
            localStorage.setItem(i.id, JSON.stringify(subTotalAlLocal)) // Al modificarse la cantidad guardamos el valor en el Local Storage

            // sobreescribimos la cantidad en el LocalStorage (para los productos agregados por el usuario la cantidad se guarda en cartlist)
            itemsLocalStorage[index].mount = Number(cantidad);
            localStorage.setItem("cartlist", JSON.stringify(itemsLocalStorage)); // Sobreescribimos el subtotal cuando cambia la cantidad

            precioFinal()
          });

        });
    });
  }, 800);
  /*   ---------------   Fin del fetch del artículos agregados por el usuario   ---------------   */

  const prodInCart = JSON.parse(localStorage.getItem("cartlist")) || []; // Trae los productos del localStorage (los que están en el carrito)

  let toDolar = 0.025;

  let check1 = document.getElementById('flexRadioDefault1');
  let check2 = document.getElementById('flexRadioDefault2');
  let check3 = document.getElementById('flexRadioDefault3');
  let checks = [check1, check2, check3]; // Checks correspondientes a las opciones de envío

  /* funcion para agregar subtotal, costo de envio y total de todos los productos (tanto los agregados por el usuario como el producto de ejemplo) */
  function precioFinal() {

    let subtotales = 0; // Inicializamos cada vez, cada variable en 0
    let total = 0;
    let costoEnvio = 0;

    for (let i = 0; i < prodInCart.length; i++) { // bucle for para sumar cada subtotal que hay en el Local Storage

      let productSubtotalObject = JSON.parse(localStorage.getItem(prodInCart[i].id));
      let productSubtotal = Number(productSubtotalObject.price); // valor del subtotal individual de cada artículo

      if (productSubtotalObject.currency != "USD") { // si el artículo no está en dolares lo pasa a dolares
        let productSubtotal = Number(productSubtotalObject.price) * toDolar;
        subtotales += productSubtotal;
      } else {
        subtotales += productSubtotal;
      }
    }

    if (localStorage.getItem('exampleExist')) { // suma el subtotal del artículo de ejemplo
      let productExample = JSON.parse(localStorage.getItem(50924));
      let productExampleSubtotal = Number(productExample.price);
      subtotales += productExampleSubtotal;
    }

    for (let check of checks) { // calcula el costo de envío en función de la opción seleccionada por defecto
      if (check.checked) {
        total = subtotales * check.value;
        costoEnvio = (total - subtotales);
      }

      check.addEventListener('click', () => { // registra cambios en las opciones de envío y recalcula costos
        total = subtotales * check.value;
        costoEnvio = (total - subtotales);
        console.log(total)
        document.getElementById("costoEnvio").innerHTML = `<span class="badge  rounded-pill">USD ${costoEnvio.toFixed(2)}</span>`;
        document.getElementById("totalFinal").innerHTML = `<span class="badge rounded-pill">USD ${total.toFixed(2)}</span>`;
      });
    }

    document.getElementById("subTotalFinal").innerHTML = `<span class="badge  rounded-pill">USD ${subtotales.toFixed(2)}</span>`;
    document.getElementById("costoEnvio").innerHTML = `<span class="badge  rounded-pill">USD ${costoEnvio.toFixed(2)}</span>`;
    document.getElementById("totalFinal").innerHTML = `<span class="badge rounded-pill">USD ${total.toFixed(2)}</span>`;
  }

  setTimeout(() => {
    precioFinal();
  }, 1300);

});

/*    --------------------    FIN DEL DOMContentLoaded    --------------------    */



  // función para calcular el subtotal en el carrito traido del servidor
  function subTotal(data) {
    let inputPrueba = document.getElementById("inputExample");
    let partedelsubtotal = document.getElementById('subtotalExample');

    // esto (fijarse si al borrarlo sigue funcionando)
    let subTotalAlLocal = {
      price: data.articles[0].unitCost,
      currency: data.articles[0].currency,
      inputValue: 1
    };
    if(localStorage.getItem(50924) == undefined){
    localStorage.setItem(data.articles[0].id, JSON.stringify(subTotalAlLocal))
    } // hasta acá
    
    inputPrueba.addEventListener("input", () => {
      let valornuevo = inputPrueba.value;
      partedelsubtotal.innerHTML = `<span id = "subtotalExample">${data.articles[0].unitCost * valornuevo}</span>`;
      let subTotalAlLocal = {
        price: partedelsubtotal.textContent,
        currency: data.articles[0].currency,
        inputValue: valornuevo
      };
      localStorage.setItem(data.articles[0].id, JSON.stringify(subTotalAlLocal));
      precioFinal();
    });
  }





let formadepagoboton = document.getElementById('formadepagoboton');
let tarjetaDeCredito = document.getElementById('radio1');
let transferenciaBancaria = document.getElementById('radio2');
let accountinput = document.getElementById('accountinput')
let accountnumber = document.getElementById('accountnumber');
const cardnumber = document.getElementById('cardnumber');
const cardcode = document.getElementById('cardcode');
const cardven = document.getElementById('cardven')
let cardinputs = document.getElementById('cardinputs')

tarjetaDeCredito.addEventListener("change", () => {
  formadepagoboton.innerText = 'Tarjeta de Crédito'
  if (tarjetaDeCredito.checked) {

    accountnumber.disabled = true;
    cardnumber.disabled = false;
    cardcode.disabled = false;
    cardven.disabled = false;
    cardinputs.classList.remove('d-none');
    accountinput.classList.add('d-none')
  }
});

transferenciaBancaria.addEventListener("change", () => {
  formadepagoboton.innerText = 'Transferencia Bancaria'
  if (transferenciaBancaria.checked) {
    accountnumber.disabled = false;
    cardnumber.disabled = true;
    cardcode.disabled = true;
    cardven.disabled = true;
    cardinputs.classList.add('d-none');
    accountinput.classList.remove('d-none');
  }
});


