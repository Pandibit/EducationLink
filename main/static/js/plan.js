document.addEventListener('DOMContentLoaded', () => {
    // Get references to the button and the div to be displayed
    const addButton = document.getElementById('add-plan-div');
    const eventDiv = document.getElementById('add-event-div');

    // Check if both elements are found in the DOM
    if (addButton && eventDiv) {
        // Add click event listener to the button
        addButton.addEventListener('click', () => {
            // Toggle the 'hidden' class on the eventDiv
            eventDiv.classList.toggle('hidden');
        });

        // Function to hide the eventDiv (e.g., triggered by cancel button)
        function hideEventDiv() {
            eventDiv.classList.add('hidden');
        }
    } else {
        console.error('Could not find one or both DOM elements.');
    }
});

document.addEventListener('DOMContentLoaded', () => {
    // Function to hide the specified div
    function hideTargetDiv() {
        const targetDiv = document.getElementById('add-event-div');
        if (targetDiv) {
            targetDiv.classList.add('hidden');
        }
    }

    // Get references to the cancel buttons
    const cancelButton = document.getElementById('cancel-div');
    const cancelButtonTop = document.getElementById('cancel-div-top');

    // Add click event listeners to both cancel buttons
    if (cancelButton) {
        cancelButton.addEventListener('click', () => {
            hideTargetDiv();
        });
    }

    if (cancelButtonTop) {
        cancelButtonTop.addEventListener('click', () => {
            hideTargetDiv();
        });
    }
});