let productInfo = [];
let productsArray = [];
let comments = [];
let usuario = JSON.parse(localStorage.getItem("usuario"));

function showImagesGallery(array) {
  let htmlContentToAppend = "";

  htmlContentToAppend +=
    `
      <div id="carouselExampleCaptions" class="carousel slide carousel-fade" style="width: 80%" data-ride="carousel" data-keyboard="true" data-touch="true">
      <ol class="carousel-indicators">
        <li data-target="#carouselExampleCaptions" data-slide-to="0" class="active"></li>
        <li data-target="#carouselExampleCaptions" data-slide-to="1"></li>
        <li data-target="#carouselExampleCaptions" data-slide-to="2"></li>
        <li data-target="#carouselExampleCaptions" data-slide-to="3"></li>
        <li data-target="#carouselExampleCaptions" data-slide-to="4"></li>
      </ol>
      <div class="carousel-inner">
        <div class="carousel-item active">
          <img src="` +
    array[0] +
    `" class="d-block w-100" alt="...">
          <div class="carousel-caption d-none d-md-block">
            <h4><span style="background-color: rgba(0,0,0,0.1);"> Nuevo Chevrolet Onix Joy </span></h4>
            <p><span style="background-color: rgba(0,0,0,0.1);">- Generación 2019 -</span></p>
          </div>
        </div>
        <div class="carousel-item">
          <img src="` +
    array[1] +
    `" class="d-block w-100" alt="...">
          <div class="carousel-caption d-none d-md-block">
            <h4><span style="background-color: rgba(0,0,0,0.1);"> Ideal para ciudad </span></h4>
            <p><span style="background-color: rgba(0,0,0,0.1);">- Con motor 1.0, un consumo bajo y eficiente -</span></p>
          </div>
        </div>
        <div class="carousel-item">
          <img src="` +
    array[4] +
    `" class="d-block w-100" alt="...">
          <div class="carousel-caption d-none d-md-block">
            <h4><span style="background-color: rgba(0,0,0,0.1);"> Nuevo diseño </span></h4>
            <p><span style="background-color: rgba(0,0,0,0.1);">- Moderno y característico, de gran calidad y la más nueva tecnología -</span></p>
          </div>
        </div>
        <div class="carousel-item">
          <img src="` +
    array[2] +
    `" class="d-block w-100" alt="...">
          <div class="carousel-caption d-none d-md-block">
            <h4><span style="background-color: rgba(0,0,0,0.1);"> Espacioso </span></h4>
            <p><span style="background-color: rgba(0,0,0,0.1);">- Gran capacidad de baúl de 280 litros -</span></p>
          </div>
        </div>
        <div class="carousel-item">
          <img src="` +
    array[3] +
    `" class="d-block w-100" alt="...">
          <div class="carousel-caption d-none d-md-block">
            <h4><span style="background-color: rgba(0,0,0,0.1);"> Variedad de colores </span></h4>
            <p><span style="background-color: rgba(0,0,0,0.1);">- Disponemos de variedad de colores para que elija -</span></p>
          </div>
        </div>
      </div>
      <a class="carousel-control-prev" href="#carouselExampleCaptions" role="button" data-slide="prev">
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="sr-only">Previous</span>
      </a>
      <a class="carousel-control-next" href="#carouselExampleCaptions" role="button" data-slide="next">
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="sr-only">Next</span>
      </a>
    </div>
   `;

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

document.getElementById("cancelar").addEventListener("click", () => {
  document.getElementById("commentTextArea").value = "";
  document.getElementsByName("star").forEach((estrella) => {
    if (estrella.checked == true) {
      estrella.checked = false;
    }
  });
});


document.getElementById("enviar").addEventListener("click", () => {
  let htmlContentToAppend = "";
  let comentarioEnviado = document.getElementById("commentTextArea").value;
  let star = document.getElementsByName("star");
  let puntuacion = undefined;
  let date = new Date();
  let fecha =
    date.getFullYear() +
    "-" +
    (date.getMonth() + 1) +
    "-" +
    date.getDate() +
    " " +
    date.getHours() +
    ":" +
    date.getMinutes() +
    ":" +
    date.getSeconds();

  for (score of star) {
    if (score.checked == true) {
      puntuacion = score.value;
    }
  }

  if (comentarioEnviado == "") {
    // este codigo esta lleno de CHICHES :D
    Swal.fire({
      icon: "error",
      title: "Hojaldre",
      text: "La reseña a enviar no puede estar vacía",
    });
  } else if (usuario.comment == "comento") {
    Swal.fire({
      icon: "error",
      title: "No te haga el vivo",
      text: "Solo se puede enviar una reseña por usuario, queres poner otra, comprate otro auto.",
    });
  } else {
    Swal.fire({
      title: "¿Estás seguro pa?",
      text: "Mirá que no vas a poder borrarlo después",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sin miedo al éxito",
      cancelButtonText: "Con miedo al éxito",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(
          "Posteado!",
          "Su reseña que a nadie le importa ha sido publicada con éxito",
          "success"
        );
        document
          .getElementById("commentTextArea")
          .classList.add(
            "animate__lightSpeedOutLeft",
            "animate__animated",
            "animate__delay-2s"
          );
        document
          .getElementById("enviar")
          .classList.add(
            "animate__lightSpeedOutLeft",
            "animate__animated",
            "animate__delay-2s"
          );
        document
          .getElementById("estrellitas")
          .classList.add(
            "animate__lightSpeedOutLeft",
            "animate__animated",
            "animate__delay-2s"
          );
        document
          .getElementById("reseña")
          .classList.add(
            "animate__lightSpeedOutLeft",
            "animate__animated",
            "animate__delay-2s"
          );
        document
          .getElementById("cancelar")
          .classList.add(
            "animate__lightSpeedOutLeft",
            "animate__animated",
            "animate__delay-2s"
          );

        htmlContentToAppend +=
          `
    <div class="container">
      <div class="row justify-content-between"><span><h6><b>` +
          usuario.nombre +
          `:</b></h6>` +
          stars(puntuacion) +
          `</span><span class="text-muted font-weight-light">` +
          fecha +
          `</span>
      </div>    
      <div class="row justify-content-center" style="padding: 3%; word-break: break-word;">
      ` +
          comentarioEnviado +
          `
      </div>
      <hr>
      </div>
    `;

        document
          .getElementById("productComment")
          .insertAdjacentHTML("beforeend", htmlContentToAppend);
        usuario.comment = "comento";
        comments.push({
          score: puntuacion,
          description: comentarioEnviado,
          user: usuario.nombre,
          dateTime: fecha,
        });
        localStorage.setItem("comments", JSON.stringify(comments));
        localStorage.setItem("usuario", JSON.stringify(usuario));
      }
    });
  }
});

function showComments(array) {
  let htmlContentToAppend = "";

  for (comment of array) {
    htmlContentToAppend +=
      `
    <div class="container">
    <div class="justify-content-between row"><span><h6><b>` +
      comment.user +
      `:</b></h6>` +
      stars(parseInt(comment.score)) +
      `</span> <span class="text-muted font-weight-light">` +
      comment.dateTime +
      `</span>
    </div>
    <div class="break" style="word-break: break-word;">
    <div class="row justify-content-center" style="padding: 3%;">
    ` +
      comment.description +
      `
    </div>
    </div>
    <hr>
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
      getJSONData(PRODUCTS_URL).then(function (resultObj) {
        let htmlContentToAppend = "";
        if (resultObj.status === "ok") {
          productsArray = resultObj.data;
        }
        for (product of productInfo.relatedProducts) {
          htmlContentToAppend +=
            `
            <div class="gallery" onclick="location.href = 'products.html';">
        <a target="_blank" href="products.html">
          <img src="` +
            productsArray[product].imgSrc +
            `">
        </a>
        <div class="desc"><h5><b>` +
            productsArray[product].name +
            `</b></h5></div>
            <div class="desc">` +
            productsArray[product].description +
            `</div>

      </div>
            `;
        }
        document.getElementById("relatedProducts").innerHTML =
          htmlContentToAppend;
      });

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
    if (
      resultObj.status === "ok" &&
      localStorage.getItem("comments") == undefined
    ) {
      localStorage.setItem("comments", JSON.stringify(resultObj.data));
    }
    comments = JSON.parse(localStorage.getItem("comments"));
    showComments(comments);
  });
});
