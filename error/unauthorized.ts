import { BaseError } from 'sequelize'

export class UnauthorizedError extends BaseError {
    systemMessage = 'UNAUTHORIZED'
    status = 403

    constructor(message: string = '') {
        super(message)
    }
}
