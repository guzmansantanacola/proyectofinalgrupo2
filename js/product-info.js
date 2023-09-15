const product = localStorage.getItem("productId");
const URL_ = `https://japceibal.github.io/emercado-api/products/${product}.json`;
const COMMENT_URL = `https://japceibal.github.io/emercado-api/products_comments/${product}.json`;
fetch(URL_)
  .then((response) => response.json())
  .then((data) => infoProducts(data));
function infoProducts(data) {
  let htmlContentToAppend = "";
  htmlContentToAppend += `
    

  <h1 class="titulo">${data.name}</h1>

<div id="contentInfo">
     <div class="galeria">
    
    <section class= "infoImg">
    <img src="${data.images[0]}"/>
    <img src="${data.images[1]}"/>
    <img src="${data.images[2]}"/>
    <img src="${data.images[3]}"/>
    </section>

<div class="description">

    <div id="vendidoCategorias">
    <h3 class="sell">Vendidos: ${data.soldCount} </h3>    
    <h1 class="categorias"> Categoría: ${data.category} </h1>
    </div>

    <h3 class="des">Descripción:</h3>
    <p class="parrafoDes">${data.description}</p>

    <h3 class="precio">Precio: ${data.currency} $${data.cost} </h3>

  </div>
</div>
  
    `;

  document.getElementById("producto").innerHTML = htmlContentToAppend;
}

/*PARTE 3*/
function getStars(score) {
  const maxStars = 5;
  const filledStars = Math.round(score);
  const emptyStars = maxStars - filledStars;

  const starHTML = '<span class="fa fa-star checked"></span>';
  const emptyStarHTML = '<span class="fa fa-star"></span>';

  const starsHTML =
    starHTML.repeat(filledStars) + emptyStarHTML.repeat(emptyStars);

  return starsHTML;
}

fetch(COMMENT_URL)
  .then((response) => response.json())
  .then((comments) => {
    let comentariosHTML = "";
    comments.forEach((com) => {
      comentariosHTML += `<div class="comentario">
        <p>${com.user} | ${com.dateTime} | ${getStars(com.score)}</p>
        <p>${com.description}</p>
       </div>`;
    });
    document.getElementById("comments").innerHTML = comentariosHTML;
  });

const submitcomment = document.getElementById("submitcomment");

const starInputs = document.querySelectorAll('input[type="radio"]');
let estrellaElegida;

starInputs.forEach((input) => {
  input.addEventListener("click", () => {
    estrellaElegida = input.value;
  });
});

submitcomment.addEventListener("click", (event) => {
  event.preventDefault();
  let userName = localStorage.getItem("nombredeusuario");
  let date = new Date().toLocaleString();
  let comentario = document.getElementById("inputComentario").value;

  document.getElementById("comments").innerHTML += `<div class="comentario">
  <p>${userName} | ${date} |  ${getStars(estrellaElegida)}   </p>
  <p>${comentario}</p>
 </div>`;


  //console.log(comentario);
  //console.log(estrellaElegida);
});

/* <div id="imagenes">
      <img src="${data.images[0]}" alt="">
      <img src="${data.images[1]}" alt="">
      <img src="${data.images[2]}" alt="">
      <img src="${data.images[3]}" alt="">
    </div> */
