function onSignIn(googleUser) {                            //Funcion de inicio de sesión de Google.
    // Useful data for your client-side scripts:
    
    var profile = googleUser.getBasicProfile();
    /*console.log("ID: " + profile.getId()); // Don't send this directly to your server!
    console.log('Full Name: ' + profile.getName());
    console.log('Given Name: ' + profile.getGivenName());
    console.log('Family Name: ' + profile.getFamilyName());
    console.log("Image URL: " + profile.getImageUrl());
    console.log("Email: " + profile.getEmail());*/
    let usuario = {};
    usuario.nombre = profile.getName();
    usuario.estado = "online";
    usuario.img = profile.getImageUrl();
    //--------->
    localStorage.setItem("usuario", JSON.stringify(usuario)); //Guardo mi variable de objeto en Local Storage
  

    // The ID token you need to pass to your backend:
    var id_token = googleUser.getAuthResponse().id_token;
    //console.log("ID Token: " + id_token);
    location.href = "index.html";
   
  }



  

  


  