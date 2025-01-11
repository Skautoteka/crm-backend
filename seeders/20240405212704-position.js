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
                id: 'SIDE_DEFENDER',
                name: 'Boczny Obrońca',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                id: 'CENTERAL_DEFENDER',
                name: 'Środkowy Obrońca',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                id: 'WING_BACK',
                name: 'Wahadłowy',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                id: 'DEFENSIVE_MIDFIELDER',
                name: 'Defensywny Pomocnik',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                id: 'CENTRAL_MIDFIELDER',
                name: 'Środkowy Pomocnik',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                id: 'OFFENSIVE_MIDFIELDER',
                name: 'Ofensywny Pomocnik',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                id: 'WINGMAN_MIDFIELDER',
                name: 'Skrzydłowy Pomocnik',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                id: 'CENTRAL_FORWARD',
                name: 'Środkowy Napastnik',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                id: 'WINGMAN_FORWARD',
                name: 'Skrzydłowy Napastnik',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                id: 'FALSE_NINE',
                name: 'Fałszywa Dziewiątka',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
        ])
    },

    async down(queryInterface, Sequelize) {
        return queryInterface.bulkDelete('Positions', null, {})
    },
}
