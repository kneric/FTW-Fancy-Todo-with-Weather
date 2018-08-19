function tokenCheck () {
  if (localStorage.getItem('token')){
    return isLoggedIn ();
  }
  return isLoggedOut();
}

function getLoggedInUser () {
  return axios.post(
    'http://localhost:3000/decode',{
      token: localStorage.getItem('token')}
  )
}

function isLoggedIn (){
  $('#notLoggedIn').addClass('d-none');
  $('#logout-btn').removeClass('d-none');
  $('#loggedIn').removeClass('d-none');

  getLoggedInUser()
  .then(user => {
    $('#username').html(user.data.name);
    listTodo(user.data._id);
  })
  .catch(err => {
    console.log(err);
  })
}

function isLoggedOut (){
  $('#notLoggedIn').removeClass('d-none');
  $('#logout-btn').addClass('d-none');
  $('#loggedIn').addClass('d-none');
}

function login () {
  axios.post('http://localhost:3000/signin', {
    email: $('#email').val(),
    password: $('#password').val()}
  )
  .then(data => {
    localStorage.setItem('token', data.data.token);
    location.reload();
  })
  .catch(err => {
    alert(JSON.stringify(err.response.data.message));
  })
}

function logout () {
  localStorage.removeItem('token');
  alert('logout success!');
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
      axios.post('http://localhost:3000/loginfb', response.authResponse)
      .then(data => {
        localStorage.setItem('token', data.data.token);
        location.reload();
      })
      .catch(err => {
        console.log(err);
        location.reload();
      })
    }
  });
}   