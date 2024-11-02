'use strict'
const bcrypt = require('bcrypt')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        const hashPassword = async (password) => {
            const saltRounds = 10
            const salt = await bcrypt.genSalt(saltRounds)
            return await bcrypt.hash(password, salt)
        }

        try {
            await queryInterface.removeConstraint('Users', 'email')
        } catch (error) {
            console.log('No existing constraint found. Skipping removal.')
        }
        await queryInterface.addConstraint('Users', {
            fields: ['email'],
            type: 'unique',
            name: 'unique_email_constraint',
        })

        const users = [
            {
                id: '0a1868a7-cc98-4b57-8807-2c7f8e556c1b',
                firstName: 'Jakub',
                lastName: 'Prus',
                email: 'jakub@jakub',
                password: await hashPassword('1234'),
                roleId: '5f26f9d7-e4fc-4662-bafd-a4d34222130e',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
        ]

        await queryInterface.bulkInsert('Users', users, {})
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete('Users', null, {})

        try {
            await queryInterface.removeConstraint(
                'Users',
                'unique_email_constraint'
            )
        } catch (error) {
            console.log('No existing constraint found. Skipping removal.')
        }
    },
}