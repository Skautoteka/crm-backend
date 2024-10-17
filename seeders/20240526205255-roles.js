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
                id: 'c254b01e-2723-4786-b24e-b37fba1dd92e',
                name: 'scout',
                createdAt: new Date(Date.now()),
                updatedAt: new Date(Date.now()),
            },
        ])
    },

    async down(queryInterface, Sequelize) {
        return queryInterface.bulkDelete('Roles', null, {})
    },
}
