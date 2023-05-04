const db = require('./db');
const helper = require('../helper');

async function getTodos(){
    const result = await db.query(
      `SELECT * FROM todos`
    );
    const data = helper.emptyOrRows(result);
  
    return {data};
}

async function getOneTodos(id){
  const result = await db.query(
    `SELECT * FROM todos where todo_id = ?`, [id]
  );
  const data = helper.emptyOrRows(result);

  return {data};
}

async function createTodo(title, email){
  const result = await db.query(
  `INSERT INTO todos (title, email) VALUES ('${title}', '${email}')`
  );
  
  const datatemp = await db.query(
    `SELECT * FROM todos where todo_id = ?`, [result.insertId]
    );

  const data = helper.emptyOrRows(datatemp);

  return {data};
}

async function patchTodo(title,id){
  const result = await db.query(
  `UPDATE todos SET title = '${title}' WHERE todo_id = '${id}'`
  );
  
  const datatemp = await db.query(
    `SELECT * FROM todos where todo_id = ?`, [id]
    );

    const data = helper.emptyOrRows(datatemp);

    return {data};
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