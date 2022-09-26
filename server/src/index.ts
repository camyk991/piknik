import * as dotenv from 'dotenv'
dotenv.config()
import express from 'express'
import connectDB from './config/db'
const app = express()
const port = 5000

connectDB();

app.get('/', (_, res) => {
  res.status(200).send()
})

app.listen(port, () => console.log(`Running on port http://localhost:${port}`))