document.addEventListener("DOMContentLoaded", function () {
  var loadMenuButton = document.getElementById("user-menu-button");
  var userMenu = document.getElementById("user-menu");

  loadMenuButton.addEventListener("click", function () {
    var isHidden = userMenu.classList.contains("hidden");

    if (isHidden) {
      userMenu.classList.remove("hidden");
    } else {
      userMenu.classList.add("hidden");
    }
  });
});

// Toggle the modal -> Create the new post modal

document.addEventListener("DOMContentLoaded", function () {
  var newpostButton = document.getElementById("newpost-btn");
  var modalCreate = document.getElementById("modal-create");
  var cancelButton = document.getElementById("cancelButton");

  function showModal() {
    modalCreate.classList.remove("hidden");
  }

  function hideModal() {
    modalCreate.classList.add("hidden");
  }

  newpostButton.addEventListener("click", showModal);
  cancelButton.addEventListener("click", hideModal);

  window.addEventListener("keydown", function (event) {
    if (event.key === "Escape") {
      hideModal();
    }
  });
});

// Getting the data from the create post modal and sending them to the url
document.addEventListener("DOMContentLoaded", function () {
  var enterButton = document.getElementById("enterButton");
  var cancelButton = document.getElementById("cancelButton");
  var modal = document.getElementById("modal-create");
  var subjectInput = document.getElementById("subject");
  var shortDescriptionInput = document.getElementById("short-description");
  var dropzoneFileInput = document.getElementById("dropzone-file");

  // Function to retrieve CSRF token from cookie
  function getCookie(name) {
    var cookieValue = null;
    if (document.cookie && document.cookie !== "") {
      var cookies = document.cookie.split(";");
      for (var i = 0; i < cookies.length; i++) {
        var cookie = cookies[i].trim();
        if (cookie.substring(0, name.length + 1) === name + "=") {
          cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
          break;
        }
      }
    }
    return cookieValue;
  }


  function showNotification(message) {
    // Create notification panel
    const notificationPanel = document.createElement('div');
    notificationPanel.classList.add('fixed', 'inset-0', 'flex', 'items-end', 'px-4', 'py-6', 'pointer-events-none', 'sm:p-6', 'sm:items-start');
    notificationPanel.setAttribute('aria-live', 'assertive');
  
    // Inner content
    notificationPanel.innerHTML = `
      <div class="w-full flex flex-col items-center space-y-4 sm:items-end">
        <div class="max-w-sm w-full bg-white shadow-lg rounded-lg pointer-events-auto ring-1 ring-black ring-opacity-5 overflow-hidden">
          <div class="p-4">
            <div class="flex items-start">
              <div class="flex-shrink-0">
                <!-- Success icon -->
                <svg class="h-6 w-6 text-green-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div class="ml-3 w-0 flex-1 pt-0.5">
                <p class="text-sm font-medium text-gray-900">${message}</p>
              </div>
              <div class="ml-4 flex-shrink-0 flex">
                <button class="bg-white rounded-md inline-flex text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                  <span class="sr-only">Close</span>
                  <!-- Close icon -->
                  <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  
    // Append notification panel to the body
    document.body.appendChild(notificationPanel);
  }
  
  
  

  // Event listener for the Enter button
  enterButton.addEventListener("click", function () {
    // Collect input values
    var subject = subjectInput.value;
    var shortDescription = shortDescriptionInput.value;
    var dropzoneFile = dropzoneFileInput.files[0]; // Use files property for file input

    // Create FormData object to send data via AJAX
    var formData = new FormData();
    formData.append("subject", subject);
    formData.append("short_description", shortDescription);
    formData.append("dropzone_file", dropzoneFile);

    // Send AJAX request to Django view
    fetch("/save_post", {
      method: "POST",
      body: formData,
      headers: {
        "X-CSRFToken": getCookie("csrftoken"), // Include CSRF token in headers
        "X-Requested-With": "XMLHttpRequest", // Add this header for Django to detect AJAX requests
        // Add any additional headers as needed
      },
    })
      .then((response) => {
        if (response.ok) {
          showNotification("Successfully created post!")
          location.reload();
          modal.classList.add("hidden"); // Hide the modal
        } else {
          throw new Error("Error occurred while saving post");
        }
      })
      .catch((error) => {
        alert(error.message);
      });
  });

  // Event listener for the Cancel button
  cancelButton.addEventListener("click", function () {
    modal.classList.add("hidden"); // Hide the modal
  });
});

//  Toggle the delete modal when clicking the delete button

document.addEventListener("DOMContentLoaded", function () {
  // Get all delete buttons
  var deleteButtons = document.querySelectorAll(".delete-post-btn");

  // Get the delete modal
  var deleteModal = document.getElementById("delete-post-modal");

  // Add event listener to each delete button
  deleteButtons.forEach(function (deleteButton) {
    // Add event listener to the delete button
    deleteButton.addEventListener("click", function (event) {
      event.preventDefault();
      // Display the modal
      deleteModal.classList.remove("hidden");
    });
  });

  // Close the modal when the user clicks on Cancel
  var cancelButton = document.getElementById("cancel");
  cancelButton.addEventListener("click", function () {
    deleteModal.classList.add("hidden");
  });

  // Close the modal when the user clicks outside of it
  deleteModal.addEventListener("click", function (event) {
    if (event.target === this) {
      deleteModal.classList.add("hidden");
    }
  });
});

// Toggle the modal when clicking the edit post modal
document.addEventListener("DOMContentLoaded", function () {
  // Get all edit buttons
  var editButtons = document.querySelectorAll(".edit-post-btn");

  // Add event listener to each edit button
  editButtons.forEach(function (editButton) {
    editButton.addEventListener("click", function (event) {
      event.preventDefault();
      // Display the update modal
      var updateModal = document.getElementById("post-update-modal");
      updateModal.classList.remove("hidden");
    });
  });

  // Close the update modal when the user clicks on Cancel
  var cancelButton = document.getElementById("cancelButtonupdate");
  cancelButton.addEventListener("click", function () {
    var updateModal = document.getElementById("post-update-modal");
    updateModal.classList.add("hidden");
  });

  // Close the update modal when the user clicks outside of it
  var updateModal = document.getElementById("post-update-modal");
  updateModal.addEventListener("click", function (event) {
    if (event.target === this) {
      updateModal.classList.add("hidden");
    }
  });
});

// Deleting the post and using ajax to send them to the view






