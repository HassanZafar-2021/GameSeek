document.addEventListener('DOMContentLoaded', function () {
    const modal = document.getElementById('gameModal');
    const openModalButton = document.querySelector('[data-modal-toggle="gameModal"]');
    const closeModalButtons = document.querySelectorAll('[data-modal-hide="gameModal"]');
    const colorPicker = document.getElementById('colorPicker');
    const game1Details = document.getElementById('game1Details');
    const game2Details = document.getElementById('game2Details');

    // Open Modal
    openModalButton.addEventListener('click', () => {
        modal.classList.remove('hidden');
    });

    // Close Modal
    closeModalButtons.forEach(button => {
        button.addEventListener('click', () => {
            modal.classList.add('hidden');
        });
    });

    // Color Picker for Modal Background
    colorPicker.addEventListener('input', (event) => {
        modal.style.backgroundColor = event.target.value;
    });

    // Example function to display game metadata side-by-side
    function displayGameComparison(game1, game2) {
        game1Details.innerHTML = `
            <p><strong>Title:</strong> ${game1.title}</p>
            <p><strong>Developer:</strong> ${game1.developer}</p>
            <p><strong>Price:</strong> ${game1.price}</p>
            <p><strong>Release Date:</strong> ${game1.releaseDate}</p>
            <p><strong>Genre:</strong> ${game1.genre}</p>
        `;

        game2Details.innerHTML = `
            <p><strong>Title:</strong> ${game2.title}</p>
            <p><strong>Developer:</strong> ${game2.developer}</p>
            <p><strong>Price:</strong> ${game2.price}</p>
            <p><strong>Release Date:</strong> ${game2.releaseDate}</p>
            <p><strong>Genre:</strong> ${game2.genre}</p>
        `;
    }

    // Sample game data for demonstration
    const sampleGame1 = {
        title: "Game 1",
        developer: "Dev Studio 1",
        price: "$20",
        releaseDate: "2024-11-01",
        genre: "Action"
    };

    const sampleGame2 = {
        title: "Game 2",
        developer: "Dev Studio 2",
        price: "$30",
        releaseDate: "2023-09-15",
        genre: "Adventure"
    };

    // Display sample data for testing
    displayGameComparison(sampleGame1, sampleGame2);
});
