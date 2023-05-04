const express = require('express');
const router = express.Router();
const todos = require('../services/todo');

let success = 'Success'

router.get('/', async function(req, res, next) {
  try {
    const todoList = await todos.getTodos();
    res.status(200).json({ status: success, message: success, ...todoList });
  } catch (err) {
    console.error(`Error while getting list of todos: `, err.message);
    res.status(400).json({ message: 'Error while getting list of todos: ' + err.message });
  }
});

router.get('/:id', async function(req, res, next) {
  try {

    const oneTodo = await todos.getOneTodos(req.params.id);
    if (oneTodo.data.length === 0) {
      res.status(400).json({status: "Not Found", message: "Todo with ID " + req.params.id + " Not Found"});
      return;
    }

    res.status(200).json({ status: success, message: success, ...oneTodo });
  } catch (err) {
    console.error(`Error while getting list of todos: `, err.message);
    res.status(400).json({message: 'Error while getting list of todos: ' + err.message});
  }
});

router.post('/', async function(req, res, next) {
  const { email, title } = req.body;
  try {

    const result = await todos.createTodo(title,email);

    res.status(200).json({status: success, message: success, ...result });
  } catch (err) {
    console.error(`Error in creating user: `, err.message);
    res.status(400).json({message: 'Error in creating user: ' + err.message});
  }
});

router.patch('/:id', async function(req, res, next) {
  const { title } = req.body;
  try {
    // const oneTodo = await todos.getOneTodos(req.params.id);
    // if (oneTodo.data.length === 0) {
    //   res.status(400).json({status: "Not Found", message: "Todo with ID " + req.params.id + " Not Found"});
    //   return;
    // }
    
    const result = await todos.patchTodo(title,req.params.id);
    res.status(200).json({status: success, message: success, ...result });

  } catch (err) {
    console.error(`Error in creating user: `, err.message);
    res.status(400).json({message: 'Error in creating user: ' + err.message});
  }
});

router.delete('/:id', async function(req, res, next) {
  try {
    const oneTodo = await todos.getOneTodos(req.params.id);
    if (oneTodo.data.length === 0) {
      res.status(400).json({status: "Not Found", message: "Todo with ID " + req.params.id + " Not Found"});
      return;
    }

    const result = await todos.deleteTodo(req.params.id);
    res.status(200).json({status: success, message: success, data: {}});

  } catch (err) {
    console.error(`Error in creating user: `, err.message);
    res.status(400).json({message: 'Error in creating user: ' + err.message});
  }
});
  
module.exports = router;