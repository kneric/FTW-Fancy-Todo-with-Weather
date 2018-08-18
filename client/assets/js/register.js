function register () {
  axios.post('http://localhost:3000/signup', {
    name: $('#newName').val(),
    email: $('#newEmail').val(),
    password: $('#newPassword').val()
  })
  .then(data => {
    localStorage.setItem('token', data.token);
    location.reload();
  })
  .catch(err => {
    alert('input email & password consists of minimum 6 characters with combination of letter and number');
  })
}