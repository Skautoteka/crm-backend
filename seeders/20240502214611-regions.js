'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.bulkInsert('Regions', [
            {
                id: '24a4b3f0-8c47-4ffb-b5cf-3e2f3d9cb1f0',
                name: 'Dolnośląskie',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                id: 'a5f735d9-44e8-47c3-8b83-02e1bfa3bd48',
                name: 'Kujawsko-pomorskie',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
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
                id: '3e94c739-c15c-4ba1-a4d7-486fc11e4e24',
                name: 'Lubelskie',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                id: 'd28f5e4b-a149-4d3f-8043-4b6bfea59435',
                name: 'Małopolskie',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                id: '8f391b8c-43c9-4c89-93b8-8768c74de7a5',
                name: 'Łódzkie',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                id: '374e6477-2f50-48c8-9627-82f7808cf46e',
                name: 'Lubuskie',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                id: '12298d9f-8c9b-4c2e-85e7-c9fc4bc2c9a5',
                name: 'Opolskie',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                id: '902aed8f-b97a-4e6b-82b7-957e2f7b9b5a',
                name: 'Podkarpackie',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                id: '60afc865-7644-4b69-9a32-ceddbdca8cc2',
                name: 'Podlaskie',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                id: '23db1b22-f472-4e20-87ba-f93fffe093d3',
                name: 'Śląskie',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                id: '48c20c02-b1b7-4f7b-a1cc-fbfca0a8c086',
                name: 'Świętokrzyskie',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                id: 'b25a8f0d-3b54-4040-b344-4699bff0fa49',
                name: 'Warmińsko-mazurskie',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                id: 'bbfa7ea5-0d0f-4d7d-9e07-0b6481d84c4d',
                name: 'Mazowieckie',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
        ])
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete('Regions', null, {})
    },
}
