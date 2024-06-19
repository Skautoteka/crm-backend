import { Request, Response, NextFunction } from 'express'
import type { ErrorRequestHandler } from 'express'

const errorHandler: ErrorRequestHandler = (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    err: any,
    req: Request,
    res: Response,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    next: NextFunction
) => {
    const errorStatus = err.status || 500
    const label = err.systemMessage || 'SKT_UKNOWN_ERR'
    const message = err.message || 'An unknown error has ocurred'

    res.status(errorStatus).json({ errorStatus, label, message })
}

export { errorHandler }
