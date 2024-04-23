
function showNotification(message) {
    // Create notification panel
    const notificationPanel = document.createElement("div");
    notificationPanel.classList.add(
      "fixed",
      "inset-0",
      "flex",
      "items-end",
      "px-4",
      "py-6",
      "pointer-events-none",
      "sm:p-6",
      "sm:items-start"
    );
    notificationPanel.setAttribute("aria-live", "assertive");
  
    // Inner content
    notificationPanel.innerHTML = `
    <div class="w-full flex flex-col items-center space-y-4 sm:items-end">
    <div class="max-w-sm w-full bg-white shadow-lg rounded-lg pointer-events-auto ring-1 ring-black ring-opacity-5 overflow-hidden">
      <div class="p-4">
        <div class="flex items-start">
        <div class="flex-shrink-0">
        <!-- Heroicon name: solid/exclamation -->
        <svg class="h-5 w-5 text-green-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
          <path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd" />
        </svg>
      </div>
      <div class="ml-3">
        <h3 class="text-sm font-medium text-green-800">Successful response</h3>
        <div class="mt-2 text-sm text-green-700">
          <p>${message}</p>
        </div>
      </div>
        </div>
      </div>
    </div>
  </div>
    `;
  
    // Append notification panel to the body
    document.body.appendChild(notificationPanel);
  }
  

  function showAlert(message, duration = 1200) {
    // Create notification panel
    const notificationPanel = document.createElement("div");
    notificationPanel.classList.add(
      "fixed",
      "inset-0",
      "flex",
      "items-end",
      "px-4",
      "py-6",
      "pointer-events-none",
      "sm:p-6",
      "sm:items-start"
    );
    notificationPanel.setAttribute("aria-live", "assertive");
  
    // Inner content
    notificationPanel.innerHTML = `
    <div class="w-full flex flex-col items-center space-y-4 sm:items-end">
        <div class="max-w-sm w-full bg-white shadow-lg rounded-lg pointer-events-auto ring-1 ring-black ring-opacity-5 overflow-hidden">
          <div class="p-4">
            <div class="flex items-start">
            <div class="flex-shrink-0">
            <!-- Heroicon name: solid/exclamation -->
            <svg class="h-5 w-5 text-yellow-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd" />
            </svg>
          </div>
          <div class="ml-3">
            <h3 class="text-sm font-medium text-yellow-800">Attention needed</h3>
            <div class="mt-2 text-sm text-yellow-700">
              <p>${message}</p>
            </div>
          </div>
            </div>
          </div>
        </div>
      </div>
     
    `;
  
    // Append notification panel to the body
    document.body.appendChild(notificationPanel);
  
    setTimeout(() => {
      notificationPanel.remove();
    }, duration);
  }



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


function getCSRFToken() {
    var csrfToken = null;
    var cookies = document.cookie.split(';');
    for (var i = 0; i < cookies.length; i++) {
        var cookie = cookies[i].trim();
        if (cookie.startsWith('csrftoken=')) {
            csrfToken = cookie.substring('csrftoken='.length, cookie.length);
            break;
        }
    }
    return csrfToken;
}


document.addEventListener('DOMContentLoaded', function() {
    const savePlanButton = document.getElementById('save_plan_btn');

    // Add event listener to the Save Plan button
    savePlanButton.addEventListener('click', function(event) {
        event.preventDefault(); // Prevent default form submission behavior

        // Collect input values
        const activity = document.getElementById('floating_last_name').value;
        const startTime = document.getElementById('start-time').value;
        const endTime = document.getElementById('end-time').value;

        // Check if a radio button is checked
        const checkedRadioButton = document.querySelector('input[name="status"]:checked');
        console.log(checkedRadioButton);
        if (!checkedRadioButton) {
            showAlert("Please select a status for your activity");
            return; // Stop further execution
        }

        const status = checkedRadioButton.value;

        // Create FormData object to store form data
        const formData = new FormData();
        formData.append('activity', activity);
        formData.append('start_time', startTime);
        formData.append('end_time', endTime);
        formData.append('status', status);

        // Perform AJAX request to save the plan
        fetch('/save_plan/', {
            method: 'POST',
            body: formData,
            headers: {
                'X-CSRFToken': getCSRFToken() // Include CSRF token in headers
            }
        })
        .then(response => {
            if (response.ok) {
                // Handle successful response
                showNotification("Plan saved successfully")
                location.reload(); // Reload the page after successful submission (optional)
            } else {
                // Handle unsuccessful response
                showAlert('You have other fields to save also');
            }
        })
        .catch(error => {
            // Handle network or other errors
            console.error('Error:', error);
            alert('An error occurred. Please try again.');
        });
    });

    // Function to retrieve CSRF token from cookies
    function getCSRFToken() {
        const csrfTokenCookie = document.cookie.split('; ').find(cookie => cookie.startsWith('csrftoken='));
        if (csrfTokenCookie) {
            return csrfTokenCookie.split('=')[1];
        }
        return null;
    }
});


document.addEventListener('DOMContentLoaded', function() {
    const menuButton = document.getElementById('plan-menu-btn');
    const menu = document.getElementById('plan-menu');

    // Function to show the menu
    function showMenu() {
        menu.style.display = 'block';
        // Attach a click event listener to the document to handle outside clicks
        document.addEventListener('click', handleOutsideClick);
    }

    // Function to hide the menu
    function hideMenu() {
        menu.style.display = 'none';
        // Remove the click event listener from the document
        document.removeEventListener('click', handleOutsideClick);
    }

    // Function to handle outside clicks
    function handleOutsideClick(event) {
        // Check if the clicked element is outside the menu
        if (!menu.contains(event.target) && event.target !== menuButton) {
            hideMenu();
        }
    }

    // Toggle the menu visibility when the button is clicked
    menuButton.addEventListener('click', function(event) {
        event.stopPropagation(); // Prevent the click from propagating to the document
        if (menu.style.display === 'block') {
            hideMenu();
        } else {
            showMenu();
        }
    });
});



document.addEventListener('DOMContentLoaded', () => {
    const addButton = document.getElementById('add_activity');
    const eventDiv = document.getElementById('add-event-div');

    if (addButton && eventDiv) {
        // Function to toggle visibility of eventDiv
        function toggleEventDiv() {
            eventDiv.classList.toggle('hidden');
        }

        // Add click event listener to the addButton
        addButton.addEventListener('click', (event) => {
            event.stopPropagation(); // Prevent the click from reaching the document
            toggleEventDiv();
        });

        // Add click event listener to the document to handle outside clicks
        document.addEventListener('click', (event) => {
            const isClickedInsideEventDiv = eventDiv.contains(event.target);
            const isClickedOnAddButton = (event.target === addButton);

            if (!isClickedInsideEventDiv && !isClickedOnAddButton) {
                // If clicked outside both eventDiv and addButton, hide eventDiv
                eventDiv.classList.add('hidden');
            }
        });

      
    } else {
        console.error('Could not find one or both DOM elements.');
    }
});





document.addEventListener('DOMContentLoaded', () => {
    // Get all dropdown buttons within plan items
    const dropdownButtons = document.querySelectorAll('.dropdown-button');

    // Add click event listener to each dropdown button
    dropdownButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            event.stopPropagation(); // Prevent event from bubbling up

            // Find the parent plan item (list item)
            const parentPlanItem = button.closest('.col-span-1');

            if (parentPlanItem) {
                // Find the corresponding dropdown menu within the parent plan item
                const dropdownMenu = parentPlanItem.querySelector('.dropdownDots');

                if (dropdownMenu) {
                    // Toggle visibility of the dropdown menu
                    dropdownMenu.classList.toggle('hidden');

                    // Hide all other dropdown menus except the one clicked
                    document.querySelectorAll('.dropdownDots').forEach(menu => {
                        if (menu !== dropdownMenu) {
                            menu.classList.add('hidden');
                        }
                    });
                }
            }
        });
    });

    // Get all edit-event links
    const editEventLinks = document.querySelectorAll(".edit-event");

    // Add click event listener to each edit-event link
    editEventLinks.forEach(link => {
        link.addEventListener('click', (event) => {
            event.preventDefault(); // Prevent default link behavior (navigation)

            // Hide all dropdown menus when an edit-event link is clicked
            document.querySelectorAll('.dropdownDots').forEach(menu => {
                menu.classList.add('hidden');
            });

            // Here, you can add the logic to show your update-event-div
            const updateEventDiv = document.getElementById('update-event-div');
            if (updateEventDiv) {
                updateEventDiv.classList.remove('hidden');
            }
        });
    });
});


// Displaying the edit panel 
document.addEventListener("DOMContentLoaded", () => {
    // Find all the edit-event links
    const editEventLinks = document.querySelectorAll(".edit-event");

    // Add click event listener to each edit-event link
    editEventLinks.forEach((link) => {
        link.addEventListener("click", (event) => {
            event.preventDefault(); // Prevent default link behavior (navigation)

            // Show the update-event-div by removing the 'hidden' class
            const updateEventDiv = document.getElementById("update-event-div");
            updateEventDiv.classList.remove("hidden");
        });
    });

    // Find the cancel button and add click event listener
    const cancelButton = document.getElementById("cancel-div");
    cancelButton.addEventListener("click", () => {
        // Hide the update-event-div by adding the 'hidden' class back
        const updateEventDiv = document.getElementById("update-event-div");
        updateEventDiv.classList.add("hidden");
    });

    // Find the close button within update-event-div and add click event listener
    const closeButton = document.querySelector("#update-event-div button");
    closeButton.addEventListener("click", () => {
        // Hide the update-event-div by adding the 'hidden' class back
        const updateEventDiv = document.getElementById("update-event-div");
        updateEventDiv.classList.add("hidden");
    });
});




document.addEventListener('DOMContentLoaded', () => {
    const addButton = document.getElementById('add-plan-div-no');
    const eventDiv = document.getElementById('add-event-div');
    const cancelDiv = document.getElementById('cancel_div_btn');

    if (addButton && eventDiv && cancelDiv) {
        // Function to toggle visibility of eventDiv
        function toggleEventDiv() {
            eventDiv.classList.toggle('hidden');
        }

        // Add click event listener to the addButton
        addButton.addEventListener('click', (event) => {
            event.stopPropagation(); // Prevent the click from reaching the document
            toggleEventDiv();
        });

        // Add click event listener to the document to handle outside clicks
        document.addEventListener('click', (event) => {
            const isClickedInsideEventDiv = eventDiv.contains(event.target);
            const isClickedOnAddButton = (event.target === addButton);

            if (!isClickedInsideEventDiv && !isClickedOnAddButton) {
                // If clicked outside both eventDiv and addButton, hide eventDiv
                eventDiv.classList.add('hidden');
            }
        });

        // Function to close eventDiv when Escape key is pressed
        document.addEventListener('keydown', (event) => {
            if (event.key === 'Escape' && !eventDiv.classList.contains('hidden')) {
                eventDiv.classList.add('hidden');
            }
        });
    } else {
        console.error('Could not find one or both DOM elements.');
    }
});