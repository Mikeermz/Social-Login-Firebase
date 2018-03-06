var btnInitSesion = document.getElementById('logIn');
var btnCloseSession = document.getElementById('logOut');
var imageUser = document.getElementById("photoLogin");
var infoUser = document.getElementById("infoUser");
var userName = document.getElementById("userName");
var userEmail = document.getElementById("userEmail");
var ref = 'usuarios';
var usuario = {};


btnInitSesion.addEventListener('click', function() {
  var provider = new firebase.auth.FacebookAuthProvider();
  firebase.auth().signInWithPopup(provider)
  				.then(function(result) {
    				var token = result.credential.accessToken;
    				var user = result.user;
  				}).catch(function(error) {
    				var errorCode = error.code;
				    var errorMessage = error.message;
				    var email = error.email;
				    var credential = error.credential;
				    console.log(error)
  });
});


btnCloseSession.addEventListener('click', function() {
	firebase.auth().signOut()
					.then(function() {
					}).catch(error => {
						console.log(error)
					});
});

function initApp() {
  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      btnInitSesion.style.display = 'none';
      btnCloseSession.style.display = 'inline-block';
      usuario = {
        nombre: user.displayName,
        email: user.email,
        img: user.photoURL,
        uid: user.uid,
      };
      welcome.innerHTML =  usuario.nombre;
      imageUser.src = usuario.img;
      userName.innerHTML =  usuario.nombre;
      userEmail.innerHTML = usuario.email;
      infoUser.style.display = 'inline-block'
      pushUser()
    } else {
      btnInitSesion.style.display = 'inline-block';
      btnCloseSession.style.display = 'none';
      infoUser.style.display = 'none'
    }
  });
}

function pushUser() {
  firebase.database().ref(ref + "/" + usuario.uid).set(usuario)
    .catch(error => {
      console.log(error)
    })
}

window.onload = function() {
  initApp();
};
