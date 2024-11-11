'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.bulkInsert('Tasks', [
            {
                id: 'b7a42c1e-6d97-4f84-a1fa-5a1e9c7a7c74',
                status: 'Scheduled',
                type: true,
                location: 'Camp Nou',
                startDate: new Date('2024-11-10T15:00:00Z'),
                hostTeamId: 'de81af74-1f4a-4b87-9b90-e975af472577',
                guestTeamId: 'c4bc4290-f729-48e5-81d7-cd612d8afea0',
                userId: '0a1868a7-cc98-4b57-8807-2c7f8e556c1b',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                id: 'd2b3c8e4-8c9e-4e84-a7de-3c0a8d07c72e',
                status: 'Completed',
                type: false,
                location: 'Anfield',
                startDate: new Date('2024-10-20T17:00:00Z'),
                hostTeamId: 'efc13325-420d-4995-93e9-6198dd2216fc',
                guestTeamId: '806f4fbe-2f92-4b33-a99c-ef6e64951af1',
                userId: '0a1868a7-cc98-4b57-8807-2c7f8e556c1b',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                id: '8f4d3d5f-71cf-4b7e-8f53-7e09c8d6c73f',
                status: 'In Progress',
                type: true,
                location: 'Stadium Poznan',
                startDate: new Date('2024-12-05T19:30:00Z'),
                hostTeamId: '002e573c-3a98-4ed8-8bb6-e3a178b9731f',
                guestTeamId: 'de81af74-1f4a-4b87-9b90-e975af472577',
                userId: '0a1868a7-cc98-4b57-8807-2c7f8e556c1b',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
        ])
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete('Tasks', null, {})
    },
}
