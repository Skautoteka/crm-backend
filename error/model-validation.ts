import { BaseError } from 'sequelize'

export class ModelValidationError extends BaseError {
    systemMessage = 'DB_INVALID_MODEL'
    status = 400

    constructor(message: string = '') {
        super(message)
    }
}
