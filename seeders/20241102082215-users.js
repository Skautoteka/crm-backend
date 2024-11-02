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
            {
                id: '23512d44-e0e0-4ed3-a09c-32603587dbf8',
                firstName: 'Dominik',
                lastName: 'Paczkowski',
                email: 'dominik@dominik',
                password: await hashPassword('scout123'),
                roleId: '5f26f9d7-e4fc-4662-bafd-a4d34222130e',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                id: '9b1e9a92-404c-44e5-bea3-1724d00f1db6',
                firstName: 'Damian',
                lastName: 'Kowalski',
                email: 'damian@damian',
                password: await hashPassword('1234'),
                roleId: '5f26f9d7-e4fc-4662-bafd-a4d34222130e',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                id: 'c4889946-9181-4d3b-b3a2-8a980b008546',
                firstName: 'Adrian',
                lastName: 'Nowicki',
                email: 'adrian@adrian',
                password: await hashPassword('1234'),
                roleId: '5f26f9d7-e4fc-4662-bafd-a4d34222130e',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                id: '98c789ea-049b-4aa3-9b23-5102d0e81c14',
                firstName: 'Skaut',
                lastName: 'Użytkownik',
                email: 'skaut@skaut',
                password: await hashPassword('1234'),
                roleId: 'c254b01e-2723-4786-b24e-b37fba1dd92e',
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