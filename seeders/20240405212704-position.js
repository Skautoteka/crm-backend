'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.bulkInsert('Position', [
            {
                id: '9d5c9fe8-3f5d-4fbd-9815-c2c2b703d44b',
                name: 'Goalkeeper',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                id: '55fd6f3f-f7d5-4f0a-8d82-40ed2f3d784b',
                name: 'Defender',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                id: 'b53f00fc-7d7a-4c4d-8ff6-5dba8eecdcfb',
                name: 'Midfielder',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                id: 'be5a54e7-d0cc-4834-a55b-3d867054ce1e',
                name: 'Forward',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
        ])
    },

    async down(queryInterface, Sequelize) {
        return queryInterface.bulkDelete('Position', null, {})
    },
}
