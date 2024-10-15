import Task, { TaskCreationAttributes } from '../db/models/task.model'
import { ModelValidationError } from '../error/model-validation'
import { ISingleInputConfig } from '../interface'

/**
 * Gets the model for the task model creation.
 *
 * @returns
 */
export const getTaskCreateFields = async (): Promise<ISingleInputConfig[]> => {
    return [
        {
            name: 'hostTeam',
            label: 'Drużyna gości',
            isRequired: true,
            placeholder: 'Wpisz nazwę drużyny',
            type: 'TEXT',
        },
        {
            name: 'guestTeam',
            label: 'Drużyna gospodarzy',
            isRequired: true,
            placeholder: 'Wyszukaj druzyne',
            type: 'SEARCH',
            searchType: 'team'
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
            ]
        },
        {
            name: 'startDate',
            label: 'Data',
            isRequired: false,
            placeholder: 'Wybierz date',
            type: 'DATE'
        },
        {
            name: 'type',
            label: 'Zadanie online',
            isRequired: false,
            placeholder: '',
            type: 'BOOL'
        },
    ]
}

/**
 * Adds a new task.
 *
 * @param param0
 * @returns
 */
export const add = async (payload: TaskCreationAttributes): Promise<Task> => {
    try {
        const task = new Task(payload)
        return await task.save()
    } catch (err) {
        throw new ModelValidationError(err.message)
    }
}

/**
 * Returns all tasks.
 */
export const getAll = async (): Promise<Task[]> => {
    return await Task.findAll()
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
