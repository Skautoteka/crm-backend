'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.addConstraint('Users', {
            fields: ['email'],
            type: 'unique',
            name: 'unique_email_constraint',
        })
    },

    async down(queryInterface, Sequelize) {
        try {
            await queryInterface.removeConstraint(
                'Users',
                'unique_email_constraint'
            )
        } catch (error) {
            console.log('No existing constraint found. Skipping removal.')
        }
    },
}
