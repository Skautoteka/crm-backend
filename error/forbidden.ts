import { BaseError } from 'sequelize'

export class ForbiddenError extends BaseError {
    systemMessage = 'FORBIDDEN'
    status = 401

    constructor(message: string = '') {
        super(message)
    }
}
