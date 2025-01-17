const fs = require('fs');
const { Sequelize, DataTypes } = require('sequelize');

//Konfiguracja po��czenia z baz� danych
const sequelize = new Sequelize('skautoteka', 'root', 't4jn3h4slo', {
    host: 'localhost',
    dialect: 'mysql'
});

//Definicja modelu Team
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
        allowNull: true
    },
    country: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: 'Polska'
    },
    league: {
        type: DataTypes.STRING,
        allowNull: true
    }
}, {
        timestamps: true
    });

//Funkcja eksportuj�ca dane dru�yn do pliku JSON
async function exportTeams() {
    try {
        //Synchronizacja modelu z baz� danych
        await sequelize.sync();

        //Pobranie wszystkich dru�yn z bazy
        const teams = await Team.findAll({
            attributes: ['id', 'name'] //Pobierz tylko id i name
        });

        //Sformatowanie danych
        const teamsData = teams.map(team => ({
            id: team.id,
            name: team.name
        }));

        fs.writeFileSync('./teams.json', JSON.stringify(teamsData, null, 2), 'utf-8');

        console.log('Dane dru�yn zosta�y zapisane do pliku teams.json');
    } catch (error) {
        console.error('B��d podczas eksportowania danych:', error);
    } finally {
        await sequelize.close();
    }
}

//Wywo�anie funkcji eksportuj�cej
exportTeams();

