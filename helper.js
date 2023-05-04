function emptyOrRows(rows, type = 'activity') {
  if (!rows) {
    return [];
  }
  
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
      const transformedActivity = {
        id: row.todo_id,
        ...row,
        todo_id: undefined // Remove the old key
      };
      return transformedActivity;
    });
    return transformedRows;
  }
}

  
  module.exports = {
    emptyOrRows,
  }