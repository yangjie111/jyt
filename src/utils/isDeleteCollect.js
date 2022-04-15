const isDelete = (is) => {
  if (is) return 'DELETE FROM collect_user cu WHERE cu.moment_id = ? AND cu.user_id = ?'
  return 'INSERT INTO collect_user(moment_id,user_id) VALUES (?, ?);'
}

module.exports = { isDelete }