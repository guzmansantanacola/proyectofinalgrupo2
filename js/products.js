fetch ("https://japceibal.github.io/emercado-api/cats_products/101.json")
    .then(response => response.json())
    .then(data => {
        console.log(data);
        categoriaautos(data);
    })

    function categoriaautos(data){
        const autos = data.products;
        let htmlContentToAppend = "";
        autos.forEach(products => {
                   htmlContentToAppend += `
                   <div setCatID(${products.id})" class="fondolista">
                       <div class="row">
                           <div class="col-3">
                               <img src="${products.image}" alt="${products.description}" >
                           </div>
                           <div class="col">
                               <div class="d-flex w-100 justify-content-between">
                                   <h4 class="nombreproductos">${products.name} </h4>
                                   <small class="text-muted">${products.soldCount} vendidos</small>
                               </div>
                               <p class="description">${products.description}</p>
                               
                           </div>
                       </div>
                       <p class="precio">${products.currency} ${products.cost}</p>
                   </div>
                   `
               document.getElementById("productos").innerHTML = htmlContentToAppend;
        })
   }
   /*" class="list-group-item list-group-item-action cursor-active"*/
 /*class="mb-1"*/