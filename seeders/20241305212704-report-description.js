'use strict'

module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.bulkInsert('ReportDescriptions', [
            {
                reportId: '276232af-8b64-414f-b574-d4bb5ff10358',
                physicalDescription: 'Strong and agile player',
                mentalDescription: 'Highly focused and motivated',
                technicalDescription: 'Excellent ball control and dribbling',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                reportId: '89bca610-c842-42d6-892c-e9ecfea85760',
                physicalDescription: 'Quick and light on feet',
                mentalDescription: 'Tactical awareness',
                technicalDescription: 'Precise passing and positioning',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
        ])
    },

    async down(queryInterface, Sequelize) {
        return queryInterface.bulkDelete('ReportDescriptions', null, {})
    },
}
