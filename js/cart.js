let itemsArray = [];
let subTotal = 0;
let total = 0;
let costoEnvio = 0;
let unitCost = 0;
let moneda = "";
let usuario = JSON.parse(localStorage.getItem("usuario"));

function insertProducts(array) {
  let htmlContentToAppend = "";
  let htmlContentToAppend2 = "";

  for (let i = 0; i < array.length; i++) {
    let item = array[i];

    htmlContentToAppend +=
      `
      <div class="row w-100 border-bottom">
        <div class="row main align-items-center justify-content-between">
          <div class="col justify-content-center"><img class="img-fluid img-thumbnail" style="max-height: 110px;" src="` +
      item.src +
      `"></div>
            <div class="col justify-content-center" style="text-align: center;">` +
      item.name +
      `</div>                      
            <div class="col"><div class="row input-group mb-3">
              <button class="input-group-text" style="max-width: 40px;" id="` +
      item.name +
      `R" onclick="update('cant${i}','resta');"><i class="bi bi-dash-lg"></i></button>
              <input type="number" style="text-align:center; max-width: 100px;" class="form-control" value="` +
      item.count +
      `" id="cant${i}" onchange="update('cant${i}',);" readonly min="0">
              <button class="input-group-text" style="max-width: 40px;" id="` +
      item.name +
      `S" onclick="update('cant${i}','suma');"><i class="bi bi-plus-lg"></i></button>
      
              </div></div>
            <div class="col">
              <div class="row justify-content-end">Precio por unidad:<br>
              <b><span id="currencycant${i}">` +
      item.currency +
      `</span> <span class="cant${i}unitCost">` +
      item.unitCost +
      `</span></b></div>
            </div><button class="input-group-text" style="max-width: 40px;" onclick="eliminar(${i});"><i class="bi bi-trash"></i></button>
        </div>
      </div>     
    `;

    htmlContentToAppend2 +=
      //nombre cantidad y subtotal en adenda
      `<div class="row w-100">
    <div class="col" style="padding-left: 0; width: min-content;">
      <div class="row"><p class="text-muted" style="font-size: 15px;">` +
      item.name +
      `</p></div>
      </div>
    <div
    class="col"
    style="text-align: right; max-width: min-content"
    >
    <p class="text-muted cant${i}" style="font-size: 15px; width: min-content;">x` +
      item.count +
      `</p>
    </div>
    <div class="col-4">
    <p class="text-muted" style="font-size: 15px; text-align: right;"><span id="cambiarCurrencycant${i}">` +
      item.currency +
      `</span> <span class="cant${i}subTotal">` +
      item.count * item.unitCost +
      `</span></p>
    </div>
    </div>
      `;
  }
  document.getElementById("itemsCarrito").innerHTML = htmlContentToAppend;
  document.getElementById("adenda").innerHTML = htmlContentToAppend2;
}

function update(id, action) {
  let cantidad = document.getElementById(id).valueAsNumber;
  document.getElementsByName("tipoMoneda").forEach((input) => {
    if (input.checked == true) {
      moneda = input.id;
    }
  });

  if (action == "suma") {
    cantidad++;
  } else if (action == "resta" && cantidad > 0) {
    cantidad--;
  } else if (action != null) {
    Swal.fire({
      icon: "error",
      title: "?",
      text: "No podes poner cantidades negativas, a menos que nos quieras regalar el artículo",
    });
  }

  if (moneda == "UYU") {
    if (document.getElementById("currency" + id).innerHTML == "USD") {
      unitCost = parseInt(
        document.getElementsByClassName(id + "unitCost")[0].innerHTML
      );
      unitCost = unitCost * 40;
      document.getElementById("cambiarCurrency" + id).innerHTML = "UYU";
    } else if (
      (document.getElementById("cambiarCurrency" + id).innerHTML = "USD")
    ) {
      unitCost = parseInt(
        document.getElementsByClassName(id + "unitCost")[0].innerHTML
      );

      document.getElementById("cambiarCurrency" + id).innerHTML = "UYU";
    } else {
      unitCost = parseInt(
        document.getElementsByClassName(id + "unitCost")[0].innerHTML
      );
    }
  } else if (moneda == "USD") {
    if (document.getElementById("currency" + id).innerHTML == "UYU") {
      unitCost = parseInt(
        document.getElementsByClassName(id + "unitCost")[0].innerHTML
      );
      unitCost = unitCost / 40;
      document.getElementById("cambiarCurrency" + id).innerHTML = "USD";
    } else if (
      document.getElementById("cambiarCurrency" + id).innerHTML == "UYU"
    ) {
      unitCost = parseInt(
        document.getElementsByClassName(id + "unitCost")[0].innerHTML
      );
      document.getElementById("cambiarCurrency" + id).innerHTML = "USD";
    } else {
      unitCost = parseInt(
        document.getElementsByClassName(id + "unitCost")[0].innerHTML
      );
    }
  }
  document.getElementById(id).value = cantidad;
  document.getElementsByClassName(id)[0].innerHTML = "x" + cantidad;
  document.getElementsByClassName(id + "subTotal")[0].innerHTML =
    ` ` + cantidad * unitCost;
  adenda();
}

function updateMoneda() {
  let array = [];
  for (let i = 0; i < itemsArray.length; i++) {
    array.push("cant" + i);
  }
  for (id of array) {
    update(id);
  }
  adenda();
}

function tipoDeEnvio() {
  switch (parseInt(document.getElementById("inputGroupSelect01").value)) {
    case 1:
      document.getElementById("tipoEnvio").innerHTML =
        "Costo del 5% sobre el subtotal.";
      costoEnvio = 0.05;
      break;

    case 2:
      document.getElementById("tipoEnvio").innerHTML =
        "Costo del 7% sobre el subtotal.";
      costoEnvio = 0.07;
      break;

    case 3:
      document.getElementById("tipoEnvio").innerHTML =
        "Costo del 15% sobre el subtotal.";
      costoEnvio = 0.15;
      break;

    default:
      break;
  }

  adenda();

  if (usuario.direccion != null && usuario.cp != null && usuario.pais != null) {
    document.getElementById("datosEnvio").innerHTML = `
    <p class="row">Direccion de envío: ${usuario.direccion}, ${usuario.cp}, ${usuario.pais}</p>
    `;
  } else {
    document.getElementById(
      "datosEnvio"
    ).innerHTML = `<div class="alert-danger" style="text-align: center;">Por favor actualice su perfil<a href="" data-toggle="modal" data-target="#actDatos">aquí</a>para poder continuar con la compra</div>`;
  }
}

function adenda() {
  subTotal = 0;
  for (let i = 0; i < itemsArray.length; i++) {
    subTotal += parseFloat(
      document.getElementsByClassName("cant" + i + "subTotal")[0].innerText
    );
  }
  subTotalPorCostoEnvio = subTotal * costoEnvio;
  document.getElementById("adendaFinal").innerHTML =
    `
  <div class="row w-100">
    <div class="col" style="padding-left: 0; width: min-content;">
      <div class="row"><p class="text-muted" style="font-size: 15px;">Subtotal:</p></div>
      </div>
    <div
    class="col"
    style="text-align: right; max-width: min-content"
    >
    <p class="text-muted" style="font-size: 15px; width: min-content;">` +
    moneda +
    `</p>
    </div>
    <div class="col-4">
    <p class="text-muted" style="font-size: 15px; text-align: right;"><span>` +
    subTotal +
    `</span></p>
    </div>
    </div>

    <div class="row w-100">
    <div class="col" style="padding-left: 0; width: min-content;">
      <div class="row"><p class="text-muted" style="font-size: 15px;">Costo del envío:</p></div>
      </div>
    <div
    class="col"
    style="text-align: right; max-width: min-content"
    >
    <p class="text-muted" style="font-size: 15px; width: min-content;">` +
    moneda +
    `</p>
    </div>
    <div class="col-4">
    <p class="text-muted" style="font-size: 15px; text-align: right;"><span>` +
    subTotalPorCostoEnvio.toFixed(2) +
    `</span></p>
    </div>
    </div>
  `;
  total = subTotalPorCostoEnvio + subTotal;
  document.getElementById("totalPrice").innerHTML =
    `<b>` + moneda + " " + total.toFixed(2);
  +`</b>`;

  if (
    document.getElementById("code").value == "david" ||
    document.getElementById("code").value == "David"
  ) {
    document.getElementById("total").innerHTML =
      `
      <div class="row w-100">
      <div class="col">Descuento del 80%</div>
      <div class="col text-right"><b>` +
      moneda +
      " -" +
      (total * 0.8).toFixed(2) +
      `</b></div>
      </div><br>
      <div class="row w-100">
      <div class="col">TOTAL PRICE</div>
      <div class="col text-right" id="totalPrice"><b>` +
      moneda +
      " " +
      (total.toFixed(2) - total.toFixed(2) * 0.8).toFixed(2) +
      `</b></div>
      </div>
      `;
  }
}

function formaDePago() {
  let formaDePago = document.getElementById("metodopago").value;

  if (formaDePago == "1") {
    document.getElementById("formaDePago").innerHTML = `
    <p class="row">Ud. ha elegido tarjeta de crédito/débito</p>
    <p class="row">Últimos 4 dígitos: **** **** **** ${document
      .getElementById("cc-number")
      .value.substr(12)}</p>    
    `;
  } else if (formaDePago == "2") {
    document.getElementById("formaDePago").innerHTML = `
    <p class="row">Ud. ha elegido transferencia bancaria</p>`;
  }
}

document.getElementById("checkout").addEventListener("click", (evt) => {
  evt.preventDefault();
  checkout();
});

function checkout() {
  if (
    document.getElementById("inputGroupSelect01").value == "Tipo de envío..."
  ) {
    Swal.fire({
      icon: "error",
      title: "Tipo de envío",
      text: "Debe seleccionar un tipo de envío para poder continuar",
    });
  } else if (document.getElementById("formaDePago").innerHTML == "") {
    Swal.fire({
      icon: "error",
      title: "Forma de Pago",
      text: "Debe seleccionar un método de pago",
    });
  } else {
    Swal.fire({
      icon: "success",
      title: "Comprado",
      text: "Gracias por preferirnos!",
    });
  }
}

document.getElementById("formaDePagoBTN").addEventListener("click", (evt) => {
  evt.preventDefault();
});

function metodoPago() {
  let select = document.getElementById("metodopago").value;
  if (select == "1") {
    document.getElementById("paypal").hidden = true;
    document.getElementById("tarjeta").hidden = false;
  } else if (select == "2") {
    document.getElementById("paypal").hidden = false;
    document.getElementById("tarjeta").hidden = true;
  }
}

function discountCode() {
  if (
    document.getElementById("code").value == "david" ||
    document.getElementById("code").value == "David"
  ) {
    Swal.fire({
      icon: "success",
      title: "¡FELICIDADES!",
      text: "Ud. ha sido beneficiado con el descuento del nombre prohibido",
      footer: "No le diga nada al profe",
      background: "#eee",
      backdrop: `
    rgba(255,255,255,0.4)
    url(https://acegif.com/wp-content/gif/confetti-25.gif)
    center

  `,
      showClass: {
        popup: "animate__animated animate__fadeInDown",
      },
      hideClass: {
        popup: "animate__animated animate__fadeOutUp",
      },
    });

    document.getElementById("total").innerHTML =
      `
    <div class="row w-100">
    <div class="col">Descuento del 80%</div>
    <div class="col text-right"><b>` +
      moneda +
      " -" +
      (total * 0.8).toFixed(2) +
      `</b></div>
    </div><br>
    <div class="row w-100">
    <div class="col">TOTAL PRICE</div>
    <div class="col text-right" id="totalPrice"><b>` +
      moneda +
      " " +
      (total.toFixed(2) - total.toFixed(2) * 0.8).toFixed(2) +
      `</b></div>
    </div>
    `;
  }
}

function eliminar(posicion) {
  const removed = itemsArray.splice(posicion, 1);
  localStorage.setItem("carrito", JSON.stringify(itemsArray));
  insertProducts(itemsArray);
  adenda();
}

document.getElementById("guardarCambios").addEventListener("click", () => {
  //DIRECCION
  if (document.getElementById("Direccion").value != "") {
    usuario.direccion = document.getElementById("Direccion").value;
    document.getElementById("Direccion").style = "";
  } else {
    document.getElementById("Direccion").style = "background-color: red;";
  }
  //CODIGO POSTAL
  if (document.getElementById("CP").value != "") {
    usuario.cp = document.getElementById("CP").value;
    document.getElementById("CP").style = "";
  } else {
    document.getElementById("CP").style = "background-color: red;";
  }
  if (document.getElementById("Pais").value != "Elegir") {
    usuario.pais = document.getElementById("Pais").value;
    document.getElementById("Pais").style = "";
  } else {
    document.getElementById("Pais").style = "background-color: red;";
  }
  localStorage.setItem("usuario", JSON.stringify(usuario));
  tipoDeEnvio();
})

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {
  getJSONData(CART_INFO_URL).then(function (resultObj) {
    if (resultObj.status === "ok" && localStorage.getItem("carrito") == null) {
      localStorage.setItem("carrito", JSON.stringify(resultObj.data.articles));
    }

    itemsArray = JSON.parse(localStorage.getItem("carrito"));
    insertProducts(itemsArray);
    updateMoneda();
  });
});
