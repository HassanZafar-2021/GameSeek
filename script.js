const data = [
    'League of Legends',
    'Valorant',
    'Teamfight Tactics',
    'Legends of Runeterra',
    'Wild Rift'
];

// Function to filter and display results
function search(query) {
    const results = document.getElementById('game-results');
    results.innerHTML = '';  // Clear previous results

    if (query) {
        const filteredData = data.filter(item => item.toLowerCase().includes(query.toLowerCase()));
        filteredData.forEach(item => {
            const listItem = document.createElement('p');
            listItem.innerHTML = highlightTerm(item, query);
            results.appendChild(listItem);
        });
    } else {
        results.innerHTML = '<p>Use the search above to find games matching your criteria.</p>';
    }
}

// Function to highlight the search term in the results
function highlightTerm(text, term) {
    const regex = new RegExp(`(${term})`, 'gi');
    return text.replace(regex, '<mark>$1</mark>');
}

// Event listener for the search input
document.querySelector('input[name="search"]').addEventListener('input', (event) => {
    search(event.target.value);
});

// Prevent the form from reloading the page on submit
document.getElementById('game-search-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const query = document.querySelector('input[name="search"]').value;
    search(query);
});