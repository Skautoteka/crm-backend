import User from '../db/models/user.model'
import Role from '../db/models/role.model'

export const getAll = async () => {
    const users = await User.findAll({
        include: [
            {
                model: Role,
                attributes: ['name'],
            },
        ],
    })

    return users.map((user) => ({
        ...user.get(),
        role: user.role?.name,
    }))
}