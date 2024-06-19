import { BaseError } from 'sequelize'

export class InvalidPayloadError extends BaseError {
    systemMessage = 'INVALID_PAYLOAD'
    status = 400

    constructor(message: string = '') {
        super(message)
    }
}
