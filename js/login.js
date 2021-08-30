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
    user.classList.add("isInvalid");      //Agregamos la clase IsInvalid que le da los detalles visuales de error.

    alert.innerHTML = "Por favor ingrese usuario y contraseña válidos.";  //le ponemos el texto al cartel
    alert.style.display = "block";                                        //Despliega el cartel de alerta y lo deja block
  } 

  else if(pass.value.trim() === ""){      //If para las posibilidades con el pass vacío y el user en cualquiera de las otras dos
    if (user.value.trim() === "") {
        user.classList.add("isInvalid");
      } 
    else{                                 //Else para asegurarme de que si el user esta correcto, no quede en rojo.
        user.classList.remove("isInvalid");
    }
    pass.classList.add("isInvalid");      //Agregamos la clase IsInvalid que le da los detalles visuales de error.

    alert.innerHTML = "Por favor ingrese usuario y contraseña válidos."; //le ponemos el texto al cartel
    alert.style.display = "block"; //Desplegamos el cartel
    
  }
  else {
    //Más adelante voy a implementar un boton de recordarme, en este caso te recuerda siempre, en todos los casos
    //Y luego con el botón de desconectar y el de recordarme va a quedar totalmente funcional, chiche diría Fer
    usuario.nombre = user.value;
    usuario.estado = "online";
    //---------->
    localStorage.setItem("usuario", JSON.stringify(usuario)); //Guardo mi variable de objeto en Local Storage
    sessionStorage.setItem("usuario", JSON.stringify(usuario)); //Guardo mi variable de objeto en Session Storage
    location.href = "index.html";                              //Si todo esta correcto redirecciono a index.html
  }

  
}

document.addEventListener("keypress", (event) => {
  if(event.key == "Enter"){
    verificar();
  }
})

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {        //Si el usuario ya habia iniciado sesion anteriormente
    let usuario = JSON.parse( localStorage.getItem("usuario"));     // esta parte del codigo lo vuelve a redireccionar al 
    if (usuario.estado=='online'){                               // index.html sin tenes que volverse a loguear
        location.href="index.html";
    }
});
