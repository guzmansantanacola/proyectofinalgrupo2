document.getElementById("modoDia").addEventListener("click", function () {
    menuDesplegable.classList.remove("modo-noche");
    menuDesplegable.classList.add("modo-dia");
    console.log(mododia);
  });
  
  document.getElementById("modoNoche").addEventListener("click", function () {
    menuDesplegable.classList.remove("modo-dia");
    menuDesplegable.classList.add("modo-noche");
  });

