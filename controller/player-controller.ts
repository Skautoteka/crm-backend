import { Op, or, literal, fn, col } from 'sequelize'
import Player, { PlayerCreationAttributes } from '../db/models/player.model'
import Team from '../db/models/team.model'
import { ModelValidationError } from '../error/model-validation'
import { NotFoundError } from '../error/not-found'
import { ISingleInputConfig } from '../interface'
import Position from '../db/models/position.model'

export const getAll = async (): Promise<Player[]> => {
    const latestPlayers = await Player.findAll({
        attributes: [
            'masterPlayerId',
            [fn('MAX', col('version')), 'latestVersion'],
        ],
        group: ['masterPlayerId'],
    })

    const versionPairs = latestPlayers.map((record) => ({
        masterPlayerId: record.getDataValue('masterPlayerId'),
        version: record.get('latestVersion') as number,
    }))

    return await Player.findAll({
        where: {
            [Op.or]: versionPairs.map(({ masterPlayerId, version }) => ({
                masterPlayerId,
                version,
            })),
        },
        include: [Team, Position],
    })
}

/**
 * Adds a new task.
 *
 * @param param0
 * @returns
 */
export const add = async (
    payload: PlayerCreationAttributes
): Promise<Player> => {
    try {
        const player = await Player.create({ ...payload, version: 1 })
        const added = await getPlayerLatest(player.id)

        if (!added) {
            throw new NotFoundError('Could not find the added player.')
        }

        return added
    } catch (err) {
        throw new ModelValidationError(err.message)
    }
}

/**
 * Creates a new version of the player or adds a new player if none exists.
 *
 * @param payload Player creation attributes
 * @param playerId Optional ID of the player to version
 */
export const addPlayerVersion = async (
    payload: PlayerCreationAttributes,
    playerId: string
): Promise<Player> => {
    const latestPlayer = await getPlayerLatest(playerId)

    if (!latestPlayer) {
        throw new Error(`Player with ID ${playerId} not found.`)
    }

    return Player.create({
        ...latestPlayer.toJSON(),
        ...payload,
        masterPlayerId: latestPlayer.masterPlayerId || latestPlayer.id,
        version: latestPlayer.version + 1,
    })
}

/**
 * Queries players based on the search query and the maximum
 * size.
 *
 * @returns
 */
export const queryPlayer = async (
    search: string,
    size: number = 1
): Promise<Player[]> => {
    return await Player.findAll({
        where: {
            [Op.or]: [
                { firstName: { [Op.like]: `%${search}%` } },
                { lastName: { [Op.like]: `%${search}%` } },
            ],
        },
        limit: size,
        include: [Team, Position],
    })
}

export const getPlayerLatest = async (
    playerId: string
): Promise<Player | null> => {
    return Player.findOne({
        where: or({ id: playerId }, { masterPlayerId: playerId }),
        order: [['version', 'DESC']],
        include: [Team, Position],
    })
}

export const getPlayerHistory = async (playerId: string): Promise<Player[]> => {
    return Player.findAll({
        where: or({ id: playerId }, { masterPlayerId: playerId }),
        order: [['version', 'ASC']],
        include: [Team, Position],
    })
}

/**
 * Returns all players based on team id.
 *
 * @returns
 */
export const getAllByTeamId = async (teamId: string): Promise<Player[]> => {
    return await Player.findAll({
        where: {
            teamId,
            version: literal(`(
                SELECT MAX(version)
                FROM players AS sub
                WHERE sub.masterPlayerId = players.masterPlayerId OR sub.id = players.id
            )`),
        },
        include: [Team, Position],
    })
}

/**
 * Returns all players based on team id.
 *
 * @returns
 */
export const getById = async (id: string): Promise<Player | null> => {
    return Player.findOne({
        where: or({ id }, { masterPlayerId: id }),
        order: [['version', 'DESC']],
        include: [Team, Position],
    })
}

/**
 * Removes the player from the database.
 *
 * @param id
 */
export const remove = async (id: string): Promise<void> => {
    const latestPlayer = await getPlayerLatest(id)

    if (!latestPlayer) {
        throw new NotFoundError('Player not found.')
    }

    await Player.destroy({
        where: or(
            { id: latestPlayer.id },
            { masterPlayerId: latestPlayer.masterPlayerId }
        ),
    })
}

/**
 * Gets the model for the player model creation.
 *
 * @returns
 */
export const getTaskCreateFields = async (): Promise<ISingleInputConfig[]> => {
    return [
        {
            name: 'firstName',
            label: 'Imię',
            isRequired: true,
            placeholder: 'Wpisz imię',
            type: 'TEXT',
        },
        {
            name: 'lastName',
            label: 'Nazwisko',
            isRequired: true,
            placeholder: 'Wpisz nazwisko',
            type: 'TEXT',
        },
        {
            name: 'sex',
            label: 'Płeć zawodnika',
            isRequired: true,
            placeholder: 'Wpisz płeć',
            type: 'SELECT',
            options: [
                { value: 'MALE', label: 'Mezczyzna' },
                { value: 'FEMALE', label: 'Kobieta' },
            ],
        },
        {
            name: 'position',
            label: 'Pozycja zawodnika',
            isRequired: true,
            placeholder: 'Wybierz pozycje',
            type: 'DB',
            searchType: 'position',
        },
        {
            name: 'teamId',
            label: 'Drużyna zawodnika',
            isRequired: false,
            placeholder: 'Wyszukaj druzyne zawodnika',
            type: 'SEARCH',
            searchType: 'team',
        },
        {
            name: 'birthYear',
            label: 'Rok urodzenia',
            isRequired: true,
            placeholder: 'Wpisz rok urodzenia zawodnika',
            type: 'NUMBER',
        },
    ]
}
