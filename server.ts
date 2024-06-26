import dotenv from 'dotenv'
import express from 'express'
import cors from 'cors'

import { json } from 'body-parser'
import { sequelize } from './db/sequelize'
import { errorHandler } from './middleware/error-middleware'

import { userRouter } from './routes/user-route'
import { taskRouter } from './routes/task-route'
import { reportRouter } from './routes/report-route'
import { teamRouter } from './routes/team-route'

dotenv.config()

const app = express()
app.use(json({ limit: '5mb' }))
app.use(cors())

app.use('/api/user', userRouter)
app.use('/api/task', taskRouter)
app.use('/api/report', reportRouter)
app.use('/api/team', teamRouter)

const port = process.env.PORT
;(async () => {
    await sequelize.sync({ alter: true })

    app.listen(port, () => {
        console.log(`Listening on port: ${port}`)
    })
})()

app.use(errorHandler)
