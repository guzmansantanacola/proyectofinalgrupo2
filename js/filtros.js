document.addEventListener("DOMContentLoaded", function () {
    function traerID() {
        infoProduct = document.getElementsByClassName("fondolista");
        /* Se trae el id de cada producto contenido en el name de cada botón,
        se lo guarda en local storage y luego redirije a product-info */
        for (let i = 0; i < infoProduct.length; i++) {
            infoProduct[i].addEventListener("click", () => {
                localStorage.setItem("productId", infoProduct[i].id);

                window.location.href = "product-info.html";
            });
        };
    }

    const ORDENAR_VENDIDOS = "ordenarVendidos";
    const ORDENAR_ASCENDENTE = "ordenarAscendente";
    const ORDENAR_DESCENDENTE = "ordenarDescendente";

    const botonAscendente = document.getElementById("ordenAsc");
    const botonDescendente = document.getElementById("ordenDesc");
    const botonVendidos = document.getElementById("ordenVendidos");
    const botonLimpiar = document.getElementById("clearRangeFilter");
    const botonFiltrar = document.getElementById("rangeFilterCount");

    const productosNoEncontrados = document.getElementById("productosNoEncontrados");

    let productosFiltradosPorPrecio = [];

    function agregarProductos(element) {
        return `            
            <div setCatID(${element.id})" class="fondolista masInfo" type="button" id="${element.id}">
                <div class="fila">
                    <div class=imagenes>
                        <img src="${element.image}">
                    </div>
                    <div class="item">
                        <div>
                            <h4 class="nombreproductos">${element.name} </h4>
                            <p class="precio">${element.currency} ${element.cost}</p>
                        </div>
                        <p class="description">${element.description}</p>               
                    </div>
                </div>
                <h5 class="vendidos">${element.soldCount} vendidos</h5>
            </div>
        `
    }

    function ordenar(criterio) {
        let products;
        if (productosFiltradosPorPrecio.length !== 0) {
            products = productosFiltradosPorPrecio;
        } else {
            products = JSON.parse(localStorage.getItem("resultFetch"));
        }

        let productosOrdenados = [];
        if (criterio == "ordenarVendidos") {
            /* ordeno los productos de mayor cantidad de ventas a menor y los guardo en la variable "productosOrdenados" */
            productosOrdenados = products.sort(function (a, b) {
                return b.soldCount - a.soldCount;
            })
        } else if (criterio == "ordenarAscendente") {
            /* ordeno los productos de mayor precio a menor y los guardo en la variable "productosOrdenados" */
            productosOrdenados = products.sort(function (a, b) {
                return a.cost - b.cost;
            })
        } else if (criterio == "ordenarDescendente") {
            /* ordeno los productos de menor precio a mayor y los guardo en la variable "productosOrdenados" */
            productosOrdenados = products.sort(function (a, b) {
                return b.cost - a.cost;
            })
        }
        let agregar = "";
        productosOrdenados.forEach(products => {
            agregar += agregarProductos(products);
        })
        return document.getElementById("productos").innerHTML = agregar;
    }

    /* ORDENAR POR RELEVANCIA (MAS VENDIDOS) */

    botonVendidos.addEventListener("click", function () {
        ordenar(ORDENAR_VENDIDOS);
        traerID();
    })

    /* ORDENADO DE MENOR A MAYOR (PRECIO) */

    botonAscendente.addEventListener("click", function () {
        ordenar(ORDENAR_ASCENDENTE);
        traerID();
    })

    /* ORDENADO DE MAYOR A MENOR (PRECIO) */

    botonDescendente.addEventListener("click", function () {
        ordenar(ORDENAR_DESCENDENTE);
        traerID();
    })


    /* Filtro para el rango de precios */

    botonFiltrar.addEventListener("click", () => {
        let products = JSON.parse(localStorage.getItem("resultFetch"));

        const precioMin = parseInt(document.getElementById("precioMin").value);
        const precioMax = parseInt(document.getElementById("precioMax").value);
        let contador = 0;
        let agregar = "";
        products.forEach(product => {
            if (precioMin <= product.cost && product.cost <= precioMax) {
                agregar += agregarProductos(product);
                productosFiltradosPorPrecio.push(product);
                contador++;
            }
        });
        document.getElementById("productos").innerHTML = agregar;
        traerID();
        if (contador === 0) {
            productosNoEncontrados.innerHTML = `
                <p id=noEncontrado>No se encontraron productos.</p>
            `;
        } else if (document.getElementById("noEncontrado")) {
            const noEncontrado = document.getElementById("noEncontrado");
            noEncontrado.remove();
        }
    });

    botonLimpiar.addEventListener("click", function () { // Limpia los filtros
        location.reload();
    });

    /* Boton de busqueda  */

    const product = document.getElementById("searchInput");
    product.addEventListener("keyup", e => {
        let arrayTarjetas = document.querySelectorAll(".fondolista");
        if (e.target.matches("#searchInput")) {
            let contador = 0;
            arrayTarjetas.forEach(prod => {

                let tarjetaProducto = prod.textContent;
                let busqueda = e.target.value;

                if (tarjetaProducto.toLowerCase().includes(busqueda.toLowerCase()) || tarjetaProducto.toUpperCase().includes(busqueda.toUpperCase())) {
                    prod.style.display = "block";
                    contador++;
                } else {
                    prod.style.display = "none";
                }
            })

            if (contador === 0) {
                productosNoEncontrados.innerHTML = `
                    <p id=noEncontrado>No se encontraron productos.</p>
                `;
            } else if (document.getElementById("noEncontrado")) {
                const noEncontrado = document.getElementById("noEncontrado");
                noEncontrado.remove();
            }
        }
    });
});






