function add (){
  getLoggedInUser() 
  .then(user => {
    axios.post(
      'http://localhost:3000/api/todos', 
      {
        
      }
    )
  })
}

function edit (){

}

function remove () {

}

function addTodo () {
  getUserInfo().then((loggedInUser) => {
    axios({
     method: 'post',
     url: 'http://localhost:3000/api/todos',
     data: {
       todo_name: $('#todo_name').val(),
       user_id: loggedInUser.data.facebookID
     }
   }).then((serverResponse) => {
      $('#todo_name').val('');
      getTodos(loggedInUser.data.facebookID);
    }).catch((err) => {
      console.log(err);
    });
  }).catch((err) => {
    console.log(err);
  });
}