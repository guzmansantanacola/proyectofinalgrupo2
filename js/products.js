fetch("https://japceibal.github.io/emercado-api/cats_products/101.json")
    .then(response => response.json())
    .then(data => {
        console.log(data);
        categoriaautos(data);
    })

function categoriaautos(data) {
    const autos = data.products;
    let htmlContentToAppend = "";
    autos.forEach(products => {
        htmlContentToAppend += `
                   <div setCatID(${products.id})" class="fondolista">
                       <div class="fila">
                           <div class=imagenes>
                               <img src="${products.image}">
                           </div>
                           <div class="item">
                               <div>
                                   <h4 class="nombreproductos">${products.name} </h4>
                                   <p class="precio">${products.currency} ${products.cost}</p>
                               </div>
            
                               
                           </div>
                       </div>
                       <h5 class="vendidos">${products.soldCount} vendidos</h5>
                   </div>
                   `
        document.getElementById("productos").innerHTML = htmlContentToAppend;
    })
}


/*" class="list-group-item list-group-item-action cursor-active"*/
/*class="mb-1"*/



