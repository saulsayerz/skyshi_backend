const db = require('./db');
const helper = require('../helper');

async function getTodos(activity_group_id){
    const result = await db.query(
      `SELECT * FROM todos where activity_group_id = ?`, [activity_group_id]
    );
    const data = helper.emptyOrRows(result, 'todos');
  
    return {data};
}

async function getOneTodos(id){
  const result = await db.query(
    `SELECT * FROM todos where todo_id = ?`, [id]
  );
  const temp = helper.emptyOrRows(result);
  if (temp){
    const data = temp[0];
    return {data};
  }
}

async function createTodo(title, activity_group_id, is_active){
  const result = await db.query(
  `INSERT INTO todos (title, activity_group_id, is_active) VALUES ('${title}', ${activity_group_id}, ${is_active})`
  );
  
  const datatemp = await db.query(
    `SELECT * FROM todos where todo_id = ?`, [result.insertId]
    );

  const data = helper.emptyOrRows(datatemp, 'todos')[0];

  return {data};
}

async function patchTodo(title,priority, is_active, id){
  const result = await db.query(
  `UPDATE todos SET title = '${title}', priority = '${priority}', is_active = ${is_active} WHERE todo_id = '${id}'`
  );
  
  const datatemp = await db.query(
    `SELECT * FROM todos where todo_id = ?`, [id]
    );

    const temp = helper.emptyOrRows(datatemp);
    if (temp){
      const data = temp[0];
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