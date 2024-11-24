const axios = require('axios');
const fs = require('fs');

//URL do udost�pnionego API
const BASE_URL = "https://transfermarkt-api.fly.dev";

//Lista competition_id dla polskich lig dost�pnych w transfermarkt
const competitionIds = ["PL2L", "PL32", "PL34", "PL31", "PL33", "PL1", "PL2"];

// Funkcja do pobrania klub�w z poszczeg�lnych polskich lig zapisanych w competitionIds
async function fetchPolishClubs() {
    try {
        const allClubs = {};

        //Iteracja po ligach i pobranie klub�w
        for (const id of competitionIds) {
            console.log(`Pobieranie danych dla ligi: ${id}`);
            try {
                const response = await axios.get(`${BASE_URL}/competitions/${id}/clubs`);
                allClubs[id] = response.data; // Przypisujemy dane klub�w do odpowiedniego ID ligi
            } catch (error) {
                console.error(`B��d przy pobieraniu danych dla ligi ${id}:`, error.message);
                allClubs[id] = { error: error.message }; // Zapisujemy b��d w razie problemu
            }
        }

        //Dane zapisujemy do pliku JSON by wykorzysta� w dalszym procesie pobierania danych do bazy
        fs.writeFileSync('polish_clubs.json', JSON.stringify(allClubs, null, 2), 'utf-8');
        console.log('Dane zosta�y zapisane w pliku polish_clubs.json');
    } catch (error) {
        console.error('Wyst�pi� b��d podczas pobierania danych:', error.message);
    }
}

// Uruchomienie funkcji
fetchPolishClubs();