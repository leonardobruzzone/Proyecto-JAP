document.addEventListener("DOMContentLoaded", function(){
    document.getElementById("autos").addEventListener("click", function() {
        localStorage.setItem("catID", 101);
        window.location = "products.html"
    });
    document.getElementById("juguetes").addEventListener("click", function() {
        localStorage.setItem("catID", 102);
        window.location = "products.html"
    });
    document.getElementById("muebles").addEventListener("click", function() {
        localStorage.setItem("catID", 103);
        window.location = "products.html"
    });
    
    
});

  
if (localStorage.getItem("userLog") == undefined){
    document.getElementById("inicio").innerHTML = "Iniciar sesión"
 }
 else {
     document.getElementById("inicio").innerHTML = localStorage.getItem("userLog");
 }


