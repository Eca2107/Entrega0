let usuario = JSON.parse(localStorage.getItem("usuario"));
let uploadField = document.getElementById("imgupload");

function stars(numStars) {
  let stars = "";
  for (let i = 1; i <= 5; i++) {
    if (i <= numStars) {
      stars += ` <p class="fa fa-star checked"></p> `;
    } else {
      stars += ` <p class="fa fa-star"></p> `;
    }
  }
  return stars;
}

uploadField.onchange = function () {
  if (this.files[0].size > 1048576) {
    Swal.fire({
      icon: "error",
      title: "No se puede un archivo tan grande",
      text: "Parece que tu archivo es tan grande como el gran Club Nacional de Football, no podemos soportar tanta grandeza",
    });
    this.value = "";

  }
};

function readFile() {
  if (this.files && this.files[0]) {
    var FR = new FileReader();

    FR.addEventListener("load", function (e) {
      document.getElementById("profilePicture").src = e.target.result;
    });

    FR.readAsDataURL(this.files[0]);
  }
}

document.getElementById("imgupload").addEventListener("change", readFile);

function cargarDatos() {
  let comentarios = JSON.parse(localStorage.getItem("comments"))

  if (usuario.username != null) {
    document.getElementById("username").innerHTML = usuario.username;
  }
  if (usuario.img != null) {
    document.getElementById("profilePicture").src = usuario.img;
  }
  if (usuario.nombre != null) {
    document.getElementById("nombre").innerHTML = ` ` + usuario.nombre;
    document.getElementById("Nombre").style = "display: none;";
  }
  if (usuario.apellido != null) {
    document.getElementById("apellido").innerHTML = ` ` + usuario.apellido;
    document.getElementById("Apellido").style = "display: none;";
  }
  if (usuario.email != null) {
    document.getElementById("email").innerHTML = ` ` + usuario.email;
    document.getElementById("Email").style = "display: none;";
  }
  if (usuario.edad != null) {
    document.getElementById("edad").innerHTML = ` ` + usuario.edad;
    document.getElementById("Edad").style = "display: none;";
  }
  if (usuario.direccion != null) {
    document.getElementById("direccion").innerHTML = ` ` + usuario.direccion;
    document.getElementById("Direccion").style = "display: none;";
  }
  if (usuario.cp != null) {
    document.getElementById("cp").innerHTML = ` ` + usuario.cp;
    document.getElementById("CP").style = "display: none;";
  }
  if (usuario.celular != null) {
    document.getElementById("celular").innerHTML = ` ` + usuario.celular;
    document.getElementById("Celular").style = "display: none;";
  }
  if (usuario.pais != null) {
    document.getElementById("Pais").value = usuario.pais;
    document.getElementById("Pais").style = "display: none;";
    pais();
  }
  if(usuario.comment != null){
    
    comentarios.forEach(user => {
      if(user.user == usuario.username){
        document.getElementById("comentario").innerHTML = `
        
    <div class="container" onclick="location.href = 'product-info.html';">
    <div class="row justify-content-between"><span><h6><b>` +
        user.user +
        `:</b></h6>` +
        stars(user.score) +
        `</span><span class="text-muted font-weight-light">` +
        user.dateTime +
        `</span>
    </div>    
    <div class="row justify-content-center" style="padding: 3%; word-break: break-word;">
    ` +
        user.description +
        `
    </div>
    <hr>
    </div>`
      }      
    });
  }
  else{
    document.getElementById("comentario").innerHTML = `
    <div class="alert-danger text-center">Parece no has realizado ningún comentario.</div>
    `
  }
}

function guardar() {
  let sePuede = true;
  let sePuede1 = true;
  let inputs = document.getElementsByTagName("input");
  for (item of inputs) {
    if (item.value == "" && item.type != "file") {
      sePuede = false;
    }
  }
  let spans = document.getElementsByTagName("span");
  for (item of spans) {
    if (item.innerText == "") {
      sePuede1 = false;
    }
  }
  if (sePuede == true || sePuede1 == true) {
    usuario.img = document.getElementById("profilePicture").src;
    //NOMBRE
    if (document.getElementById("Nombre").value != "") {
      usuario.nombre = document.getElementById("Nombre").value;
    } else {
      document.getElementById("Nombre").style = "background-color: red;";
    }
    //APELLIDO
    if (document.getElementById("Apellido").value != "") {
      usuario.apellido = document.getElementById("Apellido").value;
    } else {
      document.getElementById("Apellido").style = "background-color: red;";
    }
    //EMAIL
    if (document.getElementById("Email").value != "") {
      usuario.email = document.getElementById("Email").value;
    } else {
      document.getElementById("Email").style = "background-color: red;";
    }
    //EDAD
    if (document.getElementById("Edad").value != "") {
      usuario.edad = document.getElementById("Edad").value;
    } else {
      document.getElementById("Edad").style = "background-color: red;";
    }
    //DIRECCION
    if (document.getElementById("Direccion").value != "") {
      usuario.direccion = document.getElementById("Direccion").value;
    } else {
      document.getElementById("Direccion").style = "background-color: red;";
    }
    //CODIGO POSTAL
    if (document.getElementById("CP").value != "") {
      usuario.cp = document.getElementById("CP").value;
    } else {
      document.getElementById("CP").style = "background-color: red;";
    }
    //CELULAR
    if (document.getElementById("Celular").value != "") {
      usuario.celular = document.getElementById("Celular").value;
    } else {
      document.getElementById("Celular").style = "background-color: red;";
    }
    //PAIS
    if (document.getElementById("Pais").value != "Elegir") {
      usuario.pais = document.getElementById("Pais").value;
      document.getElementById("Pais").style = "";
    } else {
      document.getElementById("Pais").style = "background-color: red;";
    }

    localStorage.setItem("usuario", JSON.stringify(usuario));
    cargarDatos();

    document.getElementById("guardar").style = "display: none;";
    document.getElementById("cancelar").style = "display: none;";

    for (item of inputs) {
      item.style = "display: none;";
    }

    document.getElementById("Pais").style = "display: none;";
    document.getElementById("modificar").style = "display: auto;";
    document.getElementById("imgupload").disabled = "true";
    document.getElementById("instruccion").style = "display: none;";
    Swal.fire({
      icon: "success",
      title: "Te recordaremos por siempre",
      text: "No, no es que hayas muerto, es que te vamos a tener guardado hasta que decidas borrar el localStorage :D",
    });
  } else {
    if (
      document.getElementById("Nombre").value == "" &&
      document.getElementById("nombre").innerText == ""
    ) {
      document.getElementById("Nombre").style = "background-color: red;";
    } else {
      document.getElementById("Nombre").style = "";
    }
    if (
      document.getElementById("Apellido").value == "" &&
      document.getElementById("apellido").innerText == ""
    ) {
      document.getElementById("Apellido").style = "background-color: red;";
    } else {
      document.getElementById("Apellido").style = "";
    }
    if (
      document.getElementById("Email").value == "" &&
      document.getElementById("email").innerText == ""
    ) {
      document.getElementById("Email").style = "background-color: red;";
    } else {
      document.getElementById("Email").style = "";
    }
    if (
      document.getElementById("Edad").value == "" &&
      document.getElementById("edad").innerText == ""
    ) {
      document.getElementById("Edad").style = "background-color: red;";
    } else {
      document.getElementById("Edad").style = "";
    }
    if (
      document.getElementById("Direccion").value == "" &&
      document.getElementById("direccion").innerText == ""
    ) {
      document.getElementById("Direccion").style = "background-color: red;";
    } else {
      document.getElementById("Direccion").style = "";
    }
    if (
      document.getElementById("CP").value == "" &&
      document.getElementById("cp").innerText == ""
    ) {
      document.getElementById("CP").style = "background-color: red;";
    } else {
      document.getElementById("CP").style = "";
    }
    if (
      document.getElementById("Celular").value == "" &&
      document.getElementById("celular").innerText == ""
    ) {
      document.getElementById("Celular").style = "background-color: red;";
    } else {
      document.getElementById("Celular").style = "";
    }
    if (
      document.getElementById("Pais").value == "Elegir" &&
      document.getElementById("pais").innerText == ""
    ) {
      document.getElementById("Pais").style = "background-color: red;";
    } else {
      document.getElementById("Pais").style = "";
    }

    Swal.fire({
      icon: "error",
      title: "No pode...",
      text: "No podé guardar hasta que no completes todos los campos...",
    });
  }
  console.log("hola")
}

function modificarDatos() {
  document.getElementById("modificar").style = "display: none;";
  document.getElementById("guardar").style = "display: auto;";
  document.getElementById("cancelar").style = "display: auto;";
  document.getElementById("imgupload").disabled = "";

  let inputs = document.getElementsByTagName("input");
  for (item of inputs) {
    item.value = "";
    item.style = "display: auto;";
  }

  document.getElementById("Pais").style = "display: auto;";
  document.getElementById("instruccion").style = "display: auto;";
}

function cancelar() {
  let inputs = document.getElementsByTagName("input");
  for (item of inputs) {
    item.value = "";
    item.style = "display: none;";
  }
  document.getElementById("modificar").style = "display: auto;";
  document.getElementById("guardar").style = "display: none;";
  document.getElementById("cancelar").style = "display: none;";
  document.getElementById("Pais").style = "display: none;";
  document.getElementById("imgupload").disabled = "true";
  document.getElementById("instruccion").style = "display: none;";
}

function pais() {
  let pais = document.getElementById("Pais").value;
  switch (pais) {
    case "Uruguay":
      document.getElementById(
        "pais"
      ).innerHTML = `<img src="img/Flag-of-Uruguay-32.png" style="float: center;"> Uruguay`;
      break;
    case "Andorra":
      document.getElementById(
        "pais"
      ).innerHTML = `<img src="img/Flag-of-Andorra-32.png" style="float: center;"> Andorra`;
      break;
    case "Argentina":
      document.getElementById(
        "pais"
      ).innerHTML = `<img src="img/Flag-of-Argentina-32.png" style="float: center;"> Argentina`;
      break;
    case "Bolivia":
      document.getElementById(
        "pais"
      ).innerHTML = `<img src="img/Flag-of-Bolivia-32.png" style="float: center;"> Bolivia`;
      break;
    case "Brasil":
      document.getElementById(
        "pais"
      ).innerHTML = `<img src="img/Flag-of-Brazil-32.png" style="float: center;"> Brasil`;
      break;
    case "Chile":
      document.getElementById(
        "pais"
      ).innerHTML = `<img src="img/Flag-of-Chile-32.png" style="float: center;"> Chile`;
      break;
    case "Colombia":
      document.getElementById(
        "pais"
      ).innerHTML = `<img src="img/Flag-of-Colombia-32.png" style="float: center;"> Colombia`;
      break;
    case "Ecuador":
      document.getElementById(
        "pais"
      ).innerHTML = `<img src="img/Flag-of-Ecuador-32.png" style="float: center;"> Ecuador`;
      break;
    case "España":
      document.getElementById(
        "pais"
      ).innerHTML = `<img src="img/Flag-of-Spain-32.png" style="float: center;"> España`;
      break;
    case "México":
      document.getElementById(
        "pais"
      ).innerHTML = `<img src="img/Flag-of-Mexico-32.png" style="float: center;"> México `;
      break;
    case "Paraguay":
      document.getElementById(
        "pais"
      ).innerHTML = `<img src="img/Paraguay-32.png" style="float: center;"> Paraguay`;
      break;
    case "Perú":
      document.getElementById(
        "pais"
      ).innerHTML = `<img src="img/Flag-of-Peru-32.png" style="float: center;"> Perú`;
      break;
    case "Venezuela":
      document.getElementById(
        "pais"
      ).innerHTML = `<img src="img/Flag-of-Venezuela-32.png" style="float: center;"> Venezuela`;
      break;

    default:
      break;
  }
}

document.addEventListener("keypress", (event) => {
  if (event.key == "Enter") {
    guardar();
  }
  else if(event.key === "Escape"){
    cancelar();
  }
});

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {
  let completo = true;
  let spans = document.getElementsByTagName("span");

  cargarDatos();
  
  for (item of spans) {
    if (item.innerText == "") {
      completo = false;
    }
  }
  if (completo == false) {
    document.getElementById("modificar").style = "display: none";
    document.getElementById("cancelar").style = "display: none";
  } else {
    document.getElementById("modificar").style = "display: auto";
    document.getElementById("guardar").style = "display: none";
    document.getElementById("cancelar").style = "display: none";
  }
});
