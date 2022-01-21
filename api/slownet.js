module.exports.load = async function(app, db) {
 app.get("/slownet", async (req, res) => {
  res.send("Your network is too slow to load Faliactyl! Trying again in 5 seconds...<script>window.location.href='/dashboard'</script>") 
 }) 
}
