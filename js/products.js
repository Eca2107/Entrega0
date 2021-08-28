let productsArray = [];

//Funcion que itera los objetos del JSON para crear el div correspondiente al listado 

function showProductsList(array){

    let htmlContentToAppend = "";
    for(product of productsArray){

        htmlContentToAppend += `
        <div class="list-group-item list-group-item-action">
            <div class="row">
                <div class="col-3">
                    <img src="` + product.imgSrc + `" alt="` + product.description + `" class="img-thumbnail">
                </div>
                <div class="col">
                    <div class="d-flex w-100 justify-content-between">
                        <h2 class="mb-1">`+ product.name +`</h2>
                        <small class="h4"><small class="font-weight-bold h4">` + product.currency +`</small>`+` `+`<small class="font-weight-light h4">` + product.cost +`</small></small>
                    </div><br>
                    <div class="d-flex w-100 justify-content-between">
                    <p class="mb-1">` + product.description + `</p>
                    <small class="text-muted">` + product.soldCount + ` vendidos</small>
                    </div>

                </div>
            </div>
        </div>
        `

        document.getElementById("productos").innerHTML = htmlContentToAppend;
        
    }
    hideSpinner();
}

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {
    showSpinner();
    getJSONData(PRODUCTS_URL).then(function(resultObj){
        if (resultObj.status === "ok")
        {
            productsArray = resultObj.data;
            //Muestro las productos ordenados
            showProductsList(productsArray);
        }
    });

});