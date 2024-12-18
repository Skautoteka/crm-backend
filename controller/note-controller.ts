import { ISingleInputConfig } from '../interface'
import { ModelValidationError } from '../error/model-validation'
import { NotFoundError } from '../error/not-found'
import User from '../db/models/user.model'
import Team from '../db/models/team.model'
import Note, { NoteCreationAttributes } from '../db/models/note.model'

/**
 * Gets the model for the note model creation.
 *
 * @returns
 */
export const getNoteCreateFields = async (): Promise<ISingleInputConfig[]> => {
    return [
        {
            name: 'name',
            label: 'Nazwa',
            isRequired: true,
            placeholder: 'Wpisz nazwę notatki',
            value: `Notatka ${(await Note.count()) + 1}`,
            type: 'TEXT',
        },
        {
            name: 'status',
            label: 'Status notatki',
            isRequired: true,
            placeholder: 'Wybierz status notatki',
            value: getDefaultNoteStatus(),
            type: 'SELECT',
            options: [
                { label: 'W trakcie', value: 'IN_PROGRESS' },
                { label: 'Ukonczony', value: 'COMPLETED' },
            ],
        },
        {
            name: 'teamId',
            label: 'Zespół',
            isRequired: false,
            placeholder: 'Wybierz zespół notatki',
            type: 'SEARCH',
            searchType: 'team',
        },
        {
            name: 'playerNumber',
            label: 'Numer zawodnika',
            isRequired: false,
            placeholder: 'Wpisz numer zawodnika',
            type: 'NUMBER',
            min: 0,
        },
        {
            name: 'content',
            label: 'Treść',
            isRequired: false,
            placeholder: 'Wpisz treść notatki',
            type: 'TEXTAREA',
        },
        {
            name: 'evaluation',
            label: 'Ocena',
            isRequired: false,
            placeholder: 'Wpisz ocenę zawodnika',
            type: 'NUMBER',
            min: 1,
            max: 10,
        },
    ]
}

/**
 * Gets the model for the note.
 *
 * @param id - The ID of the note to fetch.
 * @returns A list of input configurations for the note.
 */
export const getNoteFields = async (
    id: string
): Promise<ISingleInputConfig[]> => {
    try {
        const note = await Note.findOne({
            where: { id },
            include: [Team],
        })

        if (!note) {
            console.error(`No note found for id: ${id}`)
            throw new Error(`note with id ${id} not found.`)
        }

        return [
            {
                name: 'name',
                label: 'Nazwa',
                isRequired: true,
                placeholder: 'Wpisz nazwę notatki',
                value: note?.name,
                type: 'TEXT',
            },
            {
                name: 'status',
                label: 'Status notatki',
                isRequired: false,
                placeholder: 'Wybierz status notatki',
                value: note?.status,
                type: 'SELECT',
                options: [
                    { label: 'W trakcie', value: 'IN_PROGRESS' },
                    { label: 'Ukonczony', value: 'COMPLETED' },
                ],
            },
            {
                name: 'teamId',
                label: 'Zespół',
                isRequired: false,
                placeholder: 'Wybierz zespół',
                value: note?.team,
                type: 'SEARCH',
                searchType: 'team',
            },
            {
                name: 'playerNumber',
                label: 'Numer zawodnika',
                isRequired: false,
                placeholder: 'Wpisz numer zawodnika',
                value: note?.playerNumber,
                type: 'NUMBER',
                min: 0,
            },
            {
                name: 'content',
                label: 'Treść',
                isRequired: false,
                placeholder: 'Wpisz treść notatki',
                value: note?.content,
                type: 'TEXTAREA',
            },
            {
                name: 'evaluation',
                label: 'Ocena',
                isRequired: false,
                placeholder: 'Wpisz ocenę zawodnika',
                value: note?.evaluation,
                type: 'NUMBER',
                min: 1,
                max: 10,
            },
        ]
    } catch (error) {
        console.error('Error fetching note fields:', error)
        throw new Error('Unable to fetch note fields. Please try again later.')
    }
}

/**
 * Removes a note from the database.
 *
 * @param id
 * @returns
 */
export const remove = async (id: string): Promise<void> => {
    const note = await Note.findOne({ where: { id } })

    if (note) {
        return await note.destroy()
    }
}

/**
 * Adds a note to the database
 *
 * @param param0
 * @returns
 */
export const add = async (
    payload: NoteCreationAttributes,
    user: User
): Promise<Note> => {
    try {
        const note = new Note({ ...payload, createdById: user.id })
        console.log('note', note)
        if (!payload.status) {
            note.status = getDefaultNoteStatus()
        }

        const { id } = await note.save()

        const added = await Note.findByPk(id, {
            include: [Team],
        })
        console.log('added', added)

        if (!added) {
            throw new NotFoundError('Could not find added report.')
        }

        return added
    } catch (err) {
        console.log(err)
        throw new ModelValidationError(err.message)
    }
}

/**
 * Returns all notes.
 *
 * @returns
 */
export const getAll = async (user: User | null = null): Promise<Note[]> => {
    if (!user) {
        return await Note.findAll({
            include: [Team],
        })
    } else {
        return await Note.findAll({
            include: [Team],
            where: { createdById: user?.id },
        })
    }
}

/**
 * Returns all notes based on task id.
 *
 * @param taskId - The task ID used to filter notes.
 * @returns - List of notes based on the taskId.
 */
export const getAllByTaskId = async (taskId: string): Promise<Note[]> => {
    const data =
        (await Note.findAll({
            include: [Team],
            where: { taskId },
        })) ?? null
    return data
}

/**
 * Updates note and its related models
 */
export const updateNote = async (updateData: Note): Promise<Note> => {
    try {
        const note = await Note.findByPk(updateData.id)
        if (!note) {
            throw new NotFoundError('Note not found')
        }

        await Note.upsert({
            id: updateData.id,
            name: updateData.name,
            status: updateData.status,
            evaluation: updateData.evaluation,
            content: updateData.content,
            playerNumber: updateData.playerNumber,
            teamId: updateData.teamId,
        } as Note)

        await note.reload({
            include: [Team],
        })

        return note
    } catch (error) {
        throw new ModelValidationError(error.message)
    }
}

const getDefaultNoteStatus = (): 'IN_PROGRESS' | 'COMPLETED' => {
    return 'IN_PROGRESS'
}
