'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.bulkInsert('Regions', [
            {
                id: '78347847-91f6-452a-b4f0-52d6d8f31ee8',
                name: 'Wielkopolska',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                id: 'fdb1d820-b23b-49e6-a5e0-547f9df90686',
                name: 'Zachodnio-pomorskie',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                id: '753f3124-00b5-4c54-a468-57c064a19467',
                name: 'Pomorskie',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                id: 'd28f5e4b-a149-4d3f-8043-4b6bfea59435',
                name: 'Małopolskie',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
        ])
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete('Regions', null, {})
    },
}
