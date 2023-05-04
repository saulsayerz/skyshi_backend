const db = require('./db');
const helper = require('../helper');

async function getActivities(){
    const result = await db.query(
      `SELECT * FROM activities`
    );
    const data = helper.emptyOrRows(result);
  
    return {data};
}

async function getOneActivities(id){
  const result = await db.query(
    `SELECT * FROM activities where activity_id = ?`, [id]
  );
  const temp = helper.emptyOrRows(result);
  if (temp){
    const data = temp[0];
    return {data};
  }
  
}

async function createActivity(title, email){
  const result = await db.query(
  `INSERT INTO activities (title, email) VALUES ('${title}', '${email}')`
  );
  
  const datatemp = await db.query(
    `SELECT * FROM activities where activity_id = ?`, [result.insertId]
    );

  const data = helper.emptyOrRows(datatemp)[0];

  return {data};
}

async function patchActivity(title,id){
  const result = await db.query(
  `UPDATE activities SET title = '${title}' WHERE activity_id = '${id}'`
  );
  
  const datatemp = await db.query(
    `SELECT * FROM activities where activity_id = ?`, [id]
    );

    const temp = helper.emptyOrRows(datatemp);
    if (temp){
      const data = temp[0];
      return {data};
    }
}

async function deleteActivity(id){
  const result = await db.query(
  `DELETE FROM activities WHERE activity_id = '${id}'`
  );

  return {result};
}

module.exports = {
    getActivities,
    getOneActivities,
    createActivity,
    patchActivity,
    deleteActivity
}