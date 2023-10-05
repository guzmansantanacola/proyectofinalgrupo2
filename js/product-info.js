const product = localStorage.getItem("productId");
const URL_ = `https://japceibal.github.io/emercado-api/products/${product}.json`;
const COMMENT_URL = `https://japceibal.github.io/emercado-api/products_comments/${product}.json`;
fetch(URL_)
  .then((response) => response.json())
  .then((data) => infoProducts(data));

function infoProducts(data) {
  console.log(data);
  let htmlContentToAppend = "";
  let relacionadosToAppend = "";

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
  </div>
    `;

  //creamos los productos relacionados

  data.relatedProducts.forEach((product) => {
    relacionadosToAppend += `
    <div setCatID(${product.id})" class="relacionado fondolista masInfo " type="button" id="${product.id}">
              
      <div class="fila">
        <div class=imagenes>
          <img src="${product.image}">
        </div>
        <div class="item">
            <div>
              <h4 class="nombreproductos">${product.name} </h4>
                     
            </div>
                
        </div>
      </div>
         
    </div>
    `;
  });


  document.getElementById("producto").innerHTML = htmlContentToAppend;
  document.getElementById("relacionados").innerHTML = relacionadosToAppend;
  //listener que nos permite guardar la id de los productos relacionados que creamos más arriba
  let relatedProducts = document.getElementsByClassName("relacionado");
  for (let i = 0; i < relatedProducts.length; i++) {
    relatedProducts[i].addEventListener("click", () => {
      localStorage.setItem("productId", relatedProducts[i].id);

      let redirigir = (window.location.href = "product-info.html");
      redirigir;
    });
  }
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
const commentArea = document.getElementById("inputComentario");
const estrellitas = document.getElementsByName("rate");
const starInputs = document.querySelectorAll('input[type="radio"]');
let estrellaElegida;

starInputs.forEach((input) => {
  input.addEventListener("click", () => {
    estrellaElegida = input.value;
  });
});

//Agregar un comentario nuevo
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

  commentArea.value = "";
  for (let i = 0; i < estrellitas.length; i++) {
    estrellitas[i].checked = false;
  }
});

//boton agregar al carrito
let addButton = document.getElementById('cartadd');
let cartList = JSON.parse(localStorage.getItem("cartlist")) || [];


addButton.addEventListener('click', () => {
  addtocart();
})


function addtocart() {
  const productId = localStorage.getItem("productId");
  cartList = [...cartList, productId];
  localStorage.setItem("cartlist", JSON.stringify(cartList));
}