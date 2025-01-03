'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.bulkInsert('Roles', [
            {
                id: 'ADMIN',
                name: 'admin',
                createdAt: new Date(Date.now()),
                updatedAt: new Date(Date.now()),
            },
            {
                id: 'SPORTS_DIRECTOR',
                name: 'Dyrektor sportowy',
                createdAt: new Date(Date.now()),
                updatedAt: new Date(Date.now()),
            },
            {
                id: 'REGION_MANAGER',
                name: 'Menadżer regionu',
                createdAt: new Date(Date.now()),
                updatedAt: new Date(Date.now()),
            },
            {
                id: 'SCOUT',
                name: 'Skaut',
                createdAt: new Date(Date.now()),
                updatedAt: new Date(Date.now()),
            },
            {
                id: 'ANALYTICS',
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
