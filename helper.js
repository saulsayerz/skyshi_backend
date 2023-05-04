function emptyOrRows(rows, type = 'activity') {
  if (rows.length > 0) {
    if (type === 'activity') {
      const transformedRows = rows.map(row => {
        const transformedActivity = {
          id: row.activity_id,
          ...row,
          activity_id: undefined // Remove the old key
        };
        return transformedActivity;
      });
      return transformedRows;
    } else {
      const transformedRows = rows.map(row => {
        const bool_is_active = row.is_active ? true : false;
        const transformedActivity = {
          id: row.todo_id,
          ...row,
          todo_id: undefined, // Remove the old key
          is_active : bool_is_active
        };
        return transformedActivity;
      });
      return transformedRows;
    }
  }
  
}

  
  module.exports = {
    emptyOrRows,
  }