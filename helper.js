function emptyOrRows(rows) {
  if (!rows) {
    return [];
  }
  
  const transformedRows = rows.map(row => {
    const transformedActivity = {
      id: row.activity_id,
      ...row,
      activity_id: undefined // Remove the old key
    };
    return transformedActivity;
  });
  
  return transformedRows;
}

  
  module.exports = {
    emptyOrRows,
  }