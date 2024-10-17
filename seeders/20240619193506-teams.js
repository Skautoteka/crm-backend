'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.bulkInsert('Teams', [
            {
                id: 'de81af74-1f4a-4b87-9b90-e975af472577',
                name: 'Barcelona',
                createdAt: new Date(Date.now()),
                updatedAt: new Date(Date.now()),
            },
            {
                id: 'c4bc4290-f729-48e5-81d7-cd612d8afea0',
                name: 'Real Madryt',
                createdAt: new Date(Date.now()),
                updatedAt: new Date(Date.now()),
            },
            {
                id: '002e573c-3a98-4ed8-8bb6-e3a178b9731f',
                name: 'Lech Poznan',
                createdAt: new Date(Date.now()),
                updatedAt: new Date(Date.now()),
            },
            {
                id: 'efc13325-420d-4995-93e9-6198dd2216fc',
                name: 'Liverpool',
                createdAt: new Date(Date.now()),
                updatedAt: new Date(Date.now()),
            },
            {
                id: '806f4fbe-2f92-4b33-a99c-ef6e64951af1',
                name: 'Chelsea',
                createdAt: new Date(Date.now()),
                updatedAt: new Date(Date.now()),
            },
        ])
    },

    async down(queryInterface, Sequelize) {
        return queryInterface.bulkDelete('Teams', null, {})
    },
}
