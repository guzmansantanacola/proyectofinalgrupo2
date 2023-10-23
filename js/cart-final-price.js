document.addEventListener("DOMContentLoaded", () => {

    const prodInCart = JSON.parse(localStorage.getItem("cartlist")) || [];

    const prodArr = [];
    async function listadoCarrito() {

        // for (let i = 0; i < prodInCart.length; i++) {
        //     const response = await fetch(`https://japceibal.github.io/emercado-api/products/${prodInCart[i].id}.json`);
        //     const data = await response.json();
        //     prodArr.push(data)

        // }
        prodInCart.forEach((i) => {
            fetch(`https://japceibal.github.io/emercado-api/products/${i.id}.json`)
                .then((response) => response.json())
                .then((data) => {
                    prodArr.push(data)
                    console.log(data)
                }) 
        });
    }
    listadoCarrito()
    console.log(prodArr);

    // setTimeout(() => {
    //     console.log(prodArr.length);

    //     const subTotalFinal = document.getElementById("subTotalFinal");

    //     let sumatoria = 0;

    //     for (let i = 0; i < prodArr.length; i++) {

    //         sumatoria = + prodArr[i].cost * i.mount;

    //         subTotalFinal.innerHTML = sumatoria;

    //     }

    // }, 2000);


});