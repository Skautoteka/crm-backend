import User from '../db/models/user.model'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { ModelValidationError } from '../error/model-validation'
import { NotFoundError } from '../error/not-found'
import dotenv from 'dotenv'
import { ForbiddenError } from '../error/forbidden'
import { Tokens } from '../interface/iauth'
import { InvalidPayloadError } from '../error/invalid-payload'
import { Request } from 'express'
import Role from '../db/models/role.model'
import { UserAttributes, PublicUserAttributes } from '../db/models/user.model'
import * as roleController from './role-controller'
import * as regionController from './region-controller'

dotenv.config()

/**
 * Returns the secret used to sign jwt.
 *
 * @param type
 * @returns
 */
const _getSecret = (type: 'refresh' | 'access'): string => {
    const secret =
        type === 'refresh'
            ? process.env.REFRESH_TOKEN_SECRET
            : process.env.ACCESS_TOKEN_SECRET

    if (!secret) {
        throw new NotFoundError('Could not find access/refresh token secret')
    }

    return secret
}

/**
 * Returns an access token.
 */
const _getAccessToken = (email: string): string => {
    return jwt.sign({ email }, _getSecret('access'), { expiresIn: '10s' })
}

/**
 * Returns refresh token
 */
const _getRefreshToken = (email: string): string => {
    return jwt.sign({ email }, _getSecret('refresh'))
}

/**
 * Generates hashed password from a password given as argument.
 *
 * @param password
 * @returns
 */
const _getHashedPassword = async (password: string): Promise<string> => {
    const saltRounds = 10
    const salt = await bcrypt.genSalt(saltRounds)
    return await bcrypt.hash(password, salt)
}

export const getReqUser = async (req: Request): Promise<User> => {
    // @ts-expect-error getting req
    const { email } = req

    const user = await User.findOne({ where: { email }, include: Role })

    if (!user) {
        throw new NotFoundError('Did not find user in the database')
    }

    return user
}

/**
 * Creates the user to the database.
 *
 * @param firstName
 * @param lastName
 * @returns
 */
export const createUser = async ({
    firstName,
    lastName,
    email,
    password,
    role,
    region,
    phoneNumber,
}: UserAttributes): Promise<PublicUserAttributes> => {
    try {
        const hashedPassword = await _getHashedPassword(password)
        const roleObject = await roleController.getBasicRole(role ?? 'scout')
        const regionObject = await regionController.getRegion(region)

        const user = new User({
            firstName,
            lastName,
            email,
            password: hashedPassword,
            role: roleObject.id,
            phoneNumber,
            region: regionObject.id,
        })
        const data = await user.save()

        const userData = {
            id: data.id,
            firstName,
            lastName,
            email,
            role: roleObject.name,
            phoneNumber,
            region: regionObject.name,
        }

        return { ...userData }
    } catch (err) {
        throw new ModelValidationError(err.message)
    }
}

/**
 * Tries to log in the user to the system. The value returned is a string representing
 *
 * @param email
 * @param password
 */
export const login = async (
    email: string,
    password: string
): Promise<Tokens> => {
    const user = await User.findOne({ where: { email } })

    if (!user) {
        throw new ForbiddenError('Password is invalid')
    }

    const compareResult = await bcrypt.compare(password, user.password)
    if (!compareResult) {
        throw new ForbiddenError('Password is invalid')
    }

    return {
        accessToken: _getAccessToken(user.email),
        refreshToken: _getRefreshToken(user.email),
    }
}

/**
 * Refreshes the tokens based on the refresh token provided as argument and returns a fresh
 * pair of tokens.
 */
export const refreshToken = async (refreshToken: string): Promise<Tokens> => {
    const payload = await jwt.verify(refreshToken, _getSecret('refresh'))
    // @ts-expect-error email exists on payload
    const email = payload.email

    if (typeof email !== 'string') {
        throw new InvalidPayloadError('Email signed with token is invalid')
    }

    return {
        accessToken: _getAccessToken(email),
        refreshToken: _getRefreshToken(email),
    }
}
