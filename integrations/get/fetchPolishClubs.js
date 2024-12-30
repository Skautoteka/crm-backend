const axios = require('axios');
const fs = require('fs');

//URL do udostêpnionego API
const BASE_URL = "https://transfermarkt-api.fly.dev";

//Lista competition_id dla polskich lig dostêpnych w transfermarkt
const competitionIds = ["PL2L", "PL32", "PL34", "PL31", "PL33", "PL1", "PL2"];

// Funkcja do pobrania klubów z poszczególnych polskich lig zapisanych w competitionIds
async function fetchPolishClubs() {
    try {
        const allClubs = {};

        //Iteracja po ligach i pobranie klubów
        for (const id of competitionIds) {
            console.log(`Pobieranie danych dla ligi: ${id}`);
            try {
                const response = await axios.get(`${BASE_URL}/competitions/${id}/clubs`);
                allClubs[id] = response.data; // Przypisujemy dane klubów do odpowiedniego ID ligi
            } catch (error) {
                console.error(`B³¹d przy pobieraniu danych dla ligi ${id}:`, error.message);
                allClubs[id] = { error: error.message }; // Zapisujemy b³¹d w razie problemu
            }
        }

        //Dane zapisujemy do pliku JSON by wykorzystaæ w dalszym procesie pobierania danych do bazy
        fs.writeFileSync('polish_clubs.json', JSON.stringify(allClubs, null, 2), 'utf-8');
        console.log('Dane zosta³y zapisane w pliku polish_clubs.json');
    } catch (error) {
        console.error('Wyst¹pi³ b³¹d podczas pobierania danych:', error.message);
    }
}

// Uruchomienie funkcji
fetchPolishClubs();