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