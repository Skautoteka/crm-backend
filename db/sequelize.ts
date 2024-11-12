import { Dialect } from 'sequelize'
import { Sequelize } from 'sequelize-typescript'
import dotenv from 'dotenv'
import Permission from './models/permission.model'
import PlayerTrait from './models/player-trait.model'
import Player from './models/player.model'
import Region from './models/region.model'
import Report from './models/report.model'
import RolePermission from './models/role-permission.model'
import Role from './models/role.model'
import Task from './models/task.model'
import Team from './models/team.model'
import User from './models/user.model'
import ReportTrait from './models/report-trait.model'

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
    models: [
        ReportTrait,
        Permission,
        PlayerTrait,
        Player,
        Region,
        Report,
        RolePermission,
        Role,
        Task,
        Team,
        User
    ],
})