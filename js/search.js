//Creo array con las ID de las categorias
let descriptionsArray = [101, 102, 103, 104, 105, 106, 107, 108, 109];

let products = [];
let inputBusqueda = document.getElementById("formBusqueda");


inputBusqueda.addEventListener("submit", (event) => {
    event.preventDefault();

    let productToSearch = document.getElementById("campoBusqueda").value;
    //console.log(productToSearch);
    //Por cada elemento en el array de las ID hago un fetch a la respectiva URL de cada categoría
    descriptionsArray.map(i => {
        fetch(`https://japceibal.github.io/emercado-api/cats_products/${i}.json`)
            .then(response => response.json())
            .then(data => {
                let productsArray = data.products;
                let category = data.catName;
                if (productsArray != 0) {
                    //console.log(productsArray);
                    productsArray.map(i => {
                        //products.push(i);
                        //console.log(i);
                        //console.log(productToSearch);

                        // verifico si los productos contienen la palabra que se busca y si es así lo agrego al array "products"
                        if (i.name.toLowerCase().includes(productToSearch.toLowerCase()) || i.name.toUpperCase().includes(productToSearch.toUpperCase()) ||
                            i.description.toLowerCase().includes(productToSearch.toLowerCase()) || i.description.toUpperCase().includes(productToSearch.toUpperCase()) ||
                            category.toLowerCase().includes(productToSearch.toLowerCase()) || category.toUpperCase().includes(productToSearch.toUpperCase())) {
                            //console.log(i);
                            products.push(i);
                        }
                    })

                }

                //Guardo en LocalStorage el array en el mismo indice que guardo el resultado del fetch de los productos y redirijo
                localStorage.setItem("resultFetch", JSON.stringify(products));
                window.location = "searchResult.html";

            })
    })
})

