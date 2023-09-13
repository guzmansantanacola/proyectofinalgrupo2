//Traigo lo que tengo guardado en el LocalStorage
let productsArray = JSON.parse(localStorage.getItem("resultFetch"));

//Función paara agregar las tarjetas con los productos al HTML
function productList(arr) {
    if (arr.length === 0) {
        productosNoEncontrados.innerHTML = `
        <p id=noEncontrado>No se encontraron productos.</p>
        `;
    } else {
        let htmlContentToAppend = "";
        arr.forEach(product => {
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
        })
    }

}

//LLamo a la función que creé antes
productList(productsArray);


//Agrego escuchadores de eventos click a cada tarjeta para ir a la seccion de información de producto
let infoProduct = document.getElementsByClassName("fondolista");

for (let i = 0; i < infoProduct.length; i++) {
    infoProduct[i].addEventListener("click", () => {

        localStorage.setItem("productId", infoProduct[i].id);

        let redirigir = window.location.href = "product-info.html";
        redirigir

    });
};