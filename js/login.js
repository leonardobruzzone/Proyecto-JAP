function success () {
    window.location.href="./index.html"
};

function alertError () {
    alert("Debe completar los campos solicitados");
}

function controlError() {
    var error = false;

    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;

    if (email=="") {
        error = true
    }

    if (password=="") {
        error = true
    }

    if (error == !false) {
        alertError();
    } else {
        success ()
    }  
}

document.getElementById("acceso").addEventListener("click", () => {
    const emailingreso = document.getElementById("email").value;
    localStorage.setItem("userLog", emailingreso)
})

if (localStorage.getItem("userLog") == undefined){
    document.getElementById("inicio").innerHTML = "Iniciar sesión"
} else {
    document.getElementById("inicio").innerHTML = localStorage.getItem("userLog");
}


function logout() {
    localStorage.removeItem("userLog");
}
