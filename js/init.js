const CATEGORIES_URL =
  "https://japdevdep.github.io/ecommerce-api/category/all.json";
const PUBLISH_PRODUCT_URL =
  "https://japdevdep.github.io/ecommerce-api/product/publish.json";
const CATEGORY_INFO_URL =
  "https://japdevdep.github.io/ecommerce-api/category/1234.json";
const PRODUCTS_URL =
  "https://japdevdep.github.io/ecommerce-api/product/all.json";
const PRODUCT_INFO_URL =
  "https://japdevdep.github.io/ecommerce-api/product/5678.json";
const PRODUCT_INFO_COMMENTS_URL =
  "https://japdevdep.github.io/ecommerce-api/product/5678-comments.json";
const CART_INFO_URL = "https://japdevdep.github.io/ecommerce-api/cart/654.json";
const CART_BUY_URL = "https://japdevdep.github.io/ecommerce-api/cart/buy.json";
var x = document.getElementById("topNav");
var y = document.getElementById("topNav1");

var showSpinner = function () {
  document.getElementById("spinner-wrapper").style.display = "block";
};

var hideSpinner = function () {
  document.getElementById("spinner-wrapper").style.display = "none";
};

var getJSONData = function (url) {
  var result = {};
  showSpinner();
  return fetch(url)
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw Error(response.statusText);
      }
    })
    .then(function (response) {
      result.status = "ok";
      result.data = response;
      hideSpinner();
      return result;
    })
    .catch(function (error) {
      result.status = "error";
      result.data = error;
      hideSpinner();
      return result;
    });
};

function signOut() {
  var auth2 = gapi.auth2.getAuthInstance();
  auth2.signOut().then(function () {});
}

function onLoad() {
  gapi.load("auth2", function () {
    gapi.auth2.init();
  });
}

function desconectar() {
  localStorage.clear();
  location.href = "login.html";
  signOut();
}

function responsive() {
  var x = document.getElementById("topNav");
  var y = document.getElementById("topNav1");
  if(window.innerWidth < 800){
  if (x.className === "site-header sticky-top bg-dark py-1"){
    x.className += " responsive";
    y.className = "container justify-content-between";
  }
  else{
    x.className = "site-header sticky-top bg-dark py-1";
  }
}

  
}

window.addEventListener("resize", () => {
  if (window.innerWidth < 800) {
    y.className = "container justify-content-between";
  } else {
    x.className = "site-header sticky-top bg-dark py-1";
    y.className = "container d-flex flex-column flex-md-row justify-content-between";
  }
});

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {
  let usuario = JSON.parse(localStorage.getItem("usuario"));
  if (usuario == null) {
    location.href = "login.html";
  } else {
    location.href = "#";
  }

  if (usuario.img != undefined) {
    document.getElementById("my-profile").innerHTML =
      `<img src="${usuario.img}" referrerpolicy="no-referrer" style="width: 25px;"> ` +
      ` ` +
      usuario.username;
  } else {
    document.getElementById("my-profile").innerHTML =
      `<i class="bi bi-person">  </i>` + usuario.username;
  }
  if(window.innerWidth < 800){
    y.className = "container justify-content-between";
  }
});
