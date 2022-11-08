const URL = CART_INFO_URL + "25801" + EXT_TYPE
let producto = {}
let precioUni = 0
let subTotal = 0
let total = 0
let costoEnvio = 0
let paymentType = "";
let paymentData = false;

document.addEventListener("DOMContentLoaded", ()=> {
     fetch(URL)
    .then(resp_1 => resp_1.json())
    .then(data_1 => {
     producto = data_1;
     
     document.getElementById("imgprod").innerHTML = `<img src="${producto.articles[0].image}" width="80" height="50">`
     document.getElementById("nameprod").innerHTML = producto.articles[0].name
     document.getElementById("costprod").innerHTML = producto.articles[0].currency + " " +producto.articles[0].unitCost
    })

});

function totalfinal(){

    cantele = document.getElementById("cantprod").value

    document.getElementById("subtotal").innerHTML = producto.articles[0].currency + " " +producto.articles[0].unitCost * cantele;
    document.getElementById("subtotal2").innerHTML = producto.articles[0].currency + " " +producto.articles[0].unitCost * cantele;

    shippingCost()
    Total()
}

      // Example starter JavaScript for disabling form submissions if there are invalid fields
(function () {
  'use strict'

  // Fetch all the forms we want to apply custom Bootstrap validation styles to
  var forms = document.querySelectorAll('.needs-validation')

  // Loop over them and prevent submission
  Array.prototype.slice.call(forms)
    .forEach(function (form) {
      form.addEventListener('submit', function (event) {
        if (!form.checkValidity()) {
          event.preventDefault()
          event.stopPropagation()
        }

        form.classList.add('was-validated')
      }, false)
    })
})()


function shippingCost (){

    subTotal = producto.articles[0].unitCost * cantele
    
    if (document.getElementById("standarShipping").checked){
        costoEnvio = subTotal * 0.05
        document.getElementById("shippingText").innerHTML = "USD " + costoEnvio    
 
    } else if (document.getElementById("expressShipping").checked){
        costoEnvio = subTotal * 0.07
        document.getElementById("shippingText").innerHTML = "USD " + costoEnvio
    } else if (document.getElementById("premiumShipping").checked){
        costoEnvio = subTotal * 0.15
        document.getElementById("shippingText").innerHTML = "USD " + costoEnvio
    }
    Total()
}

function Total (){

    totalCost = costoEnvio + subTotal
    document.getElementById("totalCostText").innerHTML = "USD " + totalCost
}

document.getElementById("TARJETA").addEventListener("change" , function(){

    document.getElementById("cardNumber").disabled = false;
    document.getElementById("segurityCode").disabled = false;
    document.getElementById("dateExp").disabled = false;
    
    document.getElementById("numberAccount").disabled = true;

    document.getElementById("paymentType").innerHTML = "Tarjeta de credito"
    paymentType = "Tarjeta de credito"

})

document.getElementById("Banco").addEventListener("change", function(){

    document.getElementById("cardNumber").disabled = true;
    document.getElementById("segurityCode").disabled = true;
    document.getElementById("dateExp").disabled = true;
    
    document.getElementById("numberAccount").disabled = false;

    document.getElementById("paymentType").innerHTML = "Transferencia bancaria"
    paymentType =  "Transferencia bancaria"


})

function showPaymentTypeNotSelected(){
    document.getElementById("paymentTypeFeedback").style.display = "block";
}

function hidePaymentTypeNotSelected(){
    document.getElementById("paymentTypeFeedback").style.display = "none";
}

let buyForm = document.getElementById("buyForm")

buyForm.addEventListener("submit", e => {

    e.preventDefault();
    e.stopPropagation();

    let Direccion = document.getElementById("Direccion")
    let numeroPuerta = document.getElementById("Numero")
    let esquina = document.getElementById("Esquina")
    let numerotarjeta = document.getElementById("cardNumber")
    let codigoSeguridad= document.getElementById("segurityCode")
    let fechavenc = document.getElementById("dateExp")
    let numeroBanco = document.getElementById("numberAccount")

    Direccion.classList.remove('is-invalid'); 
    numeroPuerta.classList.remove('is-invalid');
    esquina.classList.remove('is-invalid');

    if (Direccion.value == ""){
        Direccion.classList.add('is-invalid');
        paymentData = true;
    }
    if (numeroPuerta.value == ""){
        numeroPuerta.classList.add('is-invalid');
        paymentData = true;
    }
    if (esquina.value == ""){
        esquina.classList.add('is-invalid');
        paymentData = true;
    }

    if( (paymentType == "")  || 
    (paymentType === "Transferencia bancaria" && numeroBanco.value == "") || 
    (paymentType === "Tarjeta de credito" && (numerotarjeta.value == "" && codigoSeguridad.value == "" && fechavenc.value == ""))
    ){
    
        showPaymentTypeNotSelected();
        paymentData = true;
    } else {
        hidePaymentTypeNotSelected();
    }

    if (!paymentData){
        location.reload ()
    }

})