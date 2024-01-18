// require your server and launch it here

const server = require('./api/server')

const port = 8000

server.listen(port, () => console.log(`All the right stuff is happening over on port ${port}!!`))
