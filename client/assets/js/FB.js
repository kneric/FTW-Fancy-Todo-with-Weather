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
        $('#notLoggedIn').addClass('invisible')
      })
      .catch(err => {
        console.log(err);
      })
    }
  });
}   