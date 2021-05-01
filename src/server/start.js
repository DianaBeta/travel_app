// start.js
let port = 8081
const app = require('./server.js')
app.listen(port)
console.log(`listening on port ${port}`)