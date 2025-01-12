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
                name: 'Skrzydłowy',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                id: 'FORWARD',
                name: 'Cofniety napastnik',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                id: 'CENTRE-BACK',
                name: 'Srodkowy obrońca',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                id: 'LEFT-BACK',
                name: 'Lewy obrońca',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                id: 'RIGHT-BACK',
                name: 'Prawy obrońca',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                id: 'DEFENSIVE-MIDFIELD',
                name: 'Defensywny pomocnik',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                id: 'ATTACKING-MIDFIELD',
                name: 'Ofensywny pomocnik',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                id: 'LEFT-WINGER',
                name: 'Lewy skrzydłowy',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                id: 'RIGHT-WINGER',
                name: 'Prawy skrzydłowy',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                id: 'LEFT-FORWARD',
                name: 'Lewy napastnik',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                id: 'RIGHT-FORWARD',
                name: 'Prawy napastnik',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                id: 'CENTRE-FORWARD',
                name: 'Środkowy napastnik',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                id: 'MIDFIELDER',
                name: 'Pomocnik',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                id: 'LEFT-MIDFIELDER',
                name: 'Lewy pomocnik',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                id: 'RIGHT-MIDFIELDER',
                name: 'Prawy pomocnik',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                id: 'STRIKER',
                name: 'Napastnik',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
        ])
        ])
    },

    async down(queryInterface, Sequelize) {
        return queryInterface.bulkDelete('Positions', null, {})
    },
}
