let productExample = {
    id: "50924",
    mount: 1
  } 

localStorage.setItem("cartListExample", JSON.stringify(productExample));

//   if(JSON.parse(localStorage.getItem("productExample")) != null) {
//     localStorage.setItem("productExample", JSON.stringify(productExample));
//   } 