'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Players', [
      {
        id: '18228bad-4d09-4773-8aeb-73938a2456c1',
        firstName: 'Cristiano',
        lastName: 'Ronaldo',
        sex: 'MALE',
        position: 'FORWARD',
        age: 24,
        createdAt: new Date(Date.now()),
        updatedAt: new Date(Date.now()),
      },
      {
        id: '4b4b4076-c6aa-4601-841e-ba51f7e60c32',
        firstName: 'Damian',
        lastName: 'Kowalski',
        sex: 'MALE',
        position: 'WINGER',
        age: 30,
        createdAt: new Date(Date.now()),
        updatedAt: new Date(Date.now()),
      },
      {
        id: 'bfaee0f7-2e44-4182-a78f-a03253eee601',
        firstName: 'Jakub',
        lastName: 'Prus',
        sex: 'MALE',
        position: 'DEFENSE',
        age: 35,
        createdAt: new Date(Date.now()),
        updatedAt: new Date(Date.now()),
      },
    ])
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Players', null, {})
  }
};
