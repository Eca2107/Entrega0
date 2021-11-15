const ORDER_ASC_BY_PRICE = "Menor precio";
const ORDER_DESC_BY_PRICE = "Mayor precio";
const ORDER_BY_RELEVANCE = "Relevancia";
let currentProductsArray = [];
let filteredProducts = [];
let currentSortCriteria = undefined;
let contadorMin = undefined;
let contadorMax = undefined;
let estiloMuestra = "";

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
  document.getElementsByName("estiloMuestra").forEach((element) => {
    if (element.checked == true) {
      estiloMuestra = element.id;
    }
  });

  for (let i = 0; i < array.length; i++) {
    let product = array[i];
    if (
      (contadorMin == undefined ||
        (contadorMin != undefined && parseInt(product.cost) >= contadorMin)) &&
      (contadorMax == undefined ||
        (contadorMax != undefined && parseInt(product.cost) <= contadorMax))
    ) {
      if (estiloMuestra == "lista" && window.innerWidth > 800) {
        htmlContentToAppend +=
          `
          
          
            <div class="row list-group-item list-group-item-action">
                <div class="col-3"   onclick="location.href = 'product-info.html'">
                    <img src="` +
          product.imgSrc +
          `" alt="` +
          product.description +
          `" class="img-thumbnail img-fluid">
                </div>
                <div class="col"   onclick="location.href = 'product-info.html'">
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
                    
                </div><button class="btn btn-outline-dark" style="float:right;" onclick="agregarCarrito(${i}")><i class="bi bi-cart"></i> Agregar al carrito</button>
            </div>
        
        
        `;
      } else if (estiloMuestra == "grilla") {
        htmlContentToAppend +=
          `
          <div class="col-md-4">
          <a href="product-info.html" class="list-group-item-action">
          <div class="card shadow-sm">
            <img src="` +
          product.imgSrc +
          `" class="img-thumbnail img-fluid">
            <div class="card-body">
            <h2 class="mb-1 text-center">` +
          product.name +
          `</h2> 
              <p class="card-text text-center">` +
          product.description +
          `</p>
              <div class="d-flex justify-content-between align-items-center">
                <div class="">
                <small class="h4"><small class="font-weight-light h4 ">` +
          product.currency +
          `</small>` +
          ` ` +
          `<small class="font-weight-bold h4">` +
          product.cost +
          `</small></small>
                </div>
                <small class="text-muted">` +
          product.soldCount +
          ` vendidos</small>
              </div>
            </div></a>
            <button class="btn btn-outline-dark" onclick=" agregarCarrito(${i})"><i class="bi bi-cart"></i> Agregar al carrito</button>
          </div>
        </div>
          `;
      } else {
        htmlContentToAppend = `<div class="alert-danger text-center"> NO SE PUEDE DESPLEGAR EN MODO LISTA DEBIDO AL TAMAÑO DE SU PANTALLA</div>`;
      }
    }
  }
  document.getElementById("productos").innerHTML = htmlContentToAppend;
  hideSpinner();
}

function agregarCarrito(id) {
  let carrito = [];
  let item = {};
  let pino = {
    name: "Pino de olor para el auto",
    unitCost: 100,
    count: 0,
    src: "img/tree1.jpg",
    currency: "UYU",
  };
  let hay = false;
  let hayPino = false;

  if (localStorage.getItem("carrito") == null) {
    item.name = currentProductsArray[id].name;
    item.count = 1;
    item.currency = currentProductsArray[id].currency;
    item.src = currentProductsArray[id].imgSrc;
    item.unitCost = currentProductsArray[id].cost;
    pino.count = 1;
    carrito.push(item);
    carrito.push(pino);
    localStorage.setItem("carrito", JSON.stringify(carrito));
  } else {
    carrito = JSON.parse(localStorage.getItem("carrito"));
    carrito.forEach((element) => {
      if (element.name == currentProductsArray[id].name) {
        hay = true;
        element.count += 1;
      } else if (element.name == "Pino de olor para el auto") {
        element.count += 1;
        hayPino = true;
      }
    });
    if (hay == false) {
      item.name = currentProductsArray[id].name;
      item.count = 1;
      item.currency = currentProductsArray[id].currency;
      item.src = currentProductsArray[id].imgSrc;
      item.unitCost = currentProductsArray[id].cost;
      carrito.push(item);
    }
    if (hayPino == false) {
      pino.count = 1;
      carrito.push(pino);
    }
    localStorage.setItem("carrito", JSON.stringify(carrito));
  }
  Swal.fire({
    icon: "success",
    title: "Listo",
    text: "El producto seleccionado ha sido agregado al carrito; por su compre le regalaremos un pinito de olor para su vehículo.",
  });
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
