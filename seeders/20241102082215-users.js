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
                phoneNumber: '123456789',
                password: await hashPassword('1234'),
                roleId: '5f26f9d7-e4fc-4662-bafd-a4d34222130e',
                regionId: null,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                id: '23512d44-e0e0-4ed3-a09c-32603587dbf8',
                firstName: 'Dominik',
                lastName: 'Paczkowski',
                email: 'dominik@dominik',
                phoneNumber: '123456789',
                password: await hashPassword('scout123'),
                roleId: '5f26f9d7-e4fc-4662-bafd-a4d34222130e',
                regionId: null,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                id: '9b1e9a92-404c-44e5-bea3-1724d00f1db6',
                firstName: 'Damian',
                lastName: 'Kowalski',
                phoneNumber: '123456789',
                email: 'damian@damian',
                password: await hashPassword('1234'),
                roleId: '5f26f9d7-e4fc-4662-bafd-a4d34222130e',
                regionId: null,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                id: 'c4889946-9181-4d3b-b3a2-8a980b008546',
                firstName: 'Adrian',
                lastName: 'Nowicki',
                email: 'adrian@adrian',
                phoneNumber: '123456789',
                password: await hashPassword('1234'),
                roleId: '5f26f9d7-e4fc-4662-bafd-a4d34222130e',
                regionId: null,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                id: '98c789ea-049b-4aa3-9b23-5102d0e81c14',
                firstName: 'Skaut',
                lastName: '1',
                email: 'skaut1@skaut',
                phoneNumber: '123456789',
                password: await hashPassword('1234'),
                roleId: 'c254b01e-2723-4786-b24e-b37fba1dd92e',
                regionId: '78347847-91f6-452a-b4f0-52d6d8f31ee8',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                id: '493ddad9-0953-4b5c-b7f6-d9ffb7187ea3',
                firstName: 'Skaut',
                lastName: '2',
                email: 'skaut2@skaut',
                phoneNumber: '123456789',
                password: await hashPassword('1234'),
                roleId: 'c254b01e-2723-4786-b24e-b37fba1dd92e',
                regionId: 'fdb1d820-b23b-49e6-a5e0-547f9df90686',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                id: 'ec63aca1-09d5-42c1-b88e-c33e5e90ea84',
                firstName: 'Skaut',
                lastName: '3',
                email: 'skaut3@skaut',
                phoneNumber: '123456789',
                password: await hashPassword('1234'),
                roleId: 'c254b01e-2723-4786-b24e-b37fba1dd92e',
                regionId: '753f3124-00b5-4c54-a468-57c064a19467',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                id: 'e76213f3-43bd-42ba-862a-5e497ef0addc',
                firstName: 'Skaut',
                lastName: '4',
                email: 'skaut4@skaut',
                phoneNumber: '123456789',
                password: await hashPassword('1234'),
                roleId: 'c254b01e-2723-4786-b24e-b37fba1dd92e',
                regionId: 'd28f5e4b-a149-4d3f-8043-4b6bfea59435',
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