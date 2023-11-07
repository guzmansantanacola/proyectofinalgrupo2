document.addEventListener("DOMContentLoaded", () => {

    let catID = JSON.parse(localStorage.getItem("catID"));
    const URL_PRODUCTS = `https://japceibal.github.io/emercado-api/cats_products/${catID}.json`;
    let infoProduct;

    const productosNoEncontrados = document.getElementById("productosNoEncontrados");

    fetch(URL_PRODUCTS)
        .then(response => response.json())
        .then(data => {
            localStorage.setItem("resultFetch", JSON.stringify(data.products)); // Guarda los datos Local de cada producto para utilizarlos en el filtrado

            listProducts(data);

            infoProduct = document.getElementsByClassName("fondolista"); // Recuperamos del DOM cada articulo insertado antes
            for (let i = 0; i < infoProduct.length; i++) {
                infoProduct[i].addEventListener("click", () => {
                    localStorage.setItem("productId", infoProduct[i].id); // Guarda la id del producto seleccionado para utilizarla en product-info.js
                    window.location.href = "product-info.html"; // redirigimos a product-info para mostrar el producto seleccionado
                });
            };
        });

    function listProducts(data) {
        const products = data.products; // productos traídos del Fetch
        if (products.length === 0) {
            productosNoEncontrados.innerHTML = `
            <p id=noEncontrado>No se encontraron productos.</p>
            `;
        } else {
            let htmlContentToAppend = "";
            products.forEach(product => {
                htmlContentToAppend += `            
                   <div setCatID(${product.id})" class="fondolista masInfo" type="button" id="${product.id}">              
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
                           </div>
                       </div>
                       <h5 class="vendidos">${product.soldCount} vendidos</h5>
                   </div>
                   `
                document.getElementById("productos").innerHTML = htmlContentToAppend;
            });
        }
    }
});





