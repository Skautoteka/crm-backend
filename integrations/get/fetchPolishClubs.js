const axios = require('axios');
const fs = require('fs');

//URL do udostepnionego API
const BASE_URL = "https://transfermarkt-api.fly.dev";

//Lista competition_id dla polskich lig dostepnych w transfermarkt
const competitionIds = ["PL2L", "PL32", "PL34", "PL31", "PL33", "PL1", "PL2"];

// Funkcja do pobrania klubow z poszczegolnych polskich lig zapisanych w competitionIds
async function fetchPolishClubs() {
    try {
        const allClubs = {};

        //Iteracja po ligach i pobranie klub�w
        for (const id of competitionIds) {
            console.log(`Pobieranie danych dla ligi: ${id}`);
            try {
                const response = await axios.get(`${BASE_URL}/competitions/${id}/clubs`);
                allClubs[id] = response.data;
            } catch (error) {
                console.error(`Blad przy pobieraniu danych dla ligi ${id}:`, error.message);
                allClubs[id] = { error: error.message };
            }
        }

        //Dane zapisujemy do pliku JSON by wykorzystac w dalszym procesie pobierania danych do bazy
        fs.writeFileSync('polish_clubs.json', JSON.stringify(allClubs, null, 2), 'utf-8');
        console.log('Dane zostaly zapisane w pliku polish_clubs.json');
    } catch (error) {
        console.error('Wystapi� blad podczas pobierania danych:', error.message);
    }
}

// Uruchomienie funkcji
fetchPolishClubs();