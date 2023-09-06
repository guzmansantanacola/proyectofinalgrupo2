document.addEventListener("DOMContentLoaded", () => {

    let catID = JSON.parse(localStorage.getItem("catID"));
    const prodID = `https://japceibal.github.io/emercado-api/cats_products/${catID}.json`;
    let infoProduct

    fetch(prodID)
        .then(response => response.json())
        .then(data => {
            //console.log(data);
            //Guardo los datos en el Local storage
            localStorage.setItem("resultFetch", JSON.stringify(data.products));
            productList(data);

            infoProduct = document.getElementsByClassName("masInfo");

            for (let i = 0; i < infoProduct.length; i++) {
                infoProduct[i].addEventListener("click", () => {

                    localStorage.setItem("productId", infoProduct[i].name);

                    let redirigir = window.location.href = "product-info.html";
                    redirigir

                });


            };

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
                               <input class="masInfo" type="button" name="${product.id}" value="Más Información" .>
                           </div>
                       </div>
                       <h5 class="vendidos">${product.soldCount} vendidos</h5>
                   </div>
                   `
            document.getElementById("productos").innerHTML = htmlContentToAppend;
        })
    }





});


//onclick="redirectToProductInfo(${product.id}"

