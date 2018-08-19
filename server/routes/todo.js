const express = require("express");
const router = express.Router();
const {
  createTodo,
  listTodo,
  updateTodo,
  deleteTodo,
  aTodo
} = require("../controllers/todo");
const auth = require('../middlewares/auth');

router
  .route("/")
  .post(auth, createTodo)

router 
  .route("/user/:id")
  .get(listTodo)

router
  .route("/:id")
  .get(aTodo)
  .put(auth, updateTodo)
  .delete(auth, deleteTodo)

router.route("/images").post();

module.exports = router;
