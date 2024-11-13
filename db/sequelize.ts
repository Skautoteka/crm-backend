import { Dialect } from 'sequelize'
import { Sequelize } from 'sequelize-typescript'
import dotenv from 'dotenv'

dotenv.config()

declare global {
    // eslint-disable-next-line @typescript-eslint/no-namespace
    namespace NodeJS {
        interface ProcessEnv {
            DB: string
            DB_DIALECT: Dialect
            DB_USER: string
            DB_PW: string
        }
    }
}

export const sequelize = new Sequelize({
    database: process.env.DB,
    dialect: process.env.DB_DIALECT,
    username: process.env.DB_USER,
    password: process.env.DB_PW,
    models: [__dirname + '/models'],
})
