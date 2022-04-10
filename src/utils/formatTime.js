const formatTime = (time) => {
  console.log(time);
  let json_date = new Date(time).toJSON();
  return new Date(new Date(json_date) + 8 * 3600 * 1000).toISOString().replace(/T/g, ' ').replace(/\.[\d]{3}Z/, '')
}

module.exports = formatTime