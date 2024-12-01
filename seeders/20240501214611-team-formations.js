'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.bulkInsert('TeamFormations', [
            {
                id: '1a2b3c4d-1111-4111-a111-111111111111',
                name: 'Ustawienie 4-4-2',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                id: '2b3c4d5e-2222-4222-a222-222222222222',
                name: 'Ustawienie 4-3-3',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                id: '3c4d5e6f-3333-4333-a333-333333333333',
                name: 'Ustawienie 3-5-2',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                id: '4d5e6f7g-4444-4444-a444-444444444444',
                name: 'Ustawienie 4-2-3-1',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                id: '5e6f7g8h-5555-4555-a555-555555555555',
                name: 'Ustawienie 5-3-2',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                id: '6f7g8h9i-6666-4666-a666-666666666666',
                name: 'Ustawienie 3-4-3',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
        ])
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete('TeamFormations', null, {})
    },
}
