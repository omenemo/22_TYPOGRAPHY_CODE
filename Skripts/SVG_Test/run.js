const  http = require("http"),
    express = require("express")

// Create an Express server app
// and serve up a directory of static files.
const app = express()
const port = 5000
const server = app.listen(port,function(){
	console.log('app running open socket at port 8080 listening for OSC at port 5000')
})

app.use(express.static('public'))