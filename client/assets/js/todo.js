function add (){
  getLoggedInUser() 
  .then(user => {
    return axios.post(
      'http://localhost:3000/todo', 
      {
        userId: user.data._id,
        task: $('#newTask').val(),
        dueDate: $('#newDue').val(),
        description: $('#newDesc').val(),
        priority: $('#newPrio').val(),
        token: localStorage.getItem('token')
      }
    )
    .then(response => {
      listTodo(user.data._id);
      location.reload();
    })
  })
  .catch(err => {
    alert(JSON.stringify(err.response.data));
  })
}

function listTodo (userId){
  return axios.get(`http://localhost:3000/todo/user/${userId}`)
  .then(response => {
    if (response.data.todos.length > 0){
      response.data.todos.forEach(todo => {
        $("#todos").append(`
          <div class="col-md-4 col-sm-4 mb-3 mt-3">
            <div class="card">
              <div class="card-body text-center">
                <p><strong>${todo.task || ''}</strong></p>
                <p>Priority: ${todo.priority || ''}</p>
                <p>Due Date: ${todo.dueDate || ''}</p>
                <p>Description:</p>
                <p>${todo.description || ''}</p>
                <button class="btn btn-warning mr-2" onclick="edit('${todo._id}')"> Edit </button>
                <button class="btn btn-success mr-2" onclick="remove('${todo._id}')"> Complete </button>
              </div>
            </div>
          </div>    
        `)
      })
    } else {
      $("#todos").append(`
        <div class="col-md-4 col-sm-4 mb-3 mt-3">
          <div class="card">
            <div class="card-body text-center">
              <p>You don't have any todos yet. Have you completed all of it? ;)</p>
            </div>
          </div>
        </div>   
      `)
    }
  })
  .catch(err => {
    console.log(err);
  })
}

function edit (todoId){
  return axios.get(`http://localhost:3000/todo/${todoId}`)
  .then(response => {
    $('#todoId').val(todoId);
    $('#editTask').val(response.data.todo.task);
    $('#editPrio').val(response.data.todo.priority);
    $('#editDue').val(response.data.todo.dueDate);
    $('#editDesc').val(response.data.todo.description);

    $('#editModal').modal();
  })
  .catch(err =>{
    console.log(err);
  })
}

function update (){
  return axios.put(`http://localhost:3000/todo/`+$('#todoId').val(), {
    task: $('#editTask').val(),
    dueDate: $('#editDue').val(),
    description: $('#editDesc').val(),
    priority: $('#editPrio').val(),
    token: localStorage.getItem('token')
  }
  )
  .then(response => {
    alert(`${response.data.updatedtodo.task} updated`)
    location.reload();
  })
  .catch(err =>{
    console.log(err);
  })
}


function remove (todoId) {
  return axios({
    method: 'delete',
    url: `http://localhost:3000/todo/${todoId}`,
    data: {
      token: localStorage.getItem('token')
    }
  }
  )
  .then(response => {
    alert(`${response.data.deletedTodo.task} completed`)
    location.reload();
  })
  .catch(err =>{
    console.log(err);
  })
}