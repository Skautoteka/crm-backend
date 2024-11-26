'use strict'

module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.bulkInsert('ReportPositions', [
            {
                reportId: '276232af-8b64-414f-b574-d4bb5ff10358',
                positionId: 'DEFENSE',
                isOptional: false,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                reportId: '276232af-8b64-414f-b574-d4bb5ff10358',
                positionId: 'WINGER',
                isOptional: true,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                reportId: '89bca610-c842-42d6-892c-e9ecfea85760',
                positionId: 'FORWARD',
                isOptional: true,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
        ])
    },

    async down(queryInterface, Sequelize) {
        return queryInterface.bulkDelete('ReportPositions', null, {})
    },
}
