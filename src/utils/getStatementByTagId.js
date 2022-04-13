const selectStatement = `
FROM moment_tag mt 
LEFT JOIN moment m ON mt.moment_id = m.id
LEFT JOIN file f ON m.id = f.moment_id
WHERE mt.tag_id = ? AND m.moment_status = 1`;

const unSelectStatement = `
FROM moment m 
JOIN file f ON m.id = f.moment_id
WHERE m.moment_status = 1`

const getStatementByTagId = (tagId) => {
  if (Number(tagId)) return selectStatement
  return unSelectStatement
}

module.exports = getStatementByTagId