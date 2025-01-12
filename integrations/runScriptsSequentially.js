const { exec } = require("child_process");
const path = require("path");

// Lista skryptow do uruchomienia
const scripts = [
    "fetchPolishClubs.js",
    "fetchAndSaveClubDataToDB.js",
    "fetchAllPlayers.js"
];

// Funkcja do uruchamiania skrypt�w
function runScript(scriptPath) {
    return new Promise((resolve, reject) => {
        console.log(`Uruchamianie skryptu: ${scriptPath}`);

        // Uruchomienie skryptu
        exec(`node ${scriptPath}`, (error, stdout, stderr) => {
            if (error) {
                console.error(`Blad podczas uruchamiania ${scriptPath}:`, error.message);
                return reject(error);
            }
            if (stderr) {
                console.warn(`Ostrzezenie podczas uruchamiania ${scriptPath}:\n${stderr}`);
            }
            console.log(`Wynik dzialania ${scriptPath}:\n${stdout}`);
            resolve();
        });
    });
}

// Glowna funkcja do uruchomienia skryptow po kolei
async function runScriptsSequentially() {
    const scriptDirectory = path.join(__dirname, "get");

    for (const script of scripts) {
        const scriptPath = path.join(scriptDirectory, script);

        try {
            await runScript(scriptPath); 
        } catch (error) {
            console.error(`Nie udalo sie uruchomic ${script}. Przerywam dzialanie.`);
            return; 
        }
    }

    console.log("Wszystkie skrypty zosta�y pomy�lnie uruchomione.");
}

// Uruchom glowna funkcje
runScriptsSequentially();

