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


  
async function fetchDevelopers() {
    const url = `https://api.rawg.io/api/developers?key=${API_KEY}&page_size=20`; 

    const response = await fetch(url);
    const data = await response.json();
    return data.results; 
}
 


async function fetchGames2024() {
    const url = `https://api.rawg.io/api/games?key=${API_KEY}&dates=2024-01-01,2024-12-31&page_size=20`; 

    const response = await fetch(url);
    const data = await response.json();
    return data.results; 
}




async function fetchGamesByGenre(genre) {
    const url = `https://api.rawg.io/api/games?key=${API_KEY}&genres=${genre}&page_size=20`; 

    const response = await fetch(url);
    const data = await response.json();
    return data.results; 
}





async function fetchGamesByPlatform(platform) {
    const url = `https://api.rawg.io/api/games?key=${API_KEY}&platforms=${platform}&page_size=20`; 

    const response = await fetch(url);
    const data = await response.json();
    return data.results; 
}

//function to fetch games released in the last 30 days
async function fetchGamesLast30() {
    const url = `https://api.rawg.io/api/games?key=${API_KEY}&dates=2024-10-05,2024-11-04&page_size=20`;

    const response = await fetch(url);
    const data = await response.json();
    return data.results;
}


async function fetchGamesCurrentMonth() {
    const url = `https://api.rawg.io/api/games?key=${API_KEY}&dates=2024-10-01,2024-11-04&page_size=20`; 

    const response = await fetch(url);
    const data = await response.json();
    return data.results; 
}

 
async function fetchGamesCurrentWeek() {
    const url = `https://api.rawg.io/api/games?key=${API_KEY}&dates=2024-10-28,2024-11-04&page_size=20`; 

    const response = await fetch(url);
    const data = await response.json();
    return data.results; 
}


async function fetchGamesByDeveloper(developer) {
    const url = `https://api.rawg.io/api/games?key=${API_KEY}&developers=${developer}&page_size=20`; 

    const response = await fetch(url);
    const data = await response.json();
    return data.results; 
}


 
async function displayDevelopers() {
    const resultsContainer = document.getElementById('game-results');
    
    resultsContainer.innerHTML = '<p>Loading...</p>'; 

    try {
        const developers = await fetchDevelopers(); 

        if (developers.length > 0) {
            resultsContainer.innerHTML = ''; 

            const gridContainer = document.createElement('div');
            gridContainer.classList.add('grid', 'grid-cols-1', 'sm:grid-cols-2', 'md:grid-cols-3', 'lg:grid-cols-4', 'gap-6');

            developers.forEach(developer => {
                const listItem = document.createElement('div');
                listItem.classList.add('game-item', 'bg-white', 'rounded-lg', 'shadow', 'p-4');

                
                listItem.innerHTML = `
                    <img src="${developer.image_background}" alt="${developer.name}" class="w-full mb-4 rounded-lg h-48 object-cover">
                    <h3 class="text-lg font-bold p-1">${developer.name}</h3>
                    <p class="text-sm p-1">Number Of Games: ${developer.games_count}</p>
                    <p class="text-sm p-1">Games: ${developer.games.map(g => g.name).join(', ')}</p>
                `;
                gridContainer.appendChild(listItem);
            });

            resultsContainer.appendChild(gridContainer);
        } else {
            resultsContainer.innerHTML = '<p>No developers found.</p>';
        }
    } catch (error) {
        console.error(error);
        resultsContainer.innerHTML = '<p>Failed to load developers. Please try again later.</p>';
    }
}



async function displayGamesPlaystation() {
    const resultsContainer = document.getElementById('game-results');
    
    resultsContainer.innerHTML = '<p>Loading...</p>'; 

    try {
        const games = await fetchGamesByPlatform(18); 

        if (games.length > 0) {
            resultsContainer.innerHTML = ''; 

            const gridContainer = document.createElement('div');
            gridContainer.classList.add('grid', 'grid-cols-1', 'sm:grid-cols-2', 'md:grid-cols-3', 'lg:grid-cols-4', 'gap-6');

            games.forEach(game => {
                const listItem = document.createElement('div');
                listItem.classList.add('game-item', 'bg-white', 'rounded-lg', 'shadow', 'p-4');

                
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
        } else {
            resultsContainer.innerHTML = '<p>No games found for this platform.</p>';
        }
    } catch (error) {
        console.error(error);
        resultsContainer.innerHTML = '<p>Failed to load games. Please try again later.</p>';
    }
}


document.getElementById('developers').addEventListener('click', displayDevelopers);

document.getElementById('playstation').addEventListener('click', displayGamesPlaystation); 


async function displayGamesXbox() {
    const resultsContainer = document.getElementById('game-results');
    
    resultsContainer.innerHTML = '<p>Loading...</p>'; 

    try {
        const games = await fetchGamesByPlatform(1); 

        if (games.length > 0) {
            resultsContainer.innerHTML = ''; 

            const gridContainer = document.createElement('div');
            gridContainer.classList.add('grid', 'grid-cols-1', 'sm:grid-cols-2', 'md:grid-cols-3', 'lg:grid-cols-4', 'gap-6');

            games.forEach(game => {
                const listItem = document.createElement('div');
                listItem.classList.add('game-item', 'bg-white', 'rounded-lg', 'shadow', 'p-4');

                
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
        } else {
            resultsContainer.innerHTML = '<p>No games found for this platform.</p>';
        }
    } catch (error) {
        console.error(error);
        resultsContainer.innerHTML = '<p>Failed to load games. Please try again later.</p>';
    }
}

document.getElementById('xbox').addEventListener('click', displayGamesXbox);


async function displayGamesNintendo() {
    const resultsContainer = document.getElementById('game-results');
    
    resultsContainer.innerHTML = '<p>Loading...</p>'; 

    try {
        const games = await fetchGamesByPlatform(7); 

        if (games.length > 0) {
            resultsContainer.innerHTML = ''; 

            const gridContainer = document.createElement('div');
            gridContainer.classList.add('grid', 'grid-cols-1', 'sm:grid-cols-2', 'md:grid-cols-3', 'lg:grid-cols-4', 'gap-6');

            games.forEach(game => {
                const listItem = document.createElement('div');
                listItem.classList.add('game-item', 'bg-white', 'rounded-lg', 'shadow', 'p-4');

                
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
        } else {
            resultsContainer.innerHTML = '<p>No games found for this platform.</p>';
        }
    } catch (error) {
        console.error(error);
        resultsContainer.innerHTML = '<p>Failed to load games. Please try again later.</p>';
    }
}

document.getElementById('nintendo').addEventListener('click', displayGamesNintendo);


async function displayGamesPC() {
    const resultsContainer = document.getElementById('game-results');
    
    resultsContainer.innerHTML = '<p>Loading...</p>'; 

    try {
        const games = await fetchGamesByPlatform(4); 

        if (games.length > 0) {
            resultsContainer.innerHTML = ''; 

            const gridContainer = document.createElement('div');
            gridContainer.classList.add('grid', 'grid-cols-1', 'sm:grid-cols-2', 'md:grid-cols-3', 'lg:grid-cols-4', 'gap-6');

            games.forEach(game => {
                const listItem = document.createElement('div');
                listItem.classList.add('game-item', 'bg-white', 'rounded-lg', 'shadow', 'p-4');

                
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
        } else {
            resultsContainer.innerHTML = '<p>No games found for this platform.</p>';
        }
    } catch (error) {
        console.error(error);
        resultsContainer.innerHTML = '<p>Failed to load games. Please try again later.</p>';
    }
}

document.getElementById('pc').addEventListener('click', displayGamesPC);


async function displayGamesMobile() {
    const resultsContainer = document.getElementById('game-results');
    
    resultsContainer.innerHTML = '<p>Loading...</p>'; 

    try {
        const games = await fetchGamesByPlatform(8); 

        if (games.length > 0) {
            resultsContainer.innerHTML = ''; 

            const gridContainer = document.createElement('div');
            gridContainer.classList.add('grid', 'grid-cols-1', 'sm:grid-cols-2', 'md:grid-cols-3', 'lg:grid-cols-4', 'gap-6');

            games.forEach(game => {
                const listItem = document.createElement('div');
                listItem.classList.add('game-item', 'bg-white', 'rounded-lg', 'shadow', 'p-4');

                
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
        } else {
            resultsContainer.innerHTML = '<p>No games found for this platform.</p>';
        }
    } catch (error) {
        console.error(error);
        resultsContainer.innerHTML = '<p>Failed to load games. Please try again later.</p>';
    }
}


document.getElementById('mobile').addEventListener('click', displayGamesMobile);



async function displayGames2024() {
    const resultsContainer = document.getElementById('game-results');
    
    resultsContainer.innerHTML = '<p>Loading...</p>'; 

    try {
        const games = await fetchGames2024(); 

        if (games.length > 0) {
            resultsContainer.innerHTML = ''; 

            const gridContainer = document.createElement('div');
            gridContainer.classList.add('grid', 'grid-cols-1', 'sm:grid-cols-2', 'md:grid-cols-3', 'lg:grid-cols-4', 'gap-6');

            games.forEach(game => {
                const listItem = document.createElement('div');
                listItem.classList.add('game-item', 'bg-white', 'rounded-lg', 'shadow', 'p-4');

                
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
        } else {
            resultsContainer.innerHTML = '<p>No games found for this year.</p>';
        }
    } catch (error) {
        console.error(error);
        resultsContainer.innerHTML = '<p>Failed to load games. Please try again later.</p>';
    }
}

document.getElementById('this-year').addEventListener('click', displayGames2024);


async function displayGamesLast30() {
    const resultsContainer = document.getElementById('game-results');
    
    resultsContainer.innerHTML = '<p>Loading...</p>'; 

    try {
        const games = await fetchGamesLast30(); 

        if (games.length > 0) {
            resultsContainer.innerHTML = ''; 

            const gridContainer = document.createElement('div');
            gridContainer.classList.add('grid', 'grid-cols-1', 'sm:grid-cols-2', 'md:grid-cols-3', 'lg:grid-cols-4', 'gap-6');

            games.forEach(game => {
                const listItem = document.createElement('div');
                listItem.classList.add('game-item', 'bg-white', 'rounded-lg', 'shadow', 'p-4');

                
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
        } else {
            resultsContainer.innerHTML = '<p>No games found for this period.</p>';
        }
    } catch (error) {
        console.error(error);
        resultsContainer.innerHTML = '<p>Failed to load games. Please try again later.</p>';
    }
}

document.getElementById('last-30').addEventListener('click', displayGamesLast30);


async function displayGamesCurrentMonth() {
    const resultsContainer = document.getElementById('game-results');
    
    resultsContainer.innerHTML = '<p>Loading...</p>'; 

    try {
        const games = await fetchGamesCurrentMonth(); 

        if (games.length > 0) {
            resultsContainer.innerHTML = ''; 

            const gridContainer = document.createElement('div');
            gridContainer.classList.add('grid', 'grid-cols-1', 'sm:grid-cols-2', 'md:grid-cols-3', 'lg:grid-cols-4', 'gap-6');

            games.forEach(game => {
                const listItem = document.createElement('div');
                listItem.classList.add('game-item', 'bg-white', 'rounded-lg', 'shadow', 'p-4');

                
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
        } else {
            resultsContainer.innerHTML = '<p>No games found for this period.</p>';
        }
    } catch (error) {
        console.error(error);
        resultsContainer.innerHTML = '<p>Failed to load games. Please try again later.</p>';
    }
}

document.getElementById('this-month').addEventListener('click', displayGamesCurrentMonth);


async function displayGamesCurrentWeek() {
    const resultsContainer = document.getElementById('game-results');
    
    resultsContainer.innerHTML = '<p>Loading...</p>'; 

    try {
        const games = await fetchGamesCurrentWeek(); 

        if (games.length > 0) {
            resultsContainer.innerHTML = ''; 

            const gridContainer = document.createElement('div');
            gridContainer.classList.add('grid', 'grid-cols-1', 'sm:grid-cols-2', 'md:grid-cols-3', 'lg:grid-cols-4', 'gap-6');

            games.forEach(game => {
                const listItem = document.createElement('div');
                listItem.classList.add('game-item', 'bg-white', 'rounded-lg', 'shadow', 'p-4');

                
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
        } else {
            resultsContainer.innerHTML = '<p>No games found for this period.</p>';
        }
    } catch (error) {
        console.error(error);
        resultsContainer.innerHTML = '<p>Failed to load games. Please try again later.</p>';
    }
}

document.getElementById('this-week').addEventListener('click', displayGamesCurrentWeek);


async function displayActionGames() {
    const resultsContainer = document.getElementById('game-results');
    
    resultsContainer.innerHTML = '<p>Loading...</p>'; 

    try {
        const games = await fetchGamesByGenre('action'); 

        if (games.length > 0) {
            resultsContainer.innerHTML = ''; 

            const gridContainer = document.createElement('div');
            gridContainer.classList.add('grid', 'grid-cols-1', 'sm:grid-cols-2', 'md:grid-cols-3', 'lg:grid-cols-4', 'gap-6');

            games.forEach(game => {
                const listItem = document.createElement('div');
                listItem.classList.add('game-item', 'bg-white', 'rounded-lg', 'shadow', 'p-4');

                
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
        } else {
            resultsContainer.innerHTML = '<p>No games found for this genre.</p>';
        }
    } catch (error) {
        console.error(error);
        resultsContainer.innerHTML = '<p>Failed to load games. Please try again later.</p>';
    }
}

document.getElementById('action').addEventListener('click', displayActionGames);


async function displayAdventureGames() {
    const resultsContainer = document.getElementById('game-results');
    
    resultsContainer.innerHTML = '<p>Loading...</p>'; 

    try {
        const games = await fetchGamesByGenre('adventure'); 

        if (games.length > 0) {
            resultsContainer.innerHTML = ''; 

            const gridContainer = document.createElement('div');
            gridContainer.classList.add('grid', 'grid-cols-1', 'sm:grid-cols-2', 'md:grid-cols-3', 'lg:grid-cols-4', 'gap-6');

            games.forEach(game => {
                const listItem = document.createElement('div');
                listItem.classList.add('game-item', 'bg-white', 'rounded-lg', 'shadow', 'p-4');

                
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
        } else {
            resultsContainer.innerHTML = '<p>No games found for this genre.</p>';
        }
    } catch (error) {
        console.error(error);
        resultsContainer.innerHTML = '<p>Failed to load games. Please try again later.</p>';
    }
}

document.getElementById('adventure').addEventListener('click', displayAdventureGames);


async function displayRPGGames() {
    const resultsContainer = document.getElementById('game-results');
    
    resultsContainer.innerHTML = '<p>Loading...</p>'; 

    try {
        const games = await fetchGamesByGenre('role-playing-games-rpg'); 

        if (games.length > 0) {
            resultsContainer.innerHTML = ''; 

            const gridContainer = document.createElement('div');
            gridContainer.classList.add('grid', 'grid-cols-1', 'sm:grid-cols-2', 'md:grid-cols-3', 'lg:grid-cols-4', 'gap-6');

            games.forEach(game => {
                const listItem = document.createElement('div');
                listItem.classList.add('game-item', 'bg-white', 'rounded-lg', 'shadow', 'p-4');

                
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
        } else {
            resultsContainer.innerHTML = '<p>No games found for this genre.</p>';
        }
    } catch (error) {
        console.error(error);
        resultsContainer.innerHTML = '<p>Failed to load games. Please try again later.</p>';
    }
}

document.getElementById('rpg').addEventListener('click', displayRPGGames);


async function displayShooterGames() {
    const resultsContainer = document.getElementById('game-results');
    
    resultsContainer.innerHTML = '<p>Loading...</p>'; 

    try {
        const games = await fetchGamesByGenre('shooter'); 

        if (games.length > 0) {
            resultsContainer.innerHTML = ''; 

            const gridContainer = document.createElement('div');
            gridContainer.classList.add('grid', 'grid-cols-1', 'sm:grid-cols-2', 'md:grid-cols-3', 'lg:grid-cols-4', 'gap-6');

            games.forEach(game => {
                const listItem = document.createElement('div');
                listItem.classList.add('game-item', 'bg-white', 'rounded-lg', 'shadow', 'p-4');

                
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
        } else {
            resultsContainer.innerHTML = '<p>No games found for this genre.</p>';
        }
    } catch (error) {
        console.error(error);
        resultsContainer.innerHTML = '<p>Failed to load games. Please try again later.</p>';
    }
}

document.getElementById('shooter').addEventListener('click', displayShooterGames);


async function displayStrategyGames() {
    const resultsContainer = document.getElementById('game-results');
    
    resultsContainer.innerHTML = '<p>Loading...</p>'; 

    try {
        const games = await fetchGamesByGenre('strategy'); 

        if (games.length > 0) {
            resultsContainer.innerHTML = ''; 

            const gridContainer = document.createElement('div');
            gridContainer.classList.add('grid', 'grid-cols-1', 'sm:grid-cols-2', 'md:grid-cols-3', 'lg:grid-cols-4', 'gap-6');

            games.forEach(game => {
                const listItem = document.createElement('div');
                listItem.classList.add('game-item', 'bg-white', 'rounded-lg', 'shadow', 'p-4');

                
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
        } else {
            resultsContainer.innerHTML = '<p>No games found for this genre.</p>';
        }
    } catch (error) {
        console.error(error);
        resultsContainer.innerHTML = '<p>Failed to load games. Please try again later.</p>';
    }
}

document.getElementById('strategy').addEventListener('click', displayStrategyGames);


async function displaySportsGames() {
    const resultsContainer = document.getElementById('game-results');
    
    resultsContainer.innerHTML = '<p>Loading...</p>'; 

    try {
        const games = await fetchGamesByGenre('sports'); 

        if (games.length > 0) {
            resultsContainer.innerHTML = ''; 

            const gridContainer = document.createElement('div');
            gridContainer.classList.add('grid', 'grid-cols-1', 'sm:grid-cols-2', 'md:grid-cols-3', 'lg:grid-cols-4', 'gap-6');

            games.forEach(game => {
                const listItem = document.createElement('div');
                listItem.classList.add('game-item', 'bg-white', 'rounded-lg', 'shadow', 'p-4');

                
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
        } else {
            resultsContainer.innerHTML = '<p>No games found for this genre.</p>';
        }
    } catch (error) {
        console.error(error);
        resultsContainer.innerHTML = '<p>Failed to load games. Please try again later.</p>';
    }
}

document.getElementById('sports').addEventListener('click', displaySportsGames);


async function displayPuzzleGames() {
    const resultsContainer = document.getElementById('game-results');
    
    resultsContainer.innerHTML = '<p>Loading...</p>'; 

    try {
        const games = await fetchGamesByGenre('puzzle'); 

        if (games.length > 0) {
            resultsContainer.innerHTML = ''; 

            const gridContainer = document.createElement('div');
            gridContainer.classList.add('grid', 'grid-cols-1', 'sm:grid-cols-2', 'md:grid-cols-3', 'lg:grid-cols-4', 'gap-6');

            games.forEach(game => {
                const listItem = document.createElement('div');
                listItem.classList.add('game-item', 'bg-white', 'rounded-lg', 'shadow', 'p-4');

                
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
        } else {
            resultsContainer.innerHTML = '<p>No games found for this genre.</p>';
        }
    } catch (error) {
        console.error(error);
        resultsContainer.innerHTML = '<p>Failed to load games. Please try again later.</p>';
    }
}

document.getElementById('puzzle').addEventListener('click', displayPuzzleGames);


async function displayRacingGames() {
    const resultsContainer = document.getElementById('game-results');
    
    resultsContainer.innerHTML = '<p>Loading...</p>'; 

    try {
        const games = await fetchGamesByGenre('racing'); 

        if (games.length > 0) {
            resultsContainer.innerHTML = ''; 

            const gridContainer = document.createElement('div');
            gridContainer.classList.add('grid', 'grid-cols-1', 'sm:grid-cols-2', 'md:grid-cols-3', 'lg:grid-cols-4', 'gap-6');

            games.forEach(game => {
                const listItem = document.createElement('div');
                listItem.classList.add('game-item', 'bg-white', 'rounded-lg', 'shadow', 'p-4');

                
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
        } else {
            resultsContainer.innerHTML = '<p>No games found for this genre.</p>';
        }
    } catch (error) {
        console.error(error);
        resultsContainer.innerHTML = '<p>Failed to load games. Please try again later.</p>';
    }
}

document.getElementById('racing').addEventListener('click', displayRacingGames);



async function displayGamesNext30() {
    const resultsContainer = document.getElementById('game-results');
    
    resultsContainer.innerHTML = '<p>Loading...</p>'; 

    try {
        const games = await fetchGamesNext30(); 

        if (games.length > 0) {
            resultsContainer.innerHTML = ''; 

            const gridContainer = document.createElement('div');
            gridContainer.classList.add('grid', 'grid-cols-1', 'sm:grid-cols-2', 'md:grid-cols-3', 'lg:grid-cols-4', 'gap-6');

            games.forEach(game => {
                const listItem = document.createElement('div');
                listItem.classList.add('game-item', 'bg-white', 'rounded-lg', 'shadow', 'p-4');

                
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
        } else {
            resultsContainer.innerHTML = '<p>No games found for this period.</p>';
        }
    } catch (error) {
        console.error(error);
        resultsContainer.innerHTML = '<p>Failed to load games. Please try again later.</p>';
    }
}

//function to fetch games released in the next 30 days
async function fetchGamesNext30() {
    const url = `https://api.rawg.io/api/games?key=${API_KEY}&dates=2024-11-04,2024-12-04&page_size=20`; 

    const response = await fetch(url);
    const data = await response.json();
    return data.results; 
}

document.getElementById('next-30').addEventListener('click', displayGamesNext30);
// Color alternation for aside element (white to post-it note yellow)
const aside = document.getElementById("previous-searches");
const asideColors = ["#ffffff", "#fef3c7"]; // white and light yellow (post-it note color)
let asideColorIndex = 0;

setInterval(() => {
    aside.style.backgroundColor = asideColors[asideColorIndex];
    asideColorIndex = (asideColorIndex + 1) % asideColors.length;
}, 1000); // Changes every 1 second

