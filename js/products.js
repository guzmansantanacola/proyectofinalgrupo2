document.addEventListener("DOMContentLoaded", () => {

let catID = JSON.parse(localStorage.getItem("catID"));
const prodID = `https://japceibal.github.io/emercado-api/cats_products/${catID}.json`;

fetch(prodID)
    .then(response => response.json())
    .then(data => {
        //console.log(data);
        //Guardo los datos en el Local storage
        localStorage.setItem("resultFetch", JSON.stringify(data.products));
        productList(data);
    })


function productList(data) {
    const products = data.products;
    let htmlContentToAppend = "";
    products.forEach(product => {
        htmlContentToAppend += `
                   <div setCatID(${product.id})" class="fondolista">
                       <div class="fila">
                           <div class=imagenes>
                               <img src="${product.image}">
                           </div>
                           <div class="item">
                               <div>
                                   <h4 class="nombreproductos">${product.name} </h4>
                                   <p class="precio">${product.currency} ${product.cost}</p>
                               </div>
                               <p class="description">${product.description}</p>
                               <input id="masInfo" type="button" value="Más Información" .>
                           </div>
                       </div>
                       <h5 class="vendidos">${product.soldCount} vendidos</h5>
                   </div>
                   `
        document.getElementById("productos").innerHTML = htmlContentToAppend;
    })
}


 let productito = document.getElementById("masInfo");

 productito.addEventListener("click", () => {
     let redirigir = window.location.href = "product-info.html";
    
     redirigir

 });

});