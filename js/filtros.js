const botonAscendente = document.getElementById("ordenAsc");
const botonDescendente = document.getElementById("ordenDesc");
const botonVendidos = document.getElementById("ordenVendidos");

botonVendidos.addEventListener("click", hacerFetch("https://japceibal.github.io/emercado-api/cats_products/101.json"))

function ordenarVendidos(arr) {
    const products = arr.products;
    const productosOrdenados = products.sort(function (a, b) {
        return b.soldCount - a.soldCount;
    })

    let htmlContentToAppend = "";
    productosOrdenados.forEach(products => {
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





function hacerFetch(url) {
    fetch(url)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            ordenarVendidos(data);
        })
}
