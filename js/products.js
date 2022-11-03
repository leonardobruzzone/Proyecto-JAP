const ORDER_ASC_BY_PRICE = "DTOM";
const ORDER_DESC_BY_PRICE = "MTOD";
const ORDER_BY_PROD_COUNT = "Cant.";
let currentSortCriteria = undefined;
let minCost = undefined;
let maxCost = undefined;
let inputSearch = undefined;

function sortCategories(criteria, array){
    let result = [];
    if (criteria === ORDER_ASC_BY_PRICE)
    {
        result = array.sort(function(a, b) {
            if ( a.cost < b.cost ){ return -1; }
            if ( a.cost > b.cost ){ return 1; }
            return 0;
        });
    }else if (criteria === ORDER_DESC_BY_PRICE){
        result = array.sort(function(a, b) {
            if ( a.cost > b.cost ){ return -1; }
            if ( a.cost < b.cost ){ return 1; }
            return 0;
        });
    }else if (criteria === ORDER_BY_PROD_COUNT){
        result = array.sort(function(a, b) {
            let aCount = parseInt(a.soldCount);
            let bCount = parseInt(b.soldCount);

            if ( aCount > bCount ){ return -1; }
            if ( aCount < bCount ){ return 1; }
            return 0;
        });
    }

    return result;
}

function setCatID(id, name) {
    localStorage.setItem("catID", id);
    localStorage.setItem("catNAME", name);
    window.location = "products.html"
}

function sortAndShowCategories(sortCriteria, categoriesArray){
    currentSortCriteria = sortCriteria;

    if(categoriesArray != undefined){
        currentCategoriesArray = categoriesArray;
    }

    productsArray = sortCategories(currentSortCriteria, productsArray);

    mostrarProductos();
}

document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(CATEGORIES_URL + localStorage.catID + ".json").then(function(resultObj){
        if (resultObj.status === "ok"){
            currentCategoriesArray = resultObj.data.products;
            mostrarListaDeProductos()
        }
    });

    document.getElementById("sortAsc").addEventListener("click", function(){
        sortAndShowCategories(ORDER_ASC_BY_PRICE);
    });

    document.getElementById("sortDesc").addEventListener("click", function(){
        sortAndShowCategories(ORDER_DESC_BY_PRICE);
    });

    document.getElementById("sortByCount").addEventListener("click", function(){
        sortAndShowCategories(ORDER_BY_PROD_COUNT);
    });

    document.getElementById("clearRangeFilter").addEventListener("click", function(){
        document.getElementById("rangeFilterCostMin").value = "";
        document.getElementById("rangeFilterCostMax").value = "";

        minCost = undefined;
        maxCost = undefined;

        mostrarProductos();
    });

    document.getElementById("rangeFilterCost").addEventListener("click", function(){
    
        minCost = document.getElementById("rangeFilterCostMin").value;
        maxCost = document.getElementById("rangeFilterCostMax").value;

        if ((minCost != undefined) && (minCost != "") && (parseInt(minCost)) >= 0){
            minCost = parseInt(minCost);
        }
        else{
            minCost = undefined;
        }

        if ((maxCost != undefined) && (maxCost != "") && (parseInt(maxCost)) >= 0){
            maxCost = parseInt(maxCost);
        }
        else{
            maxCost = undefined;
        }

        mostrarFiltroCostDeProductos();
    });
});

document.addEventListener("DOMContentLoaded",function (e) {
    getJSONData(PRODUCTS_URL + localStorage.catID + ".json").then(function(resultObj) {
        if (resultObj.status ==="ok") {
            productsArray = resultObj.data.products;
            mostrarProductos();
        }
    });

});

function setProduct(id){
    localStorage.setItem("idproduct", id)  //función para setear el id del producto, 
    window.location.href ="product-info.html" //para luego llamarlo en la URL
}

let productsArray = [];

function mostrarProductos() {
    let contenidoProductos = "";

    for (let i = 0; i < productsArray.length; i++) {
        let datos = productsArray[i];

    if (((inputSearch == undefined) || (inputSearch != undefined && datos.name.includes(inputSearch))) ||
       (((inputSearch == undefined) || (inputSearch != undefined && datos.description.includes(inputSearch))))) {


        contenidoProductos += `
    
        <div  onclick="setProduct(${datos.id})" class="list-group-item list-group-item-action">
            <div class="row">
                <div class="col-3">
                    <img src="${datos.image}" alt="${datos.description}" class="img-thumbnail">
                </div>
                <div class="col">
                    <div class="d-flex w-100 justify-content-between">
                        <h4 class="mb-1">${datos.name}-${datos.cost}${" "}${datos.currency}</h4>
                        <small class="text-muted">${datos.soldCount} vendidos</small>
                    </div>
                    <p class="mb-1">${datos.description}</p>
                </div>
            </div>
        </div>
        `
}
    document.getElementById("product").innerHTML = contenidoProductos;
};

}

function mostrarFiltroCostDeProductos(){

let contenidoProductos = "";

for (let i=0; i<productsArray.length; i++) {
    let datos = productsArray[i]

    if (((minCost == undefined) || (minCost != undefined && parseInt(datos.cost) >= minCost)) &&
    (((maxCost == undefined) || (maxCost != undefined && parseInt(datos.cost) <= maxCost)))) {

        contenidoProductos += `
        <div  class="list-group-item list-group-item-action">
            <div class="row">
                <div class="col-3">
                    <img src="${datos.image}" alt="${datos.description}" class="img-thumbnail">
                </div>
                <div class="col">
                    <div class="d-flex w-100 justify-content-between">
                        <h4 class="mb-1">${datos.name}-${datos.cost}${" "}${datos.currency}</h4>
                        <small class="text-muted">${datos.soldCount} vendidos</small>
                    </div>
                    <p class="mb-1">${datos.description}</p>
                </div>
            </div>
        </div>
        `
}
    document.getElementById("product").innerHTML = contenidoProductos;
};
}        




