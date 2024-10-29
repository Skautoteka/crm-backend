'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Reports', [
      {
          id: '276232af-8b64-414f-b574-d4bb5ff10358',
          name: 'Raport #1',
          status: 'IN_PROGRESS',
          playerId: '4b4b4076-c6aa-4601-841e-ba51f7e60c32',
          createdAt: new Date(Date.now()),
          updatedAt: new Date(Date.now()),
      },
      {
        id: '89bca610-c842-42d6-892c-e9ecfea85760',
        name: 'Raport #2',
        status: 'COMPLETED',
        playerId: 'bfaee0f7-2e44-4182-a78f-a03253eee601',
        createdAt: new Date(Date.now()),
        updatedAt: new Date(Date.now()),
    },
    {
      id: '8dc3f345-7f02-44de-a0d7-466bbf3a4ac1',
      name: 'Raport #3',
      status: 'IN_PROGRESS',
      playerId: '18228bad-4d09-4773-8aeb-73938a2456c1',
      createdAt: new Date(Date.now()),
      updatedAt: new Date(Date.now()),
  },
  ])
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Reports', null, {});
  }
};
