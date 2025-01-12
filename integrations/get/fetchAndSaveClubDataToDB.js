const fs = require('fs');
const path = require('path');
const axios = require('axios');

// Sciezki do plików
const inputFilePath = path.join(__dirname, 'polish_clubs.json');
const outputFilePath = path.join(__dirname, 'clubs_to_DB.json');

// Funkcja glowna
async function fetchAndSaveClubDataToDB() {
    try {
        // Wczytanie pliku polish_clubs.json
        const polishClubsData = JSON.parse(fs.readFileSync(inputFilePath, 'utf8'));

        // Lista klubów do przetworzenia
        const clubs = Object.values(polishClubsData).flatMap(league => league.clubs);

        // Pobranie danych dla kazdego klubu z Transfermarkt API
        const clubDataPromises = clubs.map(async (club) => {
            try {
                const response = await axios.get(`https://transfermarkt-api.fly.dev/clubs/${club.id}/profile`);
                const clubProfile = response.data;

                // Zwracanie przetworzonych danych klubu
                return {
                    name: clubProfile.name || club.name, // Na wypadek braku "name" w API
                    address: [
                        clubProfile.addressLine1 || '',
                        clubProfile.addressLine2 || '',
                        clubProfile.addressLine3 || ''
                    ].filter(Boolean).join(', '), 
                    stadiumName: clubProfile.stadiumName || null,
                    league: clubProfile.league ?.name || null
                };
            } catch (error) {
                console.error(`Blad podczas pobierania danych dla klubu o ID ${club.id}:`, error.message);
                return null; 
            }
        });

        // Oczekiwanie na wszystkie dane
        const resolvedClubData = (await Promise.all(clubDataPromises)).filter(Boolean);

        // Zapisanie danych do pliku clubs_to_DB.json
        fs.writeFileSync(outputFilePath, JSON.stringify(resolvedClubData, null, 2), 'utf8');
        console.log('Dane zostaly zapisane do pliku clubs_to_DB.json');
    } catch (error) {
        console.error('Wystapil blad:', error.message);
    }
}

// Uruchomienie funkcji
fetchAndSaveClubDataToDB();
