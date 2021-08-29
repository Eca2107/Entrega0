const ORDER_ASC_BY_PRICE = "Menor precio";
const ORDER_DESC_BY_PRICE = "Mayor precio";
const ORDER_BY_RELEVANCE = "Relevancia"; 
let productsArray = [];
let sortCriteria = undefined;
let contadorMin = undefined;
let contadorMax = undefined; 

function sortProducts(criterio, array){  // Función que me devuelve el arreglo ordenado por un criterio dado
    let resultado = [];
    if(criterio === ORDER_ASC_BY_PRICE){
        resultado = array.sort(function(a,b){
            let aCost = parseInt(a.cost);
            let bCost = parseInt(b.cost);

            if(aCost > bCost){return 1;}
            if(aCost < bCost){return -1;}

            return 0;
        });
    }   else if(criterio === ORDER_DESC_BY_PRICE){
        resultado = array.sort(function(a,b){
            let aCost = parseInt(a.cost);
            let bCost = parseInt(b.cost);

            if(aCost > bCost){return -1;}
            if(aCost < bCost){return 1;}

            return 0;
        });
    }   else if(criterio === ORDER_BY_RELEVANCE){
        resultado = array.sort(function(a,b){
            let aRel = parseInt(a.soldCount);
            let bRel = parseInt(b.soldCount);

            if(aRel > bRel){return -1;}
            if(aRel < bRel){return 1;}

            return 0;
        });
    }
    return resultado;
}

//---------------------------------> De aquí en adelante es la funcion de insertar los objetos del JSON

//Funcion que itera los objetos del JSON para crear el div correspondiente al listado 
function showProductsList(array){

    let htmlContentToAppend = "";
    for(product of productsArray){
        if (((contadorMin == undefined) || (contadorMin != undefined && parseInt(product.cost) >= contadorMin)) &&
            ((contadorMax == undefined) || (contadorMax != undefined && parseInt(product.cost) <= contadorMax))){
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
}
    hideSpinner();
}

function sortAndShowProducts(criterio, prodArray){
    sortCriteria = criterio;
    
    if(prodArray != undefined){
        productsArray = prodArray;
    }

    productsArray = sortProducts(sortCriteria,productsArray);

    showProductsList();
}

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {
    showSpinner();
    getJSONData(PRODUCTS_URL).then(function(resultObj){
        if (resultObj.status === "ok")
        {
            sortAndShowProducts(ORDER_ASC_BY_PRICE,resultObj.data)
        }
    });

    document.getElementById("sortAsc").addEventListener("click", function(){
        sortAndShowProducts(ORDER_ASC_BY_PRICE);
    })

    document.getElementById("sortDesc").addEventListener("click", function(){
        sortAndShowProducts(ORDER_DESC_BY_PRICE);
    })

    document.getElementById("sortByRel").addEventListener("click", function(){
        sortAndShowProducts(ORDER_BY_RELEVANCE);
    })

    
});