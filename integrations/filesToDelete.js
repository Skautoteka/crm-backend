const fs = require("fs");
const path = require("path");

// Sciezka do katalogu 'get'
const directoryPath = path.join(__dirname, "get");

// Lista plikow do usuniecia
const filesToDelete = ["players_data.json", "polish_clubs.json", "clubs_to_DB.json"];

// Funkcja do usuwania plikow
function deleteFiles(directory, files) {
    files.forEach(file => {
        const filePath = path.join(directory, file);

        fs.unlink(filePath, (err) => {
            if (err) {
                if (err.code === "ENOENT") {
                    console.log(`Plik ${file} nie istnieje w katalogu ${directory}.`);
                } else {
                    console.error(`Bled usuwania pliku ${file}:`, err.message);
                }
            } else {
                console.log(`Plik ${file} zostal pomynlnie usuniety.`);
            }
        });
    });
}

// Wywolanie funkcji
deleteFiles(directoryPath, filesToDelete);