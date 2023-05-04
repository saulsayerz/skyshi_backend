const db = require('./db');
const helper = require('../helper');

async function getTodos(activity_group_id){
    const result = await db.query(
      `SELECT * FROM todos where activity_group_id = ?`, [activity_group_id]
    );
    var data = helper.emptyOrRows(result, 'todos');

    if (data){
    return {data};
    }
    else {
    return {data : []};
    }
}

async function getOneTodos(id){
  const result = await db.query(
    `SELECT * FROM todos where todo_id = ?`, [id]
  );
  const temp = helper.emptyOrRows(result,"todos");
  if (temp){
    const data = temp[0];
    return {data};
  } 
}

async function createTodo(title, activity_group_id, is_active, priority){
  if (is_active == null){
    is_active = true;
  }
  if (priority == null){
    priority = "very-high";
  }
  const result = await db.query(
    `INSERT INTO todos (title, activity_group_id, is_active, priority) VALUES (?, ?, ?, ?)`, [title, activity_group_id, is_active, priority]
    );
  
  const datatemp = await db.query(
    `SELECT * FROM todos where todo_id = ?`, [result.insertId]
    );

    var data = helper.emptyOrRows(datatemp, 'todos')[0];
  return {data};
}

async function patchTodo(title, activity_group_id, priority, is_active, id){
  var datatemp = await db.query(
    `SELECT * FROM todos where todo_id = ?`, [id]
    );
    if (datatemp){
      if (title != null){
        datatemp[0].title = title;
      } else{
        title = datatemp[0].title;
      }
      if (priority != null){
        datatemp[0].priority = priority;
      } else{
        priority = datatemp[0].priority;
      }
      if (is_active != null){
        datatemp[0].is_active = is_active;
        is_active = is_active ? true : false;
      } else{
        is_active = datatemp[0].is_active ? true : false;
      } if (activity_group_id){
        datatemp[0].activity_group_id = activity_group_id;
      } else{
        activity_group_id = datatemp[0].activity_group_id;
      }
    }
  const result = await db.query(
  `UPDATE todos SET title = ?, priority = ?, is_active = ?, activity_group_id = ? WHERE todo_id = ?`, [title, priority, is_active, activity_group_id, id]
  );

    const temp = helper.emptyOrRows(datatemp, "todos");
    if (temp){
      var data = temp[0];
      return {data};
    }
}

async function deleteTodo(id){
  const result = await db.query(
  `DELETE FROM todos WHERE todo_id = '${id}'`
  );

  return {result};
}

module.exports = {
    getTodos,
    getOneTodos,
    createTodo,
    patchTodo,
    deleteTodo
}