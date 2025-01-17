'use strict'

module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.bulkInsert('ReportTraits', [
            {
                traitId: 'REFLEX',
                reportId: '276232af-8b64-414f-b574-d4bb5ff10358',
                value: 9,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                traitId: 'SPEED',
                reportId: '276232af-8b64-414f-b574-d4bb5ff10358',
                value: 2,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                traitId: 'INTERCEPTIONS',
                reportId: '276232af-8b64-414f-b574-d4bb5ff10358',
                value: 5,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                traitId: 'FINISHING',
                reportId: '276232af-8b64-414f-b574-d4bb5ff10358',
                value: 9,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                traitId: 'STAMINA',
                reportId: '276232af-8b64-414f-b574-d4bb5ff10358',
                value: 2,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                traitId: 'HEADING',
                reportId: '276232af-8b64-414f-b574-d4bb5ff10358',
                value: 5,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                traitId: 'PHYSICAL_STRENGTH',
                reportId: '89bca610-c842-42d6-892c-e9ecfea85760',
                value: 7,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
        ])
    },

    async down(queryInterface, Sequelize) {
        return queryInterface.bulkDelete('ReportTraits', null, {})
    },
}
