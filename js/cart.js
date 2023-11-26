
/* ------------   NOTA: los elemento con la palabra EXAMPLE refieren al ARTÍCULO PRECARGADO en el carrito (no agregado por el usuario)   ------------ */


// Traer y maquetar el artículo de ejemplo del servidor
const url = `https://japceibal.github.io/emercado-api/user_cart/25801.json`;


document.addEventListener("DOMContentLoaded", () => {

  if (localStorage.getItem('exampleExist')) {
    fetch('https://japceibal.github.io/emercado-api/user_cart/25801.json')
      .then((response) => response.json())
      .then((data) => showExample(data));

    function showExample(data) {
      let tabla = document.getElementById("carrito");

      let productExample = JSON.parse(localStorage.getItem(50924)) || {
        price: data.articles[0].unitCost,
        currency: data.articles[0].currency,
        cantidad: 1
      };

      let htmlContentToAppend = "";
      htmlContentToAppend += `  
    <div id="${data.articles[0].id}">
      <tr clase="productCard" id="productCardExample_${data.articles[0].id}">
        <td><img class="imagencarrito"src="${data.articles[0].image}" style="width: 140px;"></td>
        <td><p> ${data.articles[0].name} </p></td>
        <td><p> ${data.articles[0].currency} ${data.articles[0].unitCost}</p></td>
        <td><input id="inputExample" min="1" type="number" value="${productExample.cantidad}" class="cantidad w-75"></td>
        <td><p class="subTotal">Sub-Total: ${data.articles[0].currency} <span id="subtotalExample">${productExample.price}</span></p></td>
        <td><button type="button" class="btn-close btn-close-example btn-close-white" aria-label="Close"></button></td>
      </tr>
    </div>`;

      tabla.innerHTML = htmlContentToAppend;

      const exampleInHTML = document.getElementById(`productCardExample_${data.articles[0].id}`);

      const closeButton = exampleInHTML.getElementsByClassName('btn-close-example');
      closeButton[0].addEventListener('click', () => {
        exampleInHTML.innerHTML = "";
        localStorage.removeItem("exampleExist");
        window.location.reload();
      });
      subTotalExample(data);
    }
  }

  let itemsLocalStorage = JSON.parse(localStorage.getItem("cartlist")) || [];
  let tabla = document.getElementById("carrito");

  setTimeout(() => {
    itemsLocalStorage.forEach((i, index) => {
      fetch(`http://localhost:3000/products/${i.id}.json`)
        .then((response) => response.json())
        .then((data) => {
          const productoHTML = document.createElement("tr");
          productoHTML.id = `product_${data.id}`;
          const htmlContentToAppend = `
            <tr clase="productCard">
              <td><img class="imagencarrito" src="${data.images[0]}" style="width: 140px;"></td>
              <td class="nombre"><p >${data.name}</p></td>
              <td><p class="precioProducto">${data.currency} ${data.cost}</p></td>
              <td><input min="1" type="number" value="${i.mount}" class="cantidad w-75"></td>
              <td><p class="subTotal">Sub-Total: ${data.currency} <span class="subtotal-valor">${data.cost * i.mount}</span></p></td>
              <td><button type="button" class="btn-close btn-close-fetch btn-close-white" aria-label="Close"></button></td>
            </tr>`;
          productoHTML.innerHTML = htmlContentToAppend;
          tabla.appendChild(productoHTML);

          const closeButton = productoHTML.getElementsByClassName('btn-close-fetch');
          closeButton[0].addEventListener('click', () => {
            const productId = productoHTML.id.split('_')[1];
            const index = itemsLocalStorage.findIndex(item => item.id === productId);
            if (index > -1) {
              itemsLocalStorage.splice(index, 1);
            }
            localStorage.setItem('cartlist', JSON.stringify(itemsLocalStorage));
            window.location.reload();
          });

          const cantidadInput = productoHTML.querySelector(".cantidad");
          const subTotalArticle = productoHTML.querySelector(".subtotal-valor");
          let subTotalAlLocal = {
            price: subTotalArticle.textContent,
            currency: data.currency
          };
          localStorage.setItem(i.id, JSON.stringify(subTotalAlLocal));

          cantidadInput.addEventListener("input", () => {
            const cantidad = cantidadInput.value;
            const costo = data.cost;
            const subTotalValor = cantidad * costo;
            subTotalArticle.textContent = subTotalValor;
            let subTotalAlLocal = {
              price: subTotalArticle.textContent,
              currency: data.currency
            };
            localStorage.setItem(i.id, JSON.stringify(subTotalAlLocal));
            itemsLocalStorage[index].mount = Number(cantidad);
            localStorage.setItem("cartlist", JSON.stringify(itemsLocalStorage));
            precioFinal();
          });

        });
    });
  }, 800);

  const prodInCart = JSON.parse(localStorage.getItem("cartlist")) || [];
  let toDolar = 0.025;
  let check1 = document.getElementById('flexRadioDefault1');
  let check2 = document.getElementById('flexRadioDefault2');
  let check3 = document.getElementById('flexRadioDefault3');
  let checks = [check1, check2, check3];

  function precioFinal() {
    let subtotales = 0;
    let total = 0;
    let costoEnvio = 0;

    for (let i = 0; i < prodInCart.length; i++) {
      let productSubtotalObject = JSON.parse(localStorage.getItem(prodInCart[i].id));
      let productSubtotal = Number(productSubtotalObject.price);

      if (productSubtotalObject.currency != "USD") {
        productSubtotal = Number(productSubtotalObject.price) * toDolar;
        subtotales += productSubtotal;
      } else {
        subtotales += productSubtotal;
      }
    }

    if (localStorage.getItem('exampleExist')) {
      let productExample = JSON.parse(localStorage.getItem(50924));
      let productExampleSubtotal = Number(productExample.price);
      subtotales += productExampleSubtotal;
    }

    for (let check of checks) {
      if (check.checked) {
        total = subtotales * check.value;
        costoEnvio = (total - subtotales);
      }

      check.addEventListener('click', () => {
        total = subtotales * check.value;
        costoEnvio = (total - subtotales);
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

  let formadepagoboton = document.getElementById('formadepagoboton');
  let tarjetaDeCredito = document.getElementById('radio1');
  let transferenciaBancaria = document.getElementById('radio2');
  let accountinput = document.getElementById('accountinput');
  let accountnumber = document.getElementById('accountnumber');
  const cardnumber = document.getElementById('cardnumber');
  const cardcode = document.getElementById('cardcode');
  const cardven = document.getElementById('cardven');
  let cardinputs = document.getElementById('cardinputs');

  tarjetaDeCredito.addEventListener("change", () => {
    formadepagoboton.innerText = 'Tarjeta de Crédito'
    if (tarjetaDeCredito.checked) {
      accountnumber.disabled = true;
      cardnumber.disabled = false;
      cardcode.disabled = false;
      cardven.disabled = false;
      cardinputs.classList.remove('d-none');
      accountinput.classList.add('d-none');
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

});



