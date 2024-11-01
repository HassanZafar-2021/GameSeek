document.addEventListener('DOMContentLoaded', () => {
    const themeToggle = document.getElementById('themeToggle');
    const body = document.body;
    const dot = document.querySelector('.dot');

    if (themeToggle) {
        if (dot) {
            // Toggle Dark Mode
            themeToggle.addEventListener('change', () => {
                body.classList.toggle('dark-mode');
                dot.classList.toggle('translate-x-full'); // Slide animation
            });
        } else {
            console.error('Dot element not found');
        }
    } else {
        console.error('Theme toggle element not found');
    }
});