/* Boton de busqueda  */

const product=document.getElementById("searchInput");
searchInput.addEventListener("input", () =>{
 const searchFinal= searchInput.value;

    const filtro= productList.filters(product =>{

   const nombre= product.name.toLowerCase().includes(searchInput);
   const descripcion=product.description.toLowerCase().includes(searchInput);

    }});
    
    
    /**incluyo el titulo y descripcion *
     * toLoWerCase convertir a minuscula/
