const ORDER_ASC_BY_PRICE = "Menor precio";
const ORDER_DESC_BY_PRICE = "Mayor precio";
const ORDER_BY_RELEVANCE = "Relevancia";
let currentProductsArray = [];
let filteredProducts = [];
let currentSortCriteria = undefined;
let contadorMin = undefined;
let contadorMax = undefined;

function sortProducts(criteria, array) {
  let result = [];
  if (criteria === ORDER_ASC_BY_PRICE) {
    document.getElementById("boton").innerHTML = "Ordenar por: Menor precio";
    result = array.sort(function (a, b) {
      if (a.cost < b.cost) {
        return -1;
      }
      if (a.cost > b.cost) {
        return 1;
      }
      return 0;
    });
  } else if (criteria === ORDER_DESC_BY_PRICE) {
    document.getElementById("boton").innerHTML = "Ordenar por: Mayor precio";
    result = array.sort(function (a, b) {
      if (a.cost > b.cost) {
        return -1;
      }
      if (a.cost < b.cost) {
        return 1;
      }
      return 0;
    });
  } else if (criteria === ORDER_BY_RELEVANCE) {
    document.getElementById("boton").innerHTML = "Ordenar por: Relevancia";
    result = array.sort(function (a, b) {
      let aCount = parseInt(a.soldCount);
      let bCount = parseInt(b.soldCount);

      if (aCount > bCount) {
        return -1;
      }
      if (aCount < bCount) {
        return 1;
      }
      return 0;
    });
  }

  return result;
}

//--------------------------> De aquí en adelante es la funcion de insertar los objetos del JSON

//Funcion que itera los objetos del JSON para crear el div correspondiente al listado

function showProductsList(array) {
  let htmlContentToAppend = "";
  for (product of array) {
    if (
      (contadorMin == undefined ||
        (contadorMin != undefined && parseInt(product.cost) >= contadorMin)) &&
      (contadorMax == undefined ||
        (contadorMax != undefined && parseInt(product.cost) <= contadorMax))
    ) {
      htmlContentToAppend +=
        `
        <div class="list-group-item list-group-item-action">
            <div class="row">
                <div class="col-3">
                    <img src="` +
        product.imgSrc +
        `" alt="` +
        product.description +
        `" class="img-thumbnail">
                </div>
                <div class="col">
                    <div class="d-flex w-100 justify-content-between">
                        <h2 class="mb-1">` +
        product.name +
        `</h2>
                        <small class="h4"><small class="font-weight-light h4 ">` +
        product.currency +
        `</small>` +
        ` ` +
        `<small class="font-weight-bold h4">` +
        product.cost +
        `</small></small>
                    </div><br>
                    <div class="d-flex w-100 justify-content-between">
                    <p class="mb-1">` +
        product.description +
        `</p>
                    <small class="text-muted">` +
        product.soldCount +
        ` vendidos</small>
                    </div>

                </div>
            </div>
        </div>
        `;
    }
    document.getElementById("productos").innerHTML = htmlContentToAppend;
  }
  hideSpinner();
}

function sortAndShowProducts(sortCriteria, productsArray) {
  currentSortCriteria = sortCriteria;

  if (productsArray != undefined) {
    currentProductsArray = productsArray;
  }

  currentProductsArray = sortProducts(
    currentSortCriteria,
    currentProductsArray
  );

  //Muestro los productos ordenados
  showProductsList(currentProductsArray);
}

function filtro() {
  let busqueda = document.getElementById("search").value;

  filteredProducts = currentProductsArray.filter((product) => {
    return product.name.toLowerCase().indexOf(busqueda.toLowerCase()) > -1;
  });
  showProductsList(filteredProducts);
}

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {
  showSpinner();
  getJSONData(PRODUCTS_URL).then(function (resultObj) {
    if (resultObj.status === "ok") {
      currentProductsArray = resultObj.data;
      //Muestro las productos ordenados
      showProductsList(currentProductsArray);
    }
  });

  document.getElementById("search").addEventListener("keyup", () => {
    filtro();
  });

  document.getElementById("search").addEventListener("mouseover", () => {
    filtro();
  });

  document.getElementById("sortAsc").addEventListener("click", function () {
    sortAndShowProducts(ORDER_ASC_BY_PRICE);
  });

  document.getElementById("sortDesc").addEventListener("click", function () {
    sortAndShowProducts(ORDER_DESC_BY_PRICE);
  });

  document.getElementById("sortByRel").addEventListener("click", function () {
    sortAndShowProducts(ORDER_BY_RELEVANCE);
  });

  document
    .getElementById("clearRangeFilter")
    .addEventListener("click", function () {
      document.getElementById("rangeFilterCountMin").value = "";
      document.getElementById("rangeFilterCountMax").value = "";
      document.getElementById("search").value = "";

      contadorMin = undefined;
      contadorMax = undefined;
      currentSortCriteria = undefined;
      document.getElementById("boton").innerHTML = "Ordenar por:";

      getJSONData(PRODUCTS_URL).then(function (resultObj) {
        if (resultObj.status === "ok") {
          currentProductsArray = resultObj.data;
          //Muestro las productos ordenados
          showProductsList(currentProductsArray);
        }
      });
    });

  document
    .getElementById("rangeFilterCount")
    .addEventListener("click", function () {
      //Obtengo el mínimo y máximo de los intervalos para filtrar por precio
      //de producto.
      contadorMin = document.getElementById("rangeFilterCountMin").value;
      contadorMax = document.getElementById("rangeFilterCountMax").value;

      if (
        contadorMin != undefined &&
        contadorMin != "" &&
        parseInt(contadorMin) >= 0
      ) {
        contadorMin = parseInt(contadorMin);
      } else {
        contadorMin = undefined;
      }

      if (
        contadorMax != undefined &&
        contadorMax != "" &&
        parseInt(contadorMax) >= 0
      ) {
        contadorMax = parseInt(contadorMax);
      } else {
        contadorMax = undefined;
      }

      showProductsList(currentProductsArray);
    });
});
