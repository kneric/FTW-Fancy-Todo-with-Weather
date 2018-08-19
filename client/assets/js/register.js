function register () {
  axios.post('http://localhost:3000/signup', {
    name: $('#newName').val(),
    email: $('#newEmail').val(),
    password: $('#newPassword').val()
  })
  .then(data => {
    localStorage.setItem('token', data.data.token);
    location.reload();
  })
  .catch(err => {
    alert(JSON.stringify(err.response.data));
  })
}