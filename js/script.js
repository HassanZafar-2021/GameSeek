const API_KEY = '93fbde2a685d45cea6a36af991b6da2e'; // Your RAWG API Key

// Function to fetch games from RAWG API based on search query
async function fetchGames(query) {
    const url = `https://api.rawg.io/api/games?key=${API_KEY}&search=${query}&page_size=20`;
    const response = await fetch(url);
    const data = await response.json();
    return data.results;
}

// Function to save only the first searched game data to local storage
function saveSearchedGame(gameData) {
    const previousSearches = JSON.parse(localStorage.getItem('previousSearches')) || [];
    // Check if the game is already stored to avoid duplicates
    const isAlreadyStored = previousSearches.some(game => game.id === gameData.id);

    if (!isAlreadyStored) {
        previousSearches.push(gameData);
    }

    // Limit storage to only the most recent game
    if (previousSearches.length > 1) {
        previousSearches.shift();
    }

    localStorage.setItem('previousSearches', JSON.stringify(previousSearches));
}

// Function to display previously searched games
function displayPreviousSearches() {
    const previousSearches = JSON.parse(localStorage.getItem('previousSearches')) || [];
    const previousSearchesContainer = document.getElementById('previous-searches');
    previousSearchesContainer.innerHTML = ''; // Clear previous content

    previousSearches.forEach(game => {
        const gameElement = document.createElement('div');
        gameElement.classList.add('game-item', 'bg-gray-200', 'rounded', 'p-2', 'mb-2');
        gameElement.innerHTML = `<strong>${game.name}</strong> - Released: ${game.released}`;
        previousSearchesContainer.appendChild(gameElement);
    });
}

// Function to handle game search and display results
async function searchGames(query) {
    const resultsContainer = document.getElementById('game-results');
    resultsContainer.innerHTML = '<p>Loading...</p>';

    try {
        const games = await fetchGames(query);

        if (games.length > 0) {
            resultsContainer.innerHTML = ''; // Clear previous results
            const gridContainer = document.createElement('div');
            gridContainer.classList.add('grid', 'grid-cols-1', 'sm:grid-cols-2', 'md:grid-cols-3', 'lg:grid-cols-4', 'gap-6');

            games.forEach(game => {
                const listItem = document.createElement('div');
                listItem.classList.add('game-item', 'bg-white', 'rounded-lg', 'shadow', 'p-4');
                
                // Display game details along with the image
                listItem.innerHTML = `
                    <img src="${game.background_image}" alt="${game.name}" class="w-full mb-4 rounded-lg h-48 object-cover">
                    <h3 class="text-lg font-bold">${game.name}</h3>
                    <p class="text-sm">Release Date: ${game.released}</p>
                    <p class="text-sm">Platforms: ${game.platforms.map(p => p.platform.name).join(', ')}</p>
                    <p class="text-sm">Genres: ${game.genres.map(g => g.name).join(', ')}</p>
                    <p class="text-sm">Publisher: ${game.publishers?.map(p => p.name).join(', ') || 'N/A'}</p>
                `;
                gridContainer.appendChild(listItem);
            });

            resultsContainer.appendChild(gridContainer);

            // Save only the first game to Local Storage for "Previously Searched Games"
            saveSearchedGame(games[0]);
        } else {
            resultsContainer.innerHTML = '<p>No games found matching your search criteria.</p>';
        }
    } catch (error) {
        console.error(error);
        resultsContainer.innerHTML = '<p>Failed to load games. Please try again later.</p>';
    }
}

// Display previously searched game on page load
document.addEventListener('DOMContentLoaded', displayPreviousSearches);

// Event listener for form submission to search for games
document.getElementById('game-search-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const query = document.getElementById('search-input').value.trim();
    if (query) {
        searchGames(query); // Perform the search and save only the first result
    }
});