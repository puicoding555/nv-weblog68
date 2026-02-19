const express = require('express')
const cors = require('cors')
const { sequelize } = require('./models')
const config = require('./config/config')

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())


app.use('/public', express.static('public'))

require('./userPassport')
require('./routes')(app)

const port = config.port

sequelize.sync({ force: false })
    .then(() => {
        app.listen(config.port, '0.0.0.0', () => {
            console.log('Server running on port ' + port)
        })
    })
