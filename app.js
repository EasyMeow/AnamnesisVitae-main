const express = require("express")
const config = require("config")
const mongoose = require("mongoose")
require("dotenv").config()
const cors = require("cors")

const app = express()
app.use(cors())
app.use(express.json({extended: true}))

app.use('/api/auth',require('./routes/auth.routes'))

const PORT = process.env.PORT || config.get('port') || 5000

async function start() {
    try {
        await mongoose.connect(config.get('mongoURI'), {
            useNewURlParser: true,
            useUnifiedTopology: true
        })
        app.listen(PORT,()=>console.log(`has been started...on ${PORT}`))
    } catch (e) {
        console.log('Server error', e.message)
        process.exit(1)
    }
}

start()

