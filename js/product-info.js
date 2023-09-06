const info = localStorage.getItem('resultFetch');
if (info) {
    const producto = `https://japceibal.github.io/emercado-api/products/${info}.json`;

    fetch(producto)
    .then(response => response.json())
    .then()
}
