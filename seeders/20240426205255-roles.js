'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.bulkInsert('Roles', [
            {
                id: '5f26f9d7-e4fc-4662-bafd-a4d34222130e',
                name: 'admin',
                createdAt: new Date(Date.now()),
                updatedAt: new Date(Date.now()),
            },
            {
                id: 'dd5ec76a-c088-4219-a8b0-0227713a896e',
                name: 'Dyrektor sportowy',
                createdAt: new Date(Date.now()),
                updatedAt: new Date(Date.now()),
            },
            {
                id: '4ce14bb9-e910-4a20-bf80-2da3719ca1e3',
                name: 'Menadżer regionu',
                createdAt: new Date(Date.now()),
                updatedAt: new Date(Date.now()),
            },
            {
                id: 'c254b01e-2723-4786-b24e-b37fba1dd92e',
                name: 'Skaut',
                createdAt: new Date(Date.now()),
                updatedAt: new Date(Date.now()),
            },
            {
                id: '1e549df7-82d8-44c5-8b62-541f8a663e5d',
                name: 'Analityk',
                createdAt: new Date(Date.now()),
                updatedAt: new Date(Date.now()),
            },
        ])
    },

    async down(queryInterface, Sequelize) {
        return queryInterface.bulkDelete('Roles', null, {})
    },
}
