'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.bulkInsert('Notes', [
            {
                id: '276232af-8b64-414f-b574-d4bb5ff10358',
                name: 'Notatka #1',
                status: 'IN_PROGRESS',
                content: 'To jest notatka #1',
                evaluation: 10,
                taskId: '8f4d3d5f-71cf-4b7e-8f53-7e09c8d6c73f',
                teamId: 'de81af74-1f4a-4b87-9b90-e975af472577',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                id: '89bca610-c842-42d6-892c-e9ecfea85760',
                name: 'Notatka #2',
                status: 'COMPLETED',
                content: 'To jest notatka #2',
                evaluation: 9,
                taskId: '8f4d3d5f-71cf-4b7e-8f53-7e09c8d6c73f',
                teamId: 'de81af74-1f4a-4b87-9b90-e975af472577',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                id: 'ee918037-4d57-4552-86d6-16701011fd43',
                name: 'Notatka #3',
                status: 'COMPLETED',
                content: 'To jest notatka #3',
                evaluation: 4,
                taskId: '806f4fbe-2f92-4b33-a99c-ef6e64951af1',
                teamId: 'de81af74-1f4a-4b87-9b90-e975af472577',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                id: '8dc3f345-7f02-44de-a0d7-466bbf3a4ac1',
                name: 'Notatka #4',
                status: 'IN_PROGRESS',
                content: 'To jest notatka #4',
                evaluation: 8,
                taskId: 'efc13325-420d-4995-93e9-6198dd2216fc',
                teamId: 'de81af74-1f4a-4b87-9b90-e975af472577',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                id: '692b678d-ba81-4b7d-8d17-5aac71aee80e',
                name: 'Notatka #5',
                status: 'COMPLETED',
                content: 'To jest notatka #5',
                evaluation: 2,
                taskId: '8f4d3d5f-71cf-4b7e-8f53-7e09c8d6c73f',
                teamId: '002e573c-3a98-4ed8-8bb6-e3a178b9731f',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
        ])
    },

    async down(queryInterface, Sequelize) {
        return queryInterface.bulkDelete('Notes', null, {})
    },
}
