import dotenv from 'dotenv'
import express from 'express'
import cors from 'cors'

import { json } from 'body-parser'
import { sequelize } from './db/sequelize'
import { errorHandler } from './middleware/error-middleware'

import { taskRouter } from './routes/task-route'
import { reportRouter } from './routes/report-route'
import { teamRouter } from './routes/team-route'
import { playerRouter } from './routes/player-route'
import { authRouter } from './routes/auth-route'
import { authMiddleware } from './middleware/auth-middleware'
import cookieParser from 'cookie-parser';

dotenv.config()

const app = express()
app.use(json({ limit: '5mb' }))
app.use(cors())
app.use(cookieParser())

app.use('/api/task', authMiddleware, taskRouter)
app.use('/api/report', authMiddleware, reportRouter)
app.use('/api/team', authMiddleware, teamRouter)
app.use('/api/player', authMiddleware, playerRouter)
app.use('/api/auth', authRouter)

const port = process.env.PORT
;(async () => {
    await sequelize.sync({ alter: true })

    app.listen(port, () => {
        console.log(`Listening on port: ${port}`)
    })
})()

app.use(errorHandler)