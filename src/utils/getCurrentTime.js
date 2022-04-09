function getCurrentTime() {
  const date = new Date()
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  return `${year}${addZero(month)}${addZero(day)}`
}

function addZero(num) {
  return num < 10 ? `0${num}` : num
}

module.exports = {
  getCurrentTime,
  addZero
}