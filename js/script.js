// Event listener for form submission to search for games
document.getElementById('game-search-form').addEventListener('submit', function(event) {
    event.preventDefault(); 

    const query = document.getElementById('search-input').value.trim();
    if (query) {
        searchGames(query); // Perform the search using the query for names, genres, platforms
    } else {
        // Create modal elements
        const modal = document.createElement('div');
        modal.classList.add('modal', 'fixed', 'inset-0', 'flex', 'items-center', 'justify-center', 'bg-black', 'bg-opacity-50');

        const modalContent = document.createElement('div');
        modalContent.classList.add('modal-content', 'bg-white', 'p-6', 'rounded-lg', 'shadow-lg');

        const modalText = document.createElement('p');
        modalText.textContent = 'Please enter a search query.';

        const closeButton = document.createElement('button');
        closeButton.textContent = 'Close';
        closeButton.classList.add('mt-4', 'px-4', 'py-2', 'bg-blue-500', 'text-white', 'rounded');
        closeButton.addEventListener('click', () => {
            document.body.removeChild(modal);
        });

        // Append elements
        modalContent.appendChild(modalText);
        modalContent.appendChild(closeButton);
        modal.appendChild(modalContent);
        document.body.appendChild(modal);
    }
});
const API_KEY = '93fbde2a685d45cea6a36af991b6da2e'; // Your actual RAWG

// Function to fetch games from RAWG API based on search query
async function fetchGames(query) {
    const url = `https://api.rawg.io/api/games?key=${API_KEY}&search=${query}&page_size=20`; // Limit results to 20

    const response = await fetch(url);
    const data = await response.json();
    return data.results; // Returns the array of games
}

// Function to handle game search and display results
async function searchGames(query) {
    const resultsContainer = document.getElementById('game-results');
    
    resultsContainer.innerHTML = '<p>Loading...</p>'; // Show loading message

    try {
        const games = await fetchGames(query); // Fetch games based on input

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
        } else {
            resultsContainer.innerHTML = '<p>No games found matching your search criteria.</p>';
        }
    } catch (error) {
        console.error(error);
        resultsContainer.innerHTML = '<p>Failed to load games. Please try again later.</p>';
    }
}

// Event listener for form submission to search for games
document.getElementById('game-search-form').addEventListener('submit', function(event) {
    event.preventDefault(); 

    const query = document.getElementById('search-input').value.trim();
    if (query) {
        searchGames(query); // Perform the search using the query for names, genres, platforms
    } else {
        // Create modal elements
        const modal = document.createElement('div');
        modal.classList.add('modal', 'fixed', 'inset-0', 'flex', 'items-center', 'justify-center', 'bg-black', 'bg-opacity-50');

        const modalContent = document.createElement('div');
        modalContent.classList.add('modal-content', 'bg-white', 'p-6', 'rounded-lg', 'shadow-lg');

        const modalText = document.createElement('p');
        modalText.textContent = 'Please enter a search query.';

        const closeButton = document.createElement('button');
        closeButton.textContent = 'Close';
        closeButton.classList.add('mt-4', 'px-4', 'py-2', 'bg-blue-500', 'text-white', 'rounded');
        closeButton.addEventListener('click', () => {
            document.body.removeChild(modal);
        });

        // Append elements
        modalContent.appendChild(modalText);
        modalContent.appendChild(closeButton);
        modal.appendChild(modalContent);
        document.body.appendChild(modal);
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