'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.bulkInsert('Players', [
            {
                id: '18228bad-4d09-4773-8aeb-73938a2456c1',
                version: 1,
                firstName: 'Cristiano',
                lastName: 'Ronaldo',
                sex: 'Mężczyzna',
                nationality: 'Portugalska',
                positionId: 'FORWARD',
                birthYear: 1984,
                height: 187,
                weight: 83,
                physique: 'Atletyczna',
                teamId: '002e573c-3a98-4ed8-8bb6-e3a178b9731f',
                createdAt: new Date(Date.now()),
                updatedAt: new Date(Date.now()),
            },
            {
                id: '4b4b4076-c6aa-4601-841e-ba51f7e60c32',
                version: 1,
                firstName: 'Damian',
                lastName: 'Kowalski',
                sex: 'Mężczyzna',
                nationality: 'Polska',
                positionId: 'DEFENSE',
                birthYear: 1994,
                height: 185,
                weight: 74,
                physique: 'Atletyczna',
                teamId: '806f4fbe-2f92-4b33-a99c-ef6e64951af1',
                createdAt: new Date(Date.now()),
                updatedAt: new Date(Date.now()),
            },
            {
                id: 'bfaee0f7-2e44-4182-a78f-a03253eee601',
                version: 1,
                firstName: 'Jakub',
                lastName: 'Prus',
                sex: 'Mężczyzna',
                nationality: 'Polska',
                positionId: 'WINGER',
                birthYear: 1998,
                height: 192,
                weight: 80,
                physique: 'Atletyczna',
                teamId: 'c4bc4290-f729-48e5-81d7-cd612d8afea0',
                createdAt: new Date(Date.now()),
                updatedAt: new Date(Date.now()),
            },
        ])

    },

    async down(queryInterface, Sequelize) {
        return queryInterface.bulkDelete('Players', null, {})
    },
}
