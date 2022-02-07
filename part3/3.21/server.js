/* Varaibales and imports */
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const path = require('path')
const route = require('./route')
const { v4: uuidv4 } = require('uuid')
const fs = require('fs')
const process = require('process')
const fileLoggerStram = fs.createWriteStream(
  path.join(__dirname, 'access.log'),
  { flags: 'a' }
)


/* initilaize app.use */
const app = express()
app.use(
  /* We decide here what to show inside morgan logger */
  morgan(
    ':user :id :method :url :status :response-time ms - :res[content-length] :body - :req[content-length]',
    { stream: fileLoggerStram }
  )
)

app.use(cors())
app.use(assignId)
app.use(express.json())
app.use('/api/', route)
/* Middle ware which handle all request errors */
const errorHandler = (error, request, response, next) => {
  console.log('Osku,error')
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  }

  next(error)
}

// this has to be the last loaded middleware.
app.use(errorHandler)

/* Show Message in maind of backend */

/* Morgan Tokens */

/* here we bulid Token to show body info */
morgan.token('body', (req) => JSON.stringify(req.body))
/* we return the rig id inside Morgan Token  */
morgan.token('id', function getId(req) {
  return req.id
})
morgan.token('user', function () {
  return 'UserToken = '
})
/* Functions */

/* Generate Uniqe id with uuid */
function assignId(req, res, next) {
  req.id = uuidv4()
  next()
}
/* Http Rrquest */
/* Link Static Files proudaction/  */
app.use(express.static('./client/build'))

/*  start the server with app listen function */
const port = process.env.PORT || 8080
app.listen(port, (err) => {
  if (err) throw err
  console.log(`Listening on port ${port}...`)
})
