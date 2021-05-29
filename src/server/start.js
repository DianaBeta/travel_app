// start.js
// designates what port the app will listen to for incoming requests

let port = 8081
 //var port = process.env.PORT || 5000;
const app = require('./server.js')
app.listen( port || process.env.PORT)
console.log(`listening on port ${port}`)