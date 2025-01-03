'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.bulkInsert('PlayerTraits', [
            {
                id: 'REFLEX',
                name: 'Refleks',
                createdAt: new Date(Date.now()),
                updatedAt: new Date(Date.now()),
            },
            {
                id: 'PHYSICAL_STRENGTH',
                name: 'Siła fizyczna',
                createdAt: new Date(Date.now()),
                updatedAt: new Date(Date.now()),
            },
            {
                id: 'SPEED',
                name: 'Szybkość',
                createdAt: new Date(Date.now()),
                updatedAt: new Date(Date.now()),
            },
            {
                id: 'INTERCEPTIONS',
                name: 'Przechwyty',
                createdAt: new Date(Date.now()),
                updatedAt: new Date(Date.now()),
            },
            {
                id: 'VERSATILITY',
                name: 'Wszechstronność',
                createdAt: new Date(Date.now()),
                updatedAt: new Date(Date.now()),
            },
            {
                id: 'CREATIVITY',
                name: 'Kreatywność',
                createdAt: new Date(Date.now()),
                updatedAt: new Date(Date.now()),
            },
            {
                id: 'FINISHING',
                name: 'Wykończenie',
                createdAt: new Date(Date.now()),
                updatedAt: new Date(Date.now()),
            },
            {
                id: 'POSITIONING',
                name: 'Ustawienie',
                createdAt: new Date(Date.now()),
                updatedAt: new Date(Date.now()),
            },
            {
                id: 'HEADING',
                name: 'Gra głową',
                createdAt: new Date(Date.now()),
                updatedAt: new Date(Date.now()),
            },
            {
                id: 'CONDITIONING',
                name: 'Kondycja',
                createdAt: new Date(Date.now()),
                updatedAt: new Date(Date.now()),
            },
            {
                id: 'STAMINA',
                name: 'Wytrzymałość',
                createdAt: new Date(Date.now()),
                updatedAt: new Date(Date.now()),
            },
            {
                id: 'BALL_CONTROL',
                name: 'Kontrola piłki',
                createdAt: new Date(Date.now()),
                updatedAt: new Date(Date.now()),
            },
            {
                id: 'PASSING',
                name: 'Podania',
                createdAt: new Date(Date.now()),
                updatedAt: new Date(Date.now()),
            },
            {
                id: 'DRIBBLING',
                name: 'Drybling',
                createdAt: new Date(Date.now()),
                updatedAt: new Date(Date.now()),
            },
            {
                id: 'FLEXIBILITY',
                name: 'Elastyczność',
                createdAt: new Date(Date.now()),
                updatedAt: new Date(Date.now()),
            },
            {
                id: 'LINE_PLAY',
                name: 'Gra na linii',
                createdAt: new Date(Date.now()),
                updatedAt: new Date(Date.now()),
            },
            {
                id: 'ANTICIPATION',
                name: 'Przewidywanie',
                createdAt: new Date(Date.now()),
                updatedAt: new Date(Date.now()),
            },
            {
                id: 'ONE_ON_ONE',
                name: 'Gra 1 na 1',
                createdAt: new Date(Date.now()),
                updatedAt: new Date(Date.now()),
            },
            {
                id: 'CROSSING',
                name: 'Dośrodkowania',
                createdAt: new Date(Date.now()),
                updatedAt: new Date(Date.now()),
            },
            {
                id: 'PLAYMAKING',
                name: 'Rozegranie',
                createdAt: new Date(Date.now()),
                updatedAt: new Date(Date.now()),
            },
            {
                id: 'SHOT_ACCURACY',
                name: 'Celność strzałów',
                createdAt: new Date(Date.now()),
                updatedAt: new Date(Date.now()),
            },
            {
                id: 'PLAYING_WITH_FEET',
                name: 'Gra nogami',
                createdAt: new Date(Date.now()),
                updatedAt: new Date(Date.now()),
            },
            {
                id: 'TACKLING',
                name: 'Odbiór',
                createdAt: new Date(Date.now()),
                updatedAt: new Date(Date.now()),
            },
            {
                id: 'THROW_INS',
                name: 'Wrzutki',
                createdAt: new Date(Date.now()),
                updatedAt: new Date(Date.now()),
            },
            {
                id: 'BALANCE',
                name: 'Równowaga (of./def.)',
                createdAt: new Date(Date.now()),
                updatedAt: new Date(Date.now()),
            },
            {
                id: 'GAME_VISION',
                name: 'Wizja gry',
                createdAt: new Date(Date.now()),
                updatedAt: new Date(Date.now()),
            },
            {
                id: 'COMMUNICATION',
                name: 'Komunikacja',
                createdAt: new Date(Date.now()),
                updatedAt: new Date(Date.now()),
            },
            {
                id: 'OFFENSIVE_SUPPORT',
                name: 'Wsparcie ofensywne',
                createdAt: new Date(Date.now()),
                updatedAt: new Date(Date.now()),
            },
            {
                id: 'DEFENSIVE_SKILLS',
                name: 'Zdolności defensywne',
                createdAt: new Date(Date.now()),
                updatedAt: new Date(Date.now()),
            },
            {
                id: 'RESPONSIBILITY',
                name: 'Odpowiedzialność',
                createdAt: new Date(Date.now()),
                updatedAt: new Date(Date.now()),
            },
            {
                id: 'DEFENSIVE_SUPPORT',
                name: 'Wsparcie defensywne',
                createdAt: new Date(Date.now()),
                updatedAt: new Date(Date.now()),
            },
            {
                id: 'OFF_BALL_MOVEMENT',
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
