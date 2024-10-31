import "flowbite";

document.addEventListener('DOMContentLoaded', function () {
    const modal = document.getElementById('gameModal');
    const openModalButton = document.querySelector('[data-modal-toggle="gameModal"]');
    const closeModalButtons = document.querySelectorAll('[data-modal-hide="gameModal"]');

    // Open modal
    openModalButton.addEventListener('click', () => {
        modal.classList.remove('hidden');
    });

    // Close modal on button clicks
    closeModalButtons.forEach(button => {
        button.addEventListener('click', () => {
            modal.classList.add('hidden');
        });
    });
});
