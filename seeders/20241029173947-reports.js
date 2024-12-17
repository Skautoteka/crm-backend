'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.bulkInsert('Reports', [
            {
                id: '276232af-8b64-414f-b574-d4bb5ff10358',
                name: 'Raport #1',
                status: 'IN_PROGRESS',
                playerId: '4b4b4076-c6aa-4601-841e-ba51f7e60c32',
                taskId: 'b7a42c1e-6d97-4f84-a1fa-5a1e9c7a7c74',
                createdAt: new Date(Date.now()),
                updatedAt: new Date(Date.now()),
            },
            {
                id: '89bca610-c842-42d6-892c-e9ecfea85760',
                name: 'Raport #2',
                status: 'COMPLETED',
                playerId: 'bfaee0f7-2e44-4182-a78f-a03253eee601',
                taskId: 'b7a42c1e-6d97-4f84-a1fa-5a1e9c7a7c74',
                createdAt: new Date(Date.now()),
                updatedAt: new Date(Date.now()),
            },
            {
                id: 'ee918037-4d57-4552-86d6-16701011fd43',
                name: 'Raport #3',
                status: 'IN_PROGRESS',
                playerId: 'bfaee0f7-2e44-4182-a78f-a03253eee601',
                taskId: 'd2b3c8e4-8c9e-4e84-a7de-3c0a8d07c72e',
                createdAt: new Date(Date.now()),
                updatedAt: new Date(Date.now()),
            },
            {
                id: '8dc3f345-7f02-44de-a0d7-466bbf3a4ac1',
                name: 'Raport #4',
                status: 'COMPLETED',
                playerId: '18228bad-4d09-4773-8aeb-73938a2456c1',
                taskId: '8f4d3d5f-71cf-4b7e-8f53-7e09c8d6c73f',
                createdAt: new Date(Date.now()),
                updatedAt: new Date(Date.now()),
            },
            {
                id: '692b678d-ba81-4b7d-8d17-5aac71aee80e',
                name: 'Raport #5',
                status: 'IN_PROGRESS',
                playerId: '18228bad-4d09-4773-8aeb-73938a2456c1',
                taskId: '8f4d3d5f-71cf-4b7e-8f53-7e09c8d6c73f',
                createdAt: new Date(Date.now()),
                updatedAt: new Date(Date.now()),
            },
        ])
    },

    async down(queryInterface, Sequelize) {
        return queryInterface.bulkDelete('Reports', null, {})
    },
}
