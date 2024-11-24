const fs = require('fs');
const path = require('path');
const axios = require('axios');

// �cie�ki do plik�w
const inputFilePath = path.join(__dirname, 'polish_clubs.json');
const outputFilePath = path.join(__dirname, 'clubs_to_DB.json');

// Funkcja g��wna
async function fetchAndSaveClubDataToDB() {
    try {
        // Wczytanie pliku polish_clubs.json
        const polishClubsData = JSON.parse(fs.readFileSync(inputFilePath, 'utf8'));

        // Lista klub�w do przetworzenia
        const clubs = Object.values(polishClubsData).flatMap(league => league.clubs);

        // Pobranie danych dla ka�dego klubu z Transfermarkt API
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
                    ].filter(Boolean).join(', '), // ��czenie adres�w, pomijanie pustych
                    stadiumName: clubProfile.stadiumName || null,
                    league: clubProfile.league?.name || null
                };
            } catch (error) {
                console.error(`B��d podczas pobierania danych dla klubu o ID ${club.id}:`, error.message);
                return null; // Ignorowanie b��dnych klub�w
            }
        });

        // Oczekiwanie na wszystkie dane
        const resolvedClubData = (await Promise.all(clubDataPromises)).filter(Boolean);

        // Zapisanie danych do pliku clubs_to_DB.json
        fs.writeFileSync(outputFilePath, JSON.stringify(resolvedClubData, null, 2), 'utf8');
        console.log('Dane zosta�y zapisane do pliku clubs_to_DB.json');
    } catch (error) {
        console.error('Wyst�pi� b��d:', error.message);
    }
}

// Uruchomienie funkcji
fetchAndSaveClubDataToDB();
