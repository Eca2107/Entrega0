let productInfo = [];
let comments = [];
let productsArray = [];

function showImagesGallery(array) {
  let htmlContentToAppend = "";

  for (img of array) {
    htmlContentToAppend +=
      `<div class="gallery" style="width: 19%;">
  <a target="_blank" href="` +
      img +
      `">
    <img src="` +
      img +
      `" class="img-fluid img-thumbnail zoom1">
  </a>
  </div>
        `;

    
  }
  document.getElementById("productImagesGallery").innerHTML =
      htmlContentToAppend;
}

function stars(numStars) {
  let stars = "";
  for (let i = 1; i <= 5; i++) {
    if (i <= numStars) {
      stars += ` <span class="fa fa-star checked"></span> `;
    } else {
      stars += ` <span class="fa fa-star"></span> `;
    }
  }
  return stars;
}

document.getElementById("enviar").addEventListener("click", () => {
  /*Swal.fire({
    title: 'Complete el captcha para continuar',
    html: '<div id="recaptcha"></div>',
    didOpen: () => {
      grecaptcha.render('recaptcha', {
        'sitekey': '6LdvplUUAAAAAK_Y5M_wR7s-UWuiSEdVrv8K-tCq'
      })
    },
    preConfirm: function () {
      if (grecaptcha.getResponse().length === 0) {
        Swal.showValidationMessage(`Verifique que es un humano`)
      }
    }
  })*/
  document
    .getElementById("commentTextArea")
    .classList.add("animate__lightSpeedOutRight", "animate__animated");
});

function showRelatedProducts() {
  let htmlContentToAppend = "";

  for (product of productInfo.relatedProducts) {
    htmlContentToAppend +=
      `
      <div class="gallery">
  <a target="_blank" href="products.html">
    <img src="` +
      productsArray[product].imgSrc +
      `">
  </a>
  <div class="desc">` +
      productsArray[product].name +
      `</div>
</div>
      `;
  }
  document.getElementById("relatedProducts").innerHTML = htmlContentToAppend;
}

function showComments(array) {
  let htmlContentToAppend = "";

  for (comment of array) {
    htmlContentToAppend +=
      `<div class="row " style="padding: 2%;">
      <div class="col">
          
          
              <h6 class="mb-1"><b>` +
      comment.user +
      `:</b></h6><div id="stars">` +
      stars(parseInt(comment.score)) +
      `</div>` +
      `` +
      `<div class="justify-content-end"
<small class="font-weight-light"></p>` +
      comment.dateTime +
      `</small></div>
          </div><br>
          <div class="d-flex w-100">
          <p class="mb-1" style="padding-left: 5%;">` +
      comment.description +
      `</p>
          
          </div>

      </div>
  </div>
  
            `;
  }
  document.getElementById("productComment").innerHTML = htmlContentToAppend;
}

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {
  getJSONData(PRODUCT_INFO_URL).then(function (resultObj) {
    if (resultObj.status === "ok") {
      productInfo = resultObj.data;

      let productNameHTML = document.getElementById("productName");
      let productDescriptionHTML =
        document.getElementById("productDescription");
      let productCostHTML = document.getElementById("productCost");
      let productCategoryHTML = document.getElementById("productCategory");

      productNameHTML.innerHTML =
        productInfo.name +
        ` <br><small class="text-muted font-weight-light h5"> ` +
        productInfo.soldCount +
        ` vendidos</small>`;
      productDescriptionHTML.innerHTML = productInfo.description;
      productCostHTML.innerHTML =
        `<h4> ` +
        productInfo.currency +
        ` <b> ` +
        productInfo.cost +
        `</b></h4>`;
      productCategoryHTML.innerHTML =
        ` <a href="category-info.html" style="color: black;"> ` +
        productInfo.category +
        `</a>`;

      //Muestro las imagenes en forma de galería
      showImagesGallery(productInfo.images);
    }
  });

  getJSONData(PRODUCT_INFO_COMMENTS_URL).then(function (resultObj) {
    if (resultObj.status === "ok") {
      comments = resultObj.data;
    }
    showComments(comments);
  });

  getJSONData(PRODUCTS_URL).then(function (resultObj) {
    if (resultObj.status === "ok") {
      productsArray = resultObj.data;
    }
    showRelatedProducts();
  });
});
