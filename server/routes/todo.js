const express = require("express");
const router = express.Router();
const {
  createTodo,
  listTodo,
  updateTodo,
  deleteTodo
} = require("../controllers/todo");
const auth = require('../middlewares/auth');

router
  .route("/")
  .post(auth, createTodo)
  .get(auth, listTodo)

router
  .route("/:id")
  .put(auth, updateTodo)
  .delete(auth, deleteTodo)

router.route("/images").post();

module.exports = router;
