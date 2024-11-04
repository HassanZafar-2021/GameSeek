document.addEventListener('DOMContentLoaded', function () {
    const API_KEY = '93fbde2a685d45cea6a36af991b6da2e'; // Replace with your RAWG API key

    // Modal elements
    const compareModal = document.getElementById('compareModal');
    const openCompareButton = document.getElementById('openCompareModal');
    const closeCompareButton = document.getElementById('closeCompareModal');
    const game1Input = document.getElementById('game1-input');
    const game2Input = document.getElementById('game2-input');
    const game1Details = document.getElementById('game1-details');
    const game2Details = document.getElementById('game2-details');
    const compareButton = document.getElementById('compareButton');
    const clearButton = document.getElementById('clearButton');
    const colorPicker = document.getElementById('colorPicker');
    const compareModalContainer = compareModal.querySelector('.bg-white'); // Select the modal container

    // Open comparison modal
    openCompareButton.addEventListener('click', () => {
        compareModal.classList.remove('hidden');
        compareModal.style.display = 'flex';
        // Focus on the first input when the modal opens
        game1Input.focus();
    });

    // Function to fetch game details from RAWG API
    async function fetchGameDetails(query) {
        const url = `https://api.rawg.io/api/games?key=${API_KEY}&search=${query}&page_size=1`;
        try {
            const response = await fetch(url);
            if (!response.ok) throw new Error('Network response was not ok');
            const data = await response.json();
            console.log(data); // Inspect the API response
            const game = data.results[0];
            console.log(game); // Inspect the game object
            return game; // Return the first game result
        } catch (error) {
            console.error(error);
            return null; // Handle this case in displayGameDetails
        }
    }

    // Display game details in the comparison modal
    async function displayGameDetails(query, container) {
        const game = await fetchGameDetails(query);
        if (game) {
            const developers = game.developers && game.developers.length > 0 
                ? game.developers.map(d => d.name).join(', ') 
                : 'N/A'; // Handle cases with no developers
            
            container.innerHTML = `
                <img src="${game.background_image}" alt="${game.name}" class="w-full mb-4 rounded-lg h-48 object-cover">
                <h3 class="text-lg font-bold">${game.name}</h3>
                <p class="text-sm">Release Date: ${game.released}</p>
                <p class="text-sm">Platforms: ${game.platforms.map(p => p.platform.name).join(', ')}</p>
                <p class="text-sm">Genres: ${game.genres.map(g => g.name).join(', ')}</p>
                <p class="text-sm">Developers: ${developers}</p>
            `;
        } else {
            container.innerHTML = '<p>No game found.</p>';
        }
        console.log(game);
    }

    // Event listener for Compare button
    compareButton.addEventListener('click', async () => {
        const game1Query = game1Input.value.trim();
        const game2Query = game2Input.value.trim();

        // Clear previous details
        game1Details.innerHTML = '';
        game2Details.innerHTML = '';

        // Fetch and display details for game 1
        if (game1Query) {
            await displayGameDetails(game1Query, game1Details);
        } else {
            game1Details.innerHTML = '<p>Please enter a game name.</p>';
        }

        // Fetch and display details for game 2
        if (game2Query) {
            await displayGameDetails(game2Query, game2Details);
        } else {
            game2Details.innerHTML = '<p>Please enter a game name.</p>';
        }
    });

    // Color picker functionality
    colorPicker.addEventListener('input', (event) => {
        const selectedColor = event.target.value;
        compareModalContainer.style.backgroundColor = selectedColor; // Change the background color of the modal container
        console.log(`Selected color: ${selectedColor}`); // Log the selected color value
    });

    // Add functionality to load game data with the Enter key
    document.addEventListener('keydown', (event) => {
        if (compareModal.style.display === 'flex' && event.key === 'Enter') {
            compareButton.click(); // Trigger click event on Compare button
        }
    });

    // Clear button functionality
    clearButton.addEventListener('click', () => {
        game1Input.value = '';
        game2Input.value = '';
        game1Details.innerHTML = '';
        game2Details.innerHTML = '';
    });

    // Close comparison modal on button click
    closeCompareButton.addEventListener('click', () => {
        compareModal.classList.add('hidden');
        compareModal.style.display = 'none';
    });
});
