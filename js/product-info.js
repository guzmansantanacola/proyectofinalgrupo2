const product = localStorage.getItem("productId");

/* DEFINIMOS URL's NECESARIAS PARA LOS DISTINTOS FETCH */
const URL_ = `http://localhost:3000/products/${product}.json`;
const COMMENT_URL =`http://localhost:3000/products_comments/${product}.json`;

/* ----------     AGREGAMOS LOS PRODUCTOS AL HTML     ---------- */

fetch(URL_)
  .then((response) => response.json())
  .then((data) => infoProducts(data));

function infoProducts(data) {
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

  data.relatedProducts.forEach((product) => { // creamos los productos relacionados
    relacionadosToAppend += `
      <div setCatID(${product.id})" class="relacionado fondolista masInfo mx-4" type="button" id="${product.id}">              
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
  document.getElementById('closeAlert')
  document.getElementById('alertSuccess')
  document.getElementById("producto").innerHTML = htmlContentToAppend;
  document.getElementById("relacionados").innerHTML = relacionadosToAppend;
  
  let relatedProducts = document.getElementsByClassName("relacionado");

  for (let i = 0; i < relatedProducts.length; i++) {
    relatedProducts[i].addEventListener("click", () => { // listener que nos permite guardar la id de los productos relacionados que creamos más arriba
      localStorage.setItem("productId", relatedProducts[i].id);

      let redirigir = (window.location.href = "product-info.html");
      redirigir;
    });
  }
}


/* ----------     FUNCIÓN PARA TRAER Y REALIZAR COMENTARIOS AL PRODUCTO     ---------- */

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
      comentariosHTML += `
        <div class="comentario">
          <p>${com.user} | ${com.dateTime} | ${getStars(com.score)}</p>
          <p>${com.description}</p>
        </div>
      `;
    });
    document.getElementById("comments").innerHTML = comentariosHTML;
  });

const submitcomment = document.getElementById("submitcomment");
const commentArea = document.getElementById("inputComentario");
const commentLimit = document.getElementById("commentLimit")
const charLimit = 100;
const estrellitas = document.getElementsByName("rate");
const starInputs = document.querySelectorAll('input[type="radio"]');
let estrellaElegida;


starInputs.forEach((input) => {
  input.addEventListener("click", () => {
    console.log(starInputs)
    estrellaElegida = input.value;
    checked = true;
  });
});

/* contador de caracteres, se pone rojito cuando se pasa el límite */
commentLimit.textContent = `0 / ${charLimit}`;
commentArea.addEventListener("input", function () {
  commentLenght = commentArea.value.length;
  commentLimit.textContent = `${commentLenght} / ${charLimit}`;

  if (commentLenght > charLimit) {
    commentArea.style.borderColor = "#ff2851"
    commentLimit.style.color = "#ff2851"
  } else {
    commentArea.style.borderColor = "#3c096c"
    commentLimit.style.color = "#808080"
  }
});

/* Agregar un comentario nuevo */
submitcomment.addEventListener("click", (event) => {
  event.preventDefault();
  let userName = localStorage.getItem("nombredeusuario");
  let date = new Date().toLocaleString();
  let comentario = document.getElementById("inputComentario").value;
  let commentError = document.getElementById("comment-error");

  if (commentArea.value.length < charLimit && commentArea.value.length > 1 && (checked)) {
    document.getElementById("comments").innerHTML += `
      <div class="comentario">
        <p>${userName} | ${date} |  ${getStars(estrellaElegida)}   </p>
        <p>${comentario}</p>
      </div>
    `;
    checked = false;
  } else {
/* Feedback sobre comentario y ranking no válido */
    commentError.style.display = "block";
                setTimeout(() => {
                    commentError.classList.add('fade');
                }, 4000);

    alert("Por favor, ingrese un comentario y seleccione un ranking válido.");

  }

  commentArea.value = "";
  commentLimit.textContent = `0 / ${charLimit}`
  for (let i = 0; i < starInputs.length; i++) {
    estrellitas[i].checked = false;
  }
});


/* ----------     AGREGAMOS PRODUCTO AL CARRITO     ---------- */

let addButton = document.getElementById('cartadd');
let cartList = JSON.parse(localStorage.getItem("cartlist")) || [];

addButton.addEventListener('click', () => {
  addtocart();
});

function addtocart() {
  alertSuccess.classList.remove('d-none');
  alertSuccess.classList.add('fade-in');

  let productObject = {
    id: product,
    mount: 1
  }

  let productExist = false;

  cartList.map(i => {
    if (i.id == product) { // si el producto ya existía en el carrito le aumentamos la cantidad en 1 cada vez que se lo agrega
      productExist = true;
      i.mount += 1;
      localStorage.setItem("cartlist", JSON.stringify(cartList));
    }
  });

  if (!productExist) { // si el producto no existe en el carrito lo agregamos
    cartList = [...cartList, productObject];
    localStorage.setItem("cartlist", JSON.stringify(cartList));
  }
}

closeAlert.addEventListener('click', () => {
  alertSuccess.classList.add('d-none');
})
