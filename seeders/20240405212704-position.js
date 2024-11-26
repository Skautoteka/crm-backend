'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.bulkInsert('Positions', [
            {
                id: 'GOALKEEPER',
                name: 'Bramkarz',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                id: 'DEFENSE',
                name: 'Obrońca',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                id: 'WINGER',
                name: 'Pomocnik',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                id: 'FORWARD',
                name: 'Napastnik',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
        ])
    },

    async down(queryInterface, Sequelize) {
        return queryInterface.bulkDelete('Positions', null, {})
    },
}
