const mysql = require('mysql2/promise');
const config = require('../config');

async function query(sql, params) {
  const connection = await mysql.createConnection(config.db);
  const [results, ] = await connection.execute(sql, params);

  return results;
}

async function migrate(){
  await query(`
    CREATE TABLE IF NOT EXISTS activities (
      activity_id INT PRIMARY KEY AUTO_INCREMENT,
      title VARCHAR(255) NOT NULL,
      email VARCHAR(255) NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    )
  `);

  await query(`
    CREATE TABLE IF NOT EXISTS todos (
      todo_id INT PRIMARY KEY AUTO_INCREMENT,
      activity_group_id INT NOT NULL,
      title VARCHAR(255) NOT NULL,
      priority VARCHAR(10) NOT NULL DEFAULT 'low',
      is_active BOOLEAN NOT NULL DEFAULT true,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
      FOREIGN KEY (activity_group_id) REFERENCES activity_groups(activity_id)
        ON DELETE CASCADE
        ON UPDATE CASCADE
    )
  `);
}

module.exports = {
  query,
  migrate,
}