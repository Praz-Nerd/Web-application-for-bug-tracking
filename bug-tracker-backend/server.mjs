import express from 'express'
import models from './models/index.mjs'
import cors from 'cors'

const app = express()
//json and cors middleware
app.use(cors())
app.use(express.json())



//error middleware
app.use((err, req, res, next) => {
    console.warn(err)
    res.status(500).json({ message: 'some error' })
})

//start server
app.listen(8080)
console.log('Server started on port 8080...')

