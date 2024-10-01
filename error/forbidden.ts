import { BaseError } from 'sequelize'

export class ForbiddenError extends BaseError {
    systemMessage = 'FORBIDDEN'
    status = 403

    constructor(message: string = '') {
        super(message)
    }
}
