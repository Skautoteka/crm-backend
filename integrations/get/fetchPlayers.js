const fs = require("fs");
const axios = require("axios");

// Wczytaj dane z polish_clubs.json
const clubsData = JSON.parse(fs.readFileSync("polish_clubs.json", "utf8"));

// Funkcja do pobrania danych o pilkarzach dla klubu
async function fetchPlayers(clubId) {
    const apiUrl = `https://transfermarkt-api.fly.dev/clubs/${clubId}/players`;

    try {
        const response = await axios.get(apiUrl);
        return response.data; 
    } catch (error) {
        console.error(`B��d pobierania danych dla klubu ${clubId}:`, error.message);
        return null;
    }
}

// Pobierz dane dla wszystkich klubow
async function fetchAllPlayers() {
    const allPlayersData = {};

    for (const leagueKey in clubsData) {
        const league = clubsData[leagueKey];
        console.log(`Przetwarzanie ligi: ${league.name}`);

        for (const club of league.clubs) {
            console.log(`Pobieranie danych dla klubu: ${club.name}`);
            const players = await fetchPlayers(club.id);

            if (players) {
                allPlayersData[club.name] = players;
            }
        }
    }

    // Zapisz dane do pliku JSON
    fs.writeFileSync("players_data.json", JSON.stringify(allPlayersData, null, 2));
    console.log("Dane o pi�karzach zapisane do pliku players_data.json");
}

// Uruchom funkcje
fetchAllPlayers();