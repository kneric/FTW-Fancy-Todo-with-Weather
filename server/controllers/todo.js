const jwt = require ('jsonwebtoken');
const Todo = require('../models/todo');
const auth = require('./auth');

const createTodo = (req, res)=> {
  const {task, dueDate, description, priority} = req.body

  Todo.create({
    userId: loggedInUser._id,
    task,
    dueDate,
    description,
    priority
  })
  .then(createdTask => {
    res.status(201).json({
      createdTask, 
      message:'task created'
    })
    .catch(err => {
      res.status(500).json({message: err});
    })
  })
}

const listTodo = (req, res) => {
  Todo.find({
    userId: loggedInUser._id
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
  Todo.Model.findByIdAndDelete(req.params.id)
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
  deleteTodo
};
