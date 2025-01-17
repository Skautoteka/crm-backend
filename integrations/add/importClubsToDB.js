const fs = require('fs');
const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize('skautoteka', 'root', 't4jn3h4slo', {
    host: 'localhost',
    dialect: 'mysql'
});

const Team = sequelize.define('Team', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    city: {
        type: DataTypes.STRING,
        allowNull: false
    },
    country: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'Polska'
    },
    league: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
        timestamps: true
    });

async function importTeams() {
    try {
        await sequelize.sync(); //Synchronizacja z baz¹ danych

        const data = JSON.parse(fs.readFileSync('./clubs_to_DB.json', 'utf-8'));

        for (let club of data) {
            let city = club.address;
            let teamData = {
                name: club.name,
                city: city,
                league: club.league
            };

            try {
                await Team.create(teamData);
                console.log(`Dodano dru¿ynê: ${teamData.name}`);
            } catch (error) {
                console.error(`B³¹d podczas dodawania dru¿yny: ${teamData.name}`, error);
            }
        }
    } catch (error) {
        console.error("B³¹d podczas importowania danych", error);
    }
}

importTeams();


