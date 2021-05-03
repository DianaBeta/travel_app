// start.js
// designates what port the app will listen to for incoming requests

let port = 8081
const app = require('./server.js')
app.listen(port)
console.log(`listening on port ${port}`)