function tokenCheck () {
  console.log('jalan');
  if (localStorage.getItem('token')){
    return isLoggedIn();
  }
  return isLoggedOut();
}

function isLoggedIn (){
  $('#notLoggedIn').addClass('d-none');
  $('#logout-btn').removeClass('d-none');
  $('#loggedIn').removeClass('d-none');
}

function isLoggedOut (){
  $('#notLoggedIn').removeClass('d-none');
  $('#logout-btn').addClass('d-none');
  $('#loggedIn').addClass('d-none');
}

function logout () {
  localStorage.removeItem('token');
  location.reload();
}


window.fbAsyncInit = function() {
  FB.init({
    appId            : '226380818062847',
    autoLogAppEvents : true,
    xfbml            : true,
    version          : 'v3.1'
  });
};

(function(d, s, id){
  var js, fjs = d.getElementsByTagName(s)[0];
  if (d.getElementById(id)) {return;}
  js = d.createElement(s); js.id = id;
  js.src = "https://connect.facebook.net/en_US/sdk.js";
  fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));

function checkLoginState() {
  FB.getLoginStatus(function(response) {
    if (response.status == 'connected'){
      axios.post('http://localhost:3000/login', response.authResponse)
      .then(data => {
        console.log(data);
        localStorage.setItem('token', data.data.token);
        location.reload();
      })
      .catch(err => {
        res.status(403)
        location.reload();
      })
    }
  });
}   