const express = require('express');
const router = express.Router();
const todos = require('../services/todo');

let success = 'Success'

router.get('/', async function(req, res, next) {
  try {
    if (!req.query.activity_group_id) {
        res.status(400).json({ message: 'Error while getting list of todos: activity_group_id is required'});
        return
      }
    const todoList = await todos.getTodos(req.query.activity_group_id);
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
  const { title, activity_group_id, is_active } = req.body;
  try {

    const result = await todos.createTodo(title, activity_group_id, is_active);

    res.status(200).json({status: success, message: success, ...result });
  } catch (err) {
    console.error(`Error in creating todo: `, err.message);
    res.status(400).json({message: 'Error in creating todo: ' + err.message});
  }
});

router.patch('/:id', async function(req, res, next) {
  const { title, priority, is_active } = req.body;
  try {
    // const oneTodo = await todos.getOneTodos(req.params.id);
    // if (oneTodo.data.length === 0) {
    //   res.status(400).json({status: "Not Found", message: "Todo with ID " + req.params.id + " Not Found"});
    //   return;
    // }
    console.log(title, priority, is_active)
    const result = await todos.patchTodo(title, priority, is_active, req.params.id);
    res.status(200).json({status: success, message: success, ...result });

  } catch (err) {
    console.error(`Error in creating todo: `, err.message);
    res.status(400).json({message: 'Error in creating todo: ' + err.message});
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
    console.error(`Error in creating todo: `, err.message);
    res.status(400).json({message: 'Error in creating todo: ' + err.message});
  }
});
  
module.exports = router;