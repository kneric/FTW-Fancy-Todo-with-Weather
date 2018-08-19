const Todo = require('../models/todo');

const createTodo = (req, res)=> {
  const {userId, task, dueDate, description, priority} = req.body

  Todo.create({
    userId,
    task,
    priority,
    dueDate,
    description,
  })
  .then(createdTask => {
    res.status(201).json({
      createdTask, 
      message:'task created'
    })
  })
  .catch(err => {
    res.status(500).json({message: err});
  })
}

const listTodo = (req, res) => {
  
  Todo.find({
    userId: req.params.id
  })
  .then(todos => {
    if(todos){
      res.status(200).json({todos, message: `here's your todos`})
    } else {
      res.status(200).json({message: `you haven't created any todo`})
    }
  })
  .catch(err =>{
    res.status(500).json({message: err});
  })
}

const aTodo = (req, res) => {
  
  Todo.findById(req.params.id)
  .then(todo => {
    if(todo){
      res.status(200).json({todo, message: `here's your todo`})
    } else {
      res.status(200).json({message: `you haven't created the todo`})
    }
  })
  .catch(err =>{
    res.status(500).json({message: err});
  })
}

const updateTodo = (req, res) => {
  Todo.findByIdAndUpdate(req.params.id, {$set: req.body}, {new: true})
  .then (updatedtodo=> {
    res.status(200).json({
      updatedtodo, 
      message:'todo updated'
    })
  })
  .catch(err=> {
    res.status(500).json({message: err});
  })
}

const deleteTodo = (req, res) => {
  Todo.findByIdAndDelete(req.params.id)
  .then(deletedTodo => {
    res.status(200).json({deletedTodo, message: 'todo deleted'})
  })
  .catch(err => {
    res.status(500).json({message: err});
  })
}

module.exports = {
  createTodo,
  listTodo,
  updateTodo,
  deleteTodo,
  aTodo
};
