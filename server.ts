import dotenv from 'dotenv'
import express from 'express'
import cors from 'cors'

import { json } from 'body-parser'
import { sequelize } from './db/sequelize'
import { errorHandler } from './middleware/error-middleware'

import { taskRouter } from './routes/task-route'
import { reportRouter } from './routes/report-route'
import { regionRouter } from './routes/region-route'
import { teamRouter } from './routes/team-route'
import { playerRouter } from './routes/player-route'
import { userRouter } from './routes/user-route'
import { authRouter } from './routes/auth-route'
import { roleRouter } from './routes/role-route'
import { moduleRouter } from './routes/module-route'
import { authMiddleware } from './middleware/auth-middleware'
import cookieParser from 'cookie-parser'
import { analysisRouter } from './routes/analysis-route'
import { positionRouter } from './routes/position-route'
import { teamFormationsRouter } from './routes/team-formation-route'
import { noteRouter } from './routes/note-route'
import fileupload from 'express-fileupload'
import path from 'path'
import fs from 'fs'

dotenv.config()

const app = express()
app.use(json({ limit: '5mb' }))
app.use(cors())
app.use(cookieParser())
app.use(fileupload())

app.use('/api/task', authMiddleware, taskRouter)
app.use('/api/report', authMiddleware, reportRouter)
app.use('/api/region', authMiddleware, regionRouter)
app.use('/api/team', authMiddleware, teamRouter)
app.use('/api/player', authMiddleware, playerRouter)
app.use('/api/user', authMiddleware, userRouter)
app.use('/api/role', authMiddleware, roleRouter)
app.use('/api/module', authMiddleware, moduleRouter)
app.use('/api/analysis', authMiddleware, analysisRouter)
app.use('/api/position', authMiddleware, positionRouter)
app.use('/api/team-formations', authMiddleware, teamFormationsRouter)
app.use('/api/note', authMiddleware, noteRouter)
app.use('/api/auth', authRouter)

const uploadDir = path.join(__dirname, 'uploads')
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir)
}

const port = process.env.PORT
;(async () => {
    console.log({
        database: process.env.DB,
        dialect: process.env.DB_DIALECT,
        username: process.env.DB_USER,
        password: process.env.DB_PW,
    })

    await sequelize.sync({ alter: true })

    app.listen(port, () => {
        console.log(`Listening on port: ${port}`)
    })
})()

app.use(errorHandler)
