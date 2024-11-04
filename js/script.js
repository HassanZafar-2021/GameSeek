const API_KEY = '93fbde2a685d45cea6a36af991b6da2e'; // Your RAWG API Key

// Function to fetch games from RAWG API based on search query
async function fetchGames(query) {
    const url = `https://api.rawg.io/api/games?key=${API_KEY}&search=${query}&page_size=20`;
    const response = await fetch(url);
    const data = await response.json();
    return data.results;
}

// Function to save up to the last 3 searched games to local storage
function saveSearchedGame(gameData) {
    const previousSearches = JSON.parse(localStorage.getItem('previousSearches')) || [];
    const isAlreadyStored = previousSearches.some(game => game.id === gameData.id);

    if (!isAlreadyStored) {
        previousSearches.push(gameData);
    }

    // Limit storage to the last 3 searches
    if (previousSearches.length > 3) {
        previousSearches.shift();
    }

    localStorage.setItem('previousSearches', JSON.stringify(previousSearches));
    displayPreviousSearches();  // Update display immediately after saving
}

// Function to display up to 3 previously searched games with alternating colors
function displayPreviousSearches() {
    const previousSearches = JSON.parse(localStorage.getItem('previousSearches')) || [];
    const previousSearchesContainer = document.getElementById('previous-searches');
    previousSearchesContainer.innerHTML = ''; // Clear previous content

    const title = document.createElement('h3');
    title.classList.add('text-lg', 'font-semibold', 'text-gray-700', 'mb-2');
    title.textContent = "Recently Searched Games";
    previousSearchesContainer.appendChild(title);

    const colors = ["#FFCCCB", "#ADD8E6", "#90EE90"]; // Light red, sky blue, light green

    previousSearches.forEach((game, index) => {
        const gameElement = document.createElement('div');
        gameElement.classList.add('game-item', 'rounded', 'p-2', 'mb-2');
        gameElement.style.backgroundColor = colors[index % colors.length]; // Apply alternating colors
        gameElement.innerHTML = `<strong>${game.name}</strong> - Released: ${game.released || "N/A"}`;
        previousSearchesContainer.appendChild(gameElement);
    });

    // Clear Button
    const clearButton = document.createElement('button');
    clearButton.textContent = "Clear Search History";
    clearButton.classList.add('bg-red-500', 'text-white', 'py-1', 'px-3', 'rounded', 'mt-2');
    clearButton.addEventListener('click', clearSearchHistory);
    previousSearchesContainer.appendChild(clearButton);
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

            const colors = ["#FFCCCB", "#ADD8E6", "#90EE90"]; // Light red, sky blue, light green

            games.forEach((game, index) => {
                const listItem = document.createElement('div');
                listItem.classList.add('game-item', 'rounded-lg', 'shadow', 'p-4');
                listItem.style.backgroundColor = colors[index % colors.length]; // Apply alternating colors

                listItem.innerHTML = `
                    <img src="${game.background_image || 'https://via.placeholder.com/150'}" alt="${game.name}" class="w-full mb-4 rounded-lg h-48 object-cover">
                    <h3 class="text-lg font-bold">${game.name}</h3>
                    <p class="text-sm">Release Date: ${game.released || 'N/A'}</p>
                    <p class="text-sm">Platforms: ${game.platforms ? game.platforms.map(p => p.platform.name).join(', ') : 'N/A'}</p>
                    <p class="text-sm">Genres: ${game.genres ? game.genres.map(g => g.name).join(', ') : 'N/A'}</p>
                    <p class="text-sm">Publisher: ${game.publishers && game.publishers.length ? game.publishers.map(p => p.name).join(', ') : 'N/A'}</p>
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

// Clear search history function
function clearSearchHistory() {
    localStorage.removeItem('previousSearches'); // Clear local storage
    displayPreviousSearches(); // Refresh display
}

// Display previously searched games on page load
document.addEventListener('DOMContentLoaded', displayPreviousSearches);

// Event listener for form submission to search for games
document.getElementById('game-search-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const query = document.getElementById('search-input').value.trim();
    if (query) {
        searchGames(query); // Perform the search and save only the first result
    }
});
// Color alternation for aside element (white to post-it note yellow)
const aside = document.getElementById("previous-searches");
const asideColors = ["#ffffff", "#fef3c7"]; // white and light yellow (post-it note color)
let asideColorIndex = 0;

setInterval(() => {
    aside.style.backgroundColor = asideColors[asideColorIndex];
    asideColorIndex = (asideColorIndex + 1) % asideColors.length;
}, 1000); // Changes every 1 second

