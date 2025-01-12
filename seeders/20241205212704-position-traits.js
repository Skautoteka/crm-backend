'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.bulkInsert('PositionTraits', [
            {
                id: '50aee892-1767-4c2c-ac68-4169c557a15b',
                positionId: 'GOALKEEPER',
                playerTraitId: 'REFLEX',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                id: 'd1f839a3-9c67-4cd2-9e32-8698748d9c42',
                positionId: 'GOALKEEPER',
                playerTraitId: 'POSITIONING',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                id: 'c6a2875e-fbb5-4da3-94a2-2f643b9f6168',
                positionId: 'GOALKEEPER',
                playerTraitId: 'LINE_PLAY',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                id: 'ba45e76d-f1a4-4a57-9003-bd68f2b5c349',
                positionId: 'GOALKEEPER',
                playerTraitId: 'PLAYING_WITH_FEET',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                id: '3d421d65-2453-4b72-8b49-d244aa07e6d5',
                positionId: 'GOALKEEPER',
                playerTraitId: 'COMMUNICATION',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                id: '33490445-c2c7-4601-986d-5f4285576e63',
                positionId: 'CENTRAL_DEFENDER',
                playerTraitId: 'PHYSICAL_STRENGTH',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                id: 'e4b07933-671d-4891-b9ad-cd88561efdda',
                positionId: 'CENTRAL_DEFENDER',
                playerTraitId: 'HEADING',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                id: '9371db02-26ea-4ab8-886d-d5ae4015e7bc',
                positionId: 'CENTRAL_DEFENDER',
                playerTraitId: 'ANTICIPATION',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                id: 'c7fd799b-e735-4027-830d-8f58445e4398',
                positionId: 'CENTRAL_DEFENDER',
                playerTraitId: 'TACKLING',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                id: '9d040038-1484-4d02-bb0d-178924fae530',
                positionId: 'CENTRAL_DEFENDER',
                playerTraitId: 'POSITIONING',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                id: 'f310c663-96bb-4aad-987f-9eb706dff2b3',
                positionId: 'SIDE_DEFENDER',
                playerTraitId: 'SPEED',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                id: '0b107f68-040d-49b0-87ec-c7382a1f728b',
                positionId: 'SIDE_DEFENDER',
                playerTraitId: 'CONDITIONING',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                id: 'cfa5a0ed-c287-45bc-a9b4-ae48114f8907',
                positionId: 'SIDE_DEFENDER',
                playerTraitId: 'ONE_ON_ONE',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                id: 'cd608ed8-aea7-45c7-888f-d6122e922daf',
                positionId: 'SIDE_DEFENDER',
                playerTraitId: 'CROSSING',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                id: '28aee44d-62ec-4e0e-b422-abe0c2780343',
                positionId: 'SIDE_DEFENDER',
                playerTraitId: 'OFFENSIVE_SUPPORT',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                id: 'f6b041d2-5972-45e1-9771-db7aa3b68b27',
                positionId: 'WING_BACK',
                playerTraitId: 'SPEED',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                id: '31fba672-e774-4d02-b31d-47a39330f79c',
                positionId: 'WING_BACK',
                playerTraitId: 'CONDITIONING',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                id: 'c53ea5c6-f53e-475c-a896-0d67047997e6',
                positionId: 'WING_BACK',
                playerTraitId: 'VERSATILITY',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                id: '193012bf5-5c55-4841-97d5-56dd2189556',
                positionId: 'WING_BACK',
                playerTraitId: 'THROW_INS',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                id: '03c90bc4-56f1-4f7a-9434-9b8ef21c4465',
                positionId: 'WING_BACK',
                playerTraitId: 'DEFENSIVE_SKILLS',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                id: '74c6ede5-1337-41da-89b4-72aa8707a903',
                positionId: 'DEFENSIVE_MIDFIELDER',
                playerTraitId: 'INTERCEPTIONS',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                id: '1b2b0507-bc2b-4425-a6aa-13bf563c865e',
                positionId: 'DEFENSIVE_MIDFIELDER',
                playerTraitId: 'STAMINA',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                id: '85315ce4-cace-4d3a-aab0-9605d1a24ac1',
                positionId: 'DEFENSIVE_MIDFIELDER',
                playerTraitId: 'POSITIONING',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                id: 'e885dac1-ef24-4fdd-a3e2-ed708a047a0a',
                positionId: 'DEFENSIVE_MIDFIELDER',
                playerTraitId: 'PLAYMAKING',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                id: '47ad3829-4b9d-4d0f-a4b6-08db7f2a3281',
                positionId: 'DEFENSIVE_MIDFIELDER',
                playerTraitId: 'RESPONSIBILITY',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                id: '4608324a-cc72-42f0-bd6e-2cfa61548eee',
                positionId: 'CENTRAL_MIDFIELDER',
                playerTraitId: 'VERSATILITY',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                id: 'b41fed93-47de-4712-9be0-dff4d2317271',
                positionId: 'CENTRAL_MIDFIELDER',
                playerTraitId: 'BALL_CONTROL',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                id: '99d5d5ef-a3da-4ccb-a1f6-66428a7acb23',
                positionId: 'CENTRAL_MIDFIELDER',
                playerTraitId: 'PASSING',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                id: 'edc539d7-1225-4427-9495-6ff82932d370',
                positionId: 'CENTRAL_MIDFIELDER',
                playerTraitId: 'BALANCE',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                id: '6e8bb8a2-a73d-493e-9365-fd4dd7f77dac',
                positionId: 'CENTRAL_MIDFIELDER',
                playerTraitId: 'STAMINA',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                id: '0d4936d5-7137-427e-8453-d938e6a6d516',
                positionId: 'OFFENSIVE_MIDFIELDER',
                playerTraitId: 'CREATIVITY',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                id: 'efb3a4a0-cde1-42ac-9d15-07c18f49b567',
                positionId: 'OFFENSIVE_MIDFIELDER',
                playerTraitId: 'PASSING',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                id: '3ffe6b57-d679-495e-a857-0fdf69988cde',
                positionId: 'OFFENSIVE_MIDFIELDER',
                playerTraitId: 'BALL_CONTROL',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                id: 'd7833625-4d5c-4d95-a5f1-5cddc0e6f9ad',
                positionId: 'OFFENSIVE_MIDFIELDER',
                playerTraitId: 'GAME_VISION',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                id: 'a1bc5636-9642-4e4b-ae5c-56b88afe0dce',
                positionId: 'OFFENSIVE_MIDFIELDER',
                playerTraitId: 'FINISHING',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                id: '2d74babf-4e36-4f94-b01d-ee010f79e73c',
                positionId: 'WINGMAN_MIDFIELDER',
                playerTraitId: 'SPEED',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                id: 'f18ac4e1-8c4d-408a-a9d0-154cfca93b3b',
                positionId: 'WINGMAN_MIDFIELDER',
                playerTraitId: 'DRIBBLING',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                id: '1b0ec4c8-de7b-41a1-bd5e-196b43ec631b',
                positionId: 'WINGMAN_MIDFIELDER',
                playerTraitId: 'CROSSING',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                id: 'a266b14b-c0fc-4129-97c0-d70d9b333a55',
                positionId: 'WINGMAN_MIDFIELDER',
                playerTraitId: 'STAMINA',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                id: '5d51dea3-682b-4715-99da-9645fd8e6edf',
                positionId: 'WINGMAN_MIDFIELDER',
                playerTraitId: 'DEFENSIVE_SUPPORT',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                id: 'b9a9ae06-7529-4dfe-98bb-c7d3fb27c8af',
                positionId: 'CENTRAL_FORWARD',
                playerTraitId: 'FINISHING',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                id: 'afc3eabd-e380-4594-b7a0-02a2c5d0b6fd',
                positionId: 'CENTRAL_FORWARD',
                playerTraitId: 'POSITIONING',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                id: 'af8e5f2c-a84d-4a00-b72e-0d12d91f15d0',
                positionId: 'CENTRAL_FORWARD',
                playerTraitId: 'SPEED',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                id: 'b15ec488-849c-4106-a627-aa1dc5003097',
                positionId: 'CENTRAL_FORWARD',
                playerTraitId: 'PHYSICAL_STRENGTH',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                id: '3addb381-dc13-4e52-99f4-647827148b9b',
                positionId: 'CENTRAL_FORWARD',
                playerTraitId: 'ANTICIPATION',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                id: 'f158b495-854b-4fcf-adeb-58bb633760f5',
                positionId: 'FALSE_NINE',
                playerTraitId: 'CREATIVITY',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                id: '3ccb307b-a4d1-4222-9749-e0d2e027cbe3',
                positionId: 'FALSE_NINE',
                playerTraitId: 'FLEXIBILITY',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                id: '1e929959-e509-4282-a474-1fa67073da3b',
                positionId: 'FALSE_NINE',
                playerTraitId: 'PLAYMAKING',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                id: 'b51119d2-e472-427c-82ca-d6552ee561f6',
                positionId: 'FALSE_NINE',
                playerTraitId: 'FINISHING',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                id: 'da6c6eec-a6f1-4a55-a893-1b43612a6549',
                positionId: 'FALSE_NINE',
                playerTraitId: 'OFF_BALL_MOVEMENT',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                id: '86ccc4d4-614b-4237-8280-a13fa324b6e6',
                positionId: 'WINGMAN_FORWARD',
                playerTraitId: 'SPEED',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                id: '9e642558-7f70-49ff-b29d-87408d2d286b',
                positionId: 'WINGMAN_FORWARD',
                playerTraitId: 'DRIBBLING',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                id: '7088a5cc-f46a-4c78-95b4-e6ced0771a94',
                positionId: 'WINGMAN_FORWARD',
                playerTraitId: 'SHOT_ACCURACY',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                id: 'b63c7933-d8e3-4307-953a-099d114b9762',
                positionId: 'WINGMAN_FORWARD',
                playerTraitId: 'CROSSING',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                id: '0866b056-6807-4d1f-bdf1-d9a4fe600f9f',
                positionId: 'WINGMAN_FORWARD',
                playerTraitId: 'OFF_BALL_MOVEMENT',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
        ])
    },

    async down(queryInterface, Sequelize) {
        return queryInterface.bulkDelete('PositionTraits', null, {})
    },
}
