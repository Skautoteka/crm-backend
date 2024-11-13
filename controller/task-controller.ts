import Task, { TaskCreationAttributes } from '../db/models/task.model'
import Team from '../db/models/team.model'
import User from '../db/models/user.model'
import { ModelValidationError } from '../error/model-validation'
import { NotFoundError } from '../error/not-found'
import { ISingleInputConfig } from '../interface'

/**
 * Gets the model for the task model creation.
 *
 * @returns
 */
export const getTaskCreateFields = async (): Promise<ISingleInputConfig[]> => {
    return [
        {
            name: 'hostTeamId',
            label: 'Drużyna gości',
            isRequired: true,
            placeholder: 'Wyszukaj druzyne gosci',
            type: 'SEARCH',
            searchType: 'team',
        },
        {
            name: 'guestTeamId',
            label: 'Drużyna gospodarzy',
            isRequired: true,
            placeholder: 'Wyszukaj druzyne gospodarzy',
            type: 'SEARCH',
            searchType: 'team',
        },
        {
            name: 'location',
            label: 'Adres',
            isRequired: false,
            placeholder: 'Wpisz adres zadania',
            type: 'TEXT',
        },
        {
            name: 'status',
            label: 'Status',
            isRequired: true,
            placeholder: 'Wybierz status zadania',
            type: 'SELECT',
            options: [
                { label: 'W trakcie', value: 'IN_PROGRESS' },
                { label: 'Ukonczone', value: 'COMPLETED' },
            ],
        },
        {
            name: 'startDate',
            label: 'Data',
            isRequired: false,
            placeholder: 'Wybierz date',
            type: 'DATE',
        },
        {
            name: 'assignedToId',
            label: 'Przypisany do',
            isRequired: false,
            placeholder: 'Wybierz przypisanego',
            type: 'SEARCH',
            searchType: 'user',
        },
        {
            name: 'type',
            label: 'Zadanie online',
            isRequired: false,
            placeholder: '',
            type: 'BOOL',
        },
    ]
}

/**
 * Adds a new task.
 *
 * @param param0
 * @returns
 */
export const add = async (
    payload: TaskCreationAttributes,
    user: User
): Promise<Task> => {
    try {
        const task = new Task({ ...payload, createdById: user.id })
        await task.save()

        const added = await Task.findByPk(task.id, {
            include: [
                { model: Team, as: 'hostTeam' },
                { model: Team, as: 'guestTeam' },
            ],
        })

        if (!added) {
            throw new NotFoundError('Could not find added task in database.')
        }

        return added
    } catch (err) {
        throw new ModelValidationError(err.message)
    }
}

/**
 * Returns all tasks.
 */
export const getAll = async (): Promise<Task[]> => {
    return await Task.findAll({
        include: [
            { model: Team, as: 'hostTeam' },
            { model: Team, as: 'guestTeam' },
        ],
    })
}

/**
 * Removes the task from the database.
 *
 * @param id
 */
export const remove = async (id: string): Promise<void> => {
    const task = await Task.findOne({ where: { id } })

    if (task) {
        return await task.destroy()
    }
}
