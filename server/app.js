if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}

const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const route = require('./routes/index')
const errorhandler = require('./middlewares/errorhandler')
const cors = require('cors')


app.use(cors())
app.use(express.urlencoded({extended: true}))
app.use(express.json())

app.use('/', route)

app.use(errorhandler)


app.listen(port, () => {
    console.log(`running on ${port}`)
})