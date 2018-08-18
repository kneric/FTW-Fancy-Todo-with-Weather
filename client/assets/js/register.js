function register () {
  axios.post('http://localhost:3000/signin', {
    name: $('#newName').val(),
    email: $('#newEmail').val(),
    password: $('#newPassword').val()
  })
  .then(data => {
    alert(data.message)
    localStorage.setItem('token', data.token);
    location.reload();
  })
  .catch(err => {
    alert(err.message);
  })
}