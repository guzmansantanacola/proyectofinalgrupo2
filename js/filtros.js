// Recupero los botones del DOM

const botonAscendente = document.getElementById("ordenAsc");
const botonDescendente = document.getElementById("ordenDesc");
const botonVendidos = document.getElementById("ordenVendidos");

//let divProductos = document.getElementById("productos")
//console.log(divProductos);




// agrego un escuchador de eventos con una funcino para ordenar e insertar en el HTML los datos
botonVendidos.addEventListener("click", function ordenarVendidos() {

    // Traigo los datos del fetch guardados en el Local Storage
    let resultFetch = JSON.parse(localStorage.getItem("resultFetch"));

    // guardo los productos que traje del Local Storage en la variable "products"
    const products = resultFetch.products;
    //ordedno los productos de mayor cantidad de ventas a menor y los guardo en la variable "productosOrdenados"
    const productosOrdenados = products.sort(function (a, b) {
        return b.soldCount - a.soldCount;
    })
    //console.log(productosOrdenados);

    //Inserto la lista ordenada en el HTML
    let agregar = "";
    productosOrdenados.forEach(products => {
        agregar += `
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

    })
    document.getElementById("productos").innerHTML = agregar;

})

// ORDENADO DE MAYOR A MENOR

botonAscendente.addEventListener("click", function ordenarAscendente() {


    let resultFetch = JSON.parse(localStorage.getItem("resultFetch"));

    const products = resultFetch.products;
    //ordedno los productos de mayor precio a menor y los guardo en la variable "productosOrdenados"
    const productosOrdenados = products.sort(function (a, b) {
        return b.cost - a.cost;
    })

    //Inserto la lista ordenada en el HTML
    let agregar = "";
    productosOrdenados.forEach(products => {
        agregar += `
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

    })
    document.getElementById("productos").innerHTML = agregar;

})

//ORDENADO DE MENOR A MAYOR

botonDescendente.addEventListener("click", function ordenarDescendente() {


    let resultFetch = JSON.parse(localStorage.getItem("resultFetch"));

    const products = resultFetch.products;
    //ordedno los productos de menor precio a mayor y los guardo en la variable "productosOrdenados"
    const productosOrdenados = products.sort(function (a, b) {
        return a.cost - b.cost;
    })

    //Inserto la lista ordenada en el HTML
    let agregar = "";
    productosOrdenados.forEach(products => {
        agregar += `
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

    })
    document.getElementById("productos").innerHTML = agregar;

})


// Filtro para el rango de precios

const precioMax = document.getElementById("precioMax").value;

const boton1 = document.getElementById("rangeFilterCount");


boton1.addEventListener("click", () => {
    const precioMin = parseInt(document.getElementById("precioMin").value);
    console.log(typeof precioMin)
}
);



// function hacerFetch(url, callback) {
//     return fetch(url)
//         .then(response => response.json())
//         .then(data => {
//             console.log(data);
//             callback(data);
//             //ordenarVendidos(data);
//         })
// }
