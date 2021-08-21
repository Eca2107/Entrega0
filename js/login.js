// Función para al hacer click en el boton de iniciar sesión nativo a la página, verifique que todo esta correcto 
function verificar() {
  let user = document.getElementById("login-name");
  let pass = document.getElementById("login-pass");
  let alert = document.getElementById("alert");
  let usuario = {};

  if (user.value.trim() === "") {
      if (pass.value.trim() === "") {     //If para evaluar el caso en que ambos usuario y contraseña están vacíos.
        pass.classList.add("isInvalid");
      }
      else{                               //Else para asegurarme de que si el pass esta correcto, no quede en rojo.
        pass.classList.remove("isInvalid");
    }
    user.classList.add("isInvalid"); //Agregamos la clase IsInvalid que le da los detalles visuales de error.

    alert.innerHTML = "Por favor ingrese usuario y contraseña válidos."; //le ponemos el texto al cartelito
    alert.style.display = "block"; //Despliega el cartel de alerta
  } 

  else if(pass.value.trim() === ""){      //
    if (user.value.trim() === "") {
        user.classList.add("isInvalid");
      } 
    else{
        user.classList.remove("isInvalid");
    }
    pass.classList.add("isInvalid"); //Agregamos la clase que inventamos

    alert.innerHTML = "Por favor ingrese usuario y contraseña válidos."; //le ponemos el texto al cartelito
    alert.style.display = "block"; //chan! mostramos el cartelito
    
  }
  else {
    //Chequear si se marcó la casilla de "recordarme"
    usuario.nombre = user.value;
    usuario.estado = "conectado";
    //---------->
    localStorage.setItem("usuario", JSON.stringify(usuario)); //Guardo mi variable de objeto en Local Storage
    sessionStorage.setItem("usuario", JSON.stringify(usuario)); //Guardo mi variable de objeto en Session Storage
    location.href = "index.html";
  }

  
}

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {
    let usuario = JSON.parse( localStorage.getItem("usuario"));
    if (usuario.estado=='conectado'){
        location.href="index.html";
    }
});
