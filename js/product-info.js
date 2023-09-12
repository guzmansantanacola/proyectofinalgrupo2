const product = localStorage.getItem('productId');
const URL_ = `https://japceibal.github.io/emercado-api/products/${product}.json`;
const COMMENT_URL =  `https://japceibal.github.io/emercado-api/products_comments/${product}.json`;
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

/*PARTE 3*/
function getStars(score) {
  const maxStars = 5;
  const filledStars = Math.round(score);
  const emptyStars = maxStars - filledStars;

  const starHTML = '<span class="fa fa-star checked"></span>';
  const emptyStarHTML = '<span class="fa fa-star"></span>';

  const starsHTML = starHTML.repeat(filledStars) + emptyStarHTML.repeat(emptyStars);

  return starsHTML;
}

fetch(COMMENT_URL)
  .then(response => response.json())
  .then(comments => {
    let comentariosHTML = "";
    comments.forEach(com => {
      comentariosHTML += `<div class="comentario">
        <p>${com.user} | ${com.dateTime} | ${getStars(com.score)}</p>
        <p>${com.description}</p>
        <p class="score"></p>
       </div>`;
    });
    document.getElementById("comments").innerHTML = comentariosHTML;
  })