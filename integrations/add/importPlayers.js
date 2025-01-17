const fs = require('fs');
const { Sequelize, DataTypes } = require('sequelize');

//Konfiguracja Sequelize
const sequelize = new Sequelize('skautoteka', 'root', 't4jn3h4slo', {
    host: 'localhost',
    dialect: 'mysql'
});

//Definicja modelu Player
const Player = sequelize.define('Player', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    firstName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    lastName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    sex: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'MALE'
    },
    birthYear: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    nationality: {
        type: DataTypes.STRING,
        allowNull: false
    },
    positionId: {
        type: DataTypes.STRING,
        allowNull: false
    },
    teamId: {
        type: DataTypes.STRING,
        allowNull: false
    },
    height: {
        type: DataTypes.FLOAT,
        allowNull: true
    },
    weight: {
        type: DataTypes.FLOAT,
        allowNull: true,
        defaultValue: 0
    },
    physique: {
        type: DataTypes.STRING,
        allowNull: true
    }
}, {
        timestamps: true
    });

//Funkcja do importowania zawodników
async function importPlayers() {
    try {
        await sequelize.sync(); //Synchronizacja z baz¹ danych

        let data;
        try {
            data = JSON.parse(fs.readFileSync('./players_data.json', 'utf-8'));
        } catch (parseError) {
            throw new Error("B³¹d podczas parsowania danych JSON.");
        }

        let teams;
        try {
            teams = JSON.parse(fs.readFileSync('./teams.json', 'utf-8'));
        } catch (error) {
            throw new Error("B³¹d podczas parsowania pliku teams.json.");
        }

        for (let teamName in data) {
            let teamData = data[teamName];

            //Wyszukiwanie ID dru¿yny
            let formattedTeamName = `${teamName}`;
            let team = teams.find(t => t.name === formattedTeamName);

            if (!team) {
                console.error(`Brak dru¿yny o nazwie: ${formattedTeamName}`);
                continue;
            }

            let teamId = team.id;

            for (let player of teamData.players) {
                let firstName = player.name.split(' ')[0];
                let lastName = player.name.split(' ')[1] || '';
                let birthYear = new Date(player.dateOfBirth).getFullYear();
                let nationality = player.nationality[0];
                let positionId2 = player.position.replace('-', '_');
                let positionId = positionId2.replace(' ', '_');

                let height = player.height;

                const playerData = {
                    firstName,
                    lastName,
                    sex: 'MALE',
                    birthYear,
                    nationality,
                    positionId,
                    teamId,
                    height: height || null,
                    weight: 0,
                    physique: null
                };

                try {
                    await Player.create(playerData);
                    console.log(`Dodano zawodnika: ${playerData.firstName} ${playerData.lastName}`);
                } catch (error) {
                    console.error(`B³¹d podczas dodawania zawodnika: ${playerData.firstName} ${playerData.lastName}`, error);
                }
            }
        }
    } catch (error) {
        console.error("B³¹d podczas importowania danych", error);
    }
}

//Wywo³anie funkcji
importPlayers();


