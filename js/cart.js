
const url = `https://japceibal.github.io/emercado-api/user_cart/25801.json`;

fetch(url)
    .then((response) => response.json())
    .then((data) => cartArticulos(data));


function cartArticulos(data) {
    console.log(data);

    let htmlContentToAppend = "";

    htmlContentToAppend += `
    

 
    `;



    document.getElementsByClassName("carrito").innerHTML = htmlContentToAppend;

}
