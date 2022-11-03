const productId = localStorage.getItem("idproduct") + EXT_TYPE;
const productsURL = PRODUCT_INFO_URL + productId;
const commentsURL = PRODUCT_INFO_COMMENTS_URL + productId;

document.addEventListener("DOMContentLoaded", () => {
    fetch(productsURL)
        .then(resp => resp.json())
        .then(producto => {
            document.getElementById("productName").innerHTML = producto.name;
            document.getElementById("productCost").innerHTML = producto.cost;
            document.getElementById("productCurrency").innerHTML = producto.currency;
            document.getElementById("productDescription").innerHTML = producto.description;
            document.getElementById("productcate").innerHTML = producto.category;
            document.getElementById("productCount").innerHTML = producto.soldCount;

            let imgContent = '';
            for (let i = 0; i < producto.images.length; i++) {
                imgContent += `<img src="${producto.images[i]}" class="col-3">`;
            }
            document.getElementById("productGallery").innerHTML = imgContent;

            let related = '';
            for (let i = 0; i < producto.relatedProducts.length; i++) {
                related += ` 
                <div class="list-group-item list-group-item-action cursor-active">
              
                    <p><strong>${producto.relatedProducts[i].name}</strong></p>
                    <img src="${producto.relatedProducts[i].image}" class="col-3">
                    </div>
                </div>
                `;
            }
            document.getElementById("relatedProducts").innerHTML = related;

        })
});




document.addEventListener("DOMContentLoaded", () => {
    fetch(commentsURL)
        .then(resp => resp.json())
        .then(comments => {
            let commentBox = '';
            for (let i = 0; i < comments.length; i++) {
                commentBox += `
                <div class="list-group-item list-group-item-action cursor-active">
                    <div class="row">
                        <div class="col-3">
                            <p>${comments[i].user}</p>
                            <p>${comments[i].dateTime}</p>
                        </div>
                        <div class="col-9">
                            <p>${stars(comments[i].score)}</p>
                            <p>${comments[i].description}</p>
                        </div>
                    </div>
                </div>
            `;
            }
            document.getElementById("productComments").innerHTML = commentBox;
        })

});

function stars(cantidad) {
    let star = '';
    for (let i = 0; i < cantidad; i++) {
        star += `<span class="fa fa-star checked"></span>`
    }
    for (let i = cantidad; i < 5; i++) {
        star += `<span class="fa fa-star"></span>`
    }
    return star;
};
