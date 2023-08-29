/* Boton de busqueda  */

const product = document.getElementById("searchInput");


searchInput.addEventListener("input", e => {
   const searchFinal = e.target.value;
   console.log(searchFinal);
   });


/**incluyo el titulo y descripcion */




    const filtro= productList.filters(product =>{

   const nombre= product.name.toLowerCase().includes(searchInput);
   const descripcion=product.description.toLowerCase().includes(searchInput);

    }});
    
    
    /**incluyo el titulo y descripcion *
     * toLoWerCase convertir a minuscula/
