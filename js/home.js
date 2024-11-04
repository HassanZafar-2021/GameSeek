const button = document.querySelector('button');
if (button) {
  button.addEventListener('click', function() {
    window.location.href = 'index.html';
  });
}

// Select the "Back to Home" button by its ID
const backToHomeButton = document.getElementById('backToHome');

// Add event listener for the "Back to Home" button
if (backToHomeButton) {
    backToHomeButton.addEventListener('click', function() {
        window.location.href = 'home.html'; // Redirect to home.html
    });
}
