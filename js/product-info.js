const product = localStorage.getItem('productId');
const URL_ = `https://japceibal.github.io/emercado-api/products/${product}.json`;

    fetch(URL_)
    .then(response => response.json())
    .then( data => infoProducts(data));

function infoProducts(data) {
    let htmlContentToAppend = "";
    htmlContentToAppend += `
    <h1 class="titulo">${data.name}</h1>
    <hr>
    <h3 class="ilus">Imagenes ilustrativas</h3>

    <div id="imagenes">
      <img src="${data.images[0]}" alt="">
      <img src="${data.images[1]}" alt="">
      <img src="${data.images[2]}" alt="">
      <img src="${data.images[3]}" alt="">
    </div>

    <h3 class="precio">Precio </h3>
    <p>${data.currency} ${data.cost}</p>

    <h3 class="des">Descripcion </h3>
    <p>${data.description}</p>

    <h3 class="categorias">Categoria </h3>
    <p>${data.category}</p>

    <h3 class="vendidos">Cantidad de vendidos</h3>
    <p>${data.soldCount}</p>
    `

    document.getElementById("producto").innerHTML = htmlContentToAppend;
}