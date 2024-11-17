'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.bulkInsert('PlayerTraits', [
            {
                id: 'e0a6b3f5-1234-4f3b-912d-b44a63a1e2b8',
                name: 'Refleks',
                createdAt: new Date(Date.now()),
                updatedAt: new Date(Date.now()),
            },
            {
                id: 'c1b4a3c7-5678-4f3d-89ab-c55d2e8a2c89',
                name: 'Siła fizyczna',
                createdAt: new Date(Date.now()),
                updatedAt: new Date(Date.now()),
            },
            {
                id: 'b2d4e3a9-9012-4e2c-b67d-d66f1a7b3d99',
                name: 'Szybkość',
                createdAt: new Date(Date.now()),
                updatedAt: new Date(Date.now()),
            },
            {
                id: 'a3e5c6b1-3456-4f3a-c12d-e77f3a1c1a88',
                name: 'Przechwyty',
                createdAt: new Date(Date.now()),
                updatedAt: new Date(Date.now()),
            },
            {
                id: 'd4f6e7a2-7890-4f2b-b34e-f88g4h1e2f77',
                name: 'Wszechstronność',
                createdAt: new Date(Date.now()),
                updatedAt: new Date(Date.now()),
            },
            {
                id: 'f5g7h8b3-8901-4f3c-c45d-g99h5i2j3k11',
                name: 'Kreatywność',
                createdAt: new Date(Date.now()),
                updatedAt: new Date(Date.now()),
            },
            {
                id: '7138a7de-95d0-4464-81a2-bb7799211605',
                name: 'Wykończenie',
                createdAt: new Date(Date.now()),
                updatedAt: new Date(Date.now()),
            },
            {
                id: '689561f8-0c7b-46fb-98ce-c61a372b7136',
                name: 'Ustawienie',
                createdAt: new Date(Date.now()),
                updatedAt: new Date(Date.now()),
            },
            {
                id: '1e1bd441-af69-405a-8567-11649c10c591',
                name: 'Gra głową',
                createdAt: new Date(Date.now()),
                updatedAt: new Date(Date.now()),
            },
            {
                id: 'a6e1e527-0c17-4d35-8ec3-89012b05de3e',
                name: 'Kondycja',
                createdAt: new Date(Date.now()),
                updatedAt: new Date(Date.now()),
            },
            {
                id: 'fad61d33-3914-4f9c-bbce-540b0dd4e027',
                name: 'Wytrzymałość',
                createdAt: new Date(Date.now()),
                updatedAt: new Date(Date.now()),
            },
            {
                id: '39b6b785-72f2-41b1-81ca-315c34cd7f73',
                name: 'Kontrola piłki',
                createdAt: new Date(Date.now()),
                updatedAt: new Date(Date.now()),
            },
            {
                id: '276d5510-1f40-420a-86c8-73504b2288bd',
                name: 'Podania',
                createdAt: new Date(Date.now()),
                updatedAt: new Date(Date.now()),
            },
            {
                id: '29ade52c-b41f-4d6f-b165-4b2d7f4b04b6',
                name: 'Drybling',
                createdAt: new Date(Date.now()),
                updatedAt: new Date(Date.now()),
            },
            {
                id: '2689c3b7-6115-4b6b-8836-f2998985384d',
                name: 'Elastyczność',
                createdAt: new Date(Date.now()),
                updatedAt: new Date(Date.now()),
            },
            {
                id: '151fa372-bd28-4d63-8474-382248495a54',
                name: 'Gra na linii',
                createdAt: new Date(Date.now()),
                updatedAt: new Date(Date.now()),
            },
            {
                id: '57c52a90-6ba1-4abb-8291-06396f1cd64a',
                name: 'Przewidywanie',
                createdAt: new Date(Date.now()),
                updatedAt: new Date(Date.now()),
            },
            {
                id: '71001f25-5b68-4a23-9928-1b42b8748976',
                name: 'Gra 1 na 1',
                createdAt: new Date(Date.now()),
                updatedAt: new Date(Date.now()),
            },
            {
                id: 'dad66738-d180-471d-9652-a77817a5098f',
                name: 'Dośrodkowania',
                createdAt: new Date(Date.now()),
                updatedAt: new Date(Date.now()),
            },
            {
                id: '176e5c77-aafe-4c27-845b-27d0253fa23d',
                name: 'Rozegranie',
                createdAt: new Date(Date.now()),
                updatedAt: new Date(Date.now()),
            },
            {
                id: '197b3fb7-e2c6-4b0b-a06b-7d6f5742a515',
                name: 'Celność strzałów',
                createdAt: new Date(Date.now()),
                updatedAt: new Date(Date.now()),
            },
            {
                id: '5a394cc5-3ca0-48b7-a08e-f7407ce6426b',
                name: 'Gra nogami',
                createdAt: new Date(Date.now()),
                updatedAt: new Date(Date.now()),
            },
            {
                id: 'c55f7fb3-6aac-4cac-ac16-8fc431e35da7',
                name: 'Odbiór',
                createdAt: new Date(Date.now()),
                updatedAt: new Date(Date.now()),
            },
            {
                id: 'ec8e6219-aab4-4772-8364-da29ec7fb4f5',
                name: 'Wrzutki',
                createdAt: new Date(Date.now()),
                updatedAt: new Date(Date.now()),
            },
            {
                id: '3eff642c-d6c1-4c58-a5d8-a7de2b48ecb1',
                name: 'Równowaga (of./def.)',
                createdAt: new Date(Date.now()),
                updatedAt: new Date(Date.now()),
            },
            {
                id: 'fd4b12f8-991f-4779-9a58-34ebc98f8c60',
                name: 'Wizja gry',
                createdAt: new Date(Date.now()),
                updatedAt: new Date(Date.now()),
            },
            {
                id: 'c1c4dd83-2fdd-41f9-8bea-d43f6d9cc25c',
                name: 'Komunikacja',
                createdAt: new Date(Date.now()),
                updatedAt: new Date(Date.now()),
            },
            {
                id: 'fa5ac271-7a0f-4c73-8144-5bdb2eed5d8d',
                name: 'Wsparcie ofensywne',
                createdAt: new Date(Date.now()),
                updatedAt: new Date(Date.now()),
            },
            {
                id: 'b217aa52-1890-4a6b-b13c-2ebebb07a9b1',
                name: 'Zdolności defensywne',
                createdAt: new Date(Date.now()),
                updatedAt: new Date(Date.now()),
            },
            {
                id: '92596f2d-1bf8-4759-b35d-a6f1fcd8018a',
                name: 'Odpowiedzialność',
                createdAt: new Date(Date.now()),
                updatedAt: new Date(Date.now()),
            },
            {
                id: '680af949-7b0e-4542-9929-d247b0d9e675',
                name: 'Wsparcie defensywne',
                createdAt: new Date(Date.now()),
                updatedAt: new Date(Date.now()),
            },
            {
                id: '97663be5-21eb-4560-a037-91bd581386e0',
                name: 'Ruch bez piłki',
                createdAt: new Date(Date.now()),
                updatedAt: new Date(Date.now()),
            },
        ])
    },

    async down(queryInterface, Sequelize) {
        return queryInterface.bulkDelete('PlayerTraits', null, {})
    },
}
