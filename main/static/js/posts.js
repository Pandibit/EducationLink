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
      <h3 class="text-sm  font-medium text-green-800">Successful response</h3>
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

function showAlert(message, duration=1200) {
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

function showAlertFailed(message, duration=1200) {
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
          
          <svg class="h-5 w-5 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
          </svg>
        </div>
        <div class="ml-3">
          <h3 class="text-sm font-medium text-red-800">Attention needed</h3>
          <p class="text-sm font-medium text-red-800">${message}</p>
          
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

// Getting the data from the create post modal and sending them to the url
document.addEventListener("DOMContentLoaded", function () {
  var enterButton = document.getElementById("enterButton");
  var cancelButton = document.getElementById("cancelButton");
  var modal = document.getElementById("modal-create");
  var subjectInput = document.getElementById("subject");
  var shortDescriptionInput = document.getElementById("short-description");
  var dropzoneFileInput = document.getElementById("dropzone-file");

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
    }).then((response) => {
      if (response.ok) {
        showNotification("Post created successfully");
        setTimeout(function () {
          location.reload();
        }, 100);
        modal.classList.add("hidden"); // Hide the modal
      } else {
        // Check if the response status is 400 (Bad Request) which indicates validation error
        if (response.status === 400) {
          response.json().then(data => {
            if (data.error === "All fields are required.") {
              showAlert(data.error);
            } else if (data.error === "Please upload an image file.") {
              showAlert(data.error);
            } else {
              showAlert("You need till all the required fields.");
            }
          });
        } else {
          showAlert("An error occurred. Please try again later.");
        }
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


document.addEventListener("DOMContentLoaded", function () {
  const deleteButtons = document.querySelectorAll(".delete-post-btn");

  
  deleteButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const postId = this.getAttribute("data-post-id");
      const modal = document.getElementById("delete-post-modal");
      const confirmButton = modal.querySelector("#confirm-delete-btn");
      confirmButton.setAttribute("data-post-id", postId); // Set post ID in confirm button's attribute
      modal.classList.remove("hidden"); // Show modal
    });
  });

  const modal = document.getElementById("delete-post-modal");
  const confirmButton = modal.querySelector("#confirm-delete-btn");

  confirmButton.addEventListener("click", function () {
    const postId = this.getAttribute("data-post-id");

    fetch(`/delete-post/${postId}/`, {
      method: "POST",
      headers: {
        "X-CSRFToken": getCSRFToken(), // Include CSRF token
      },
    })
      .then((response) => {
        if (response.ok) {
          showNotification("Successfully deleted post!");
          location.reload(1000);
          modal.classList.add("hidden");
          console.log("Post deleted successfully");
        } else {
          // Error handling
          console.error("Failed to delete post");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });

    modal.classList.add("hidden"); // Hide modal after deletion
  });
});

function getCSRFToken() {
  // Retrieve CSRF token from the cookie
  const cookieValue = document.cookie.match(/csrftoken=([^ ;]+)/)[1];
  return cookieValue;
}

document.addEventListener("DOMContentLoaded", function () {
  const userMenuButton = document.getElementById("mobile-menu-button");
  const mobileMenu = document.getElementById("mobile-menu");

  userMenuButton.addEventListener("click", function () {
    mobileMenu.classList.toggle("hidden");
  });
});

// Update the post ajax
document.addEventListener('DOMContentLoaded', function () {
  
  const updateButtons = document.querySelectorAll('.edit-post-btn');
  const modal = document.getElementById("post-update-modal");

  updateButtons.forEach(button => {
    button.addEventListener('click', function () {
      const postId = this.getAttribute('data-post-id');
      console.log(postId);
      var updateModal = document.getElementById("post-update-modal");
      
    
      
      document.getElementById('enterButtonupdate').addEventListener('click', function () {
        
        const subject = document.getElementById(`subject_edit`).value;
        const shortDescription = document.getElementById(`short-description_edit`).value;
        const dropzoneFileInput = document.getElementById(`dropzone-file_edit`);
        const dropzoneFile = dropzoneFileInput.files[0]; 
        
        
        const formData = new FormData();
        formData.append('subject', subject);
        formData.append('short_description', shortDescription);
        formData.append('dropzone_file', dropzoneFile);

        fetch(`/update_post/${postId}/`, {
          method: 'POST',
          headers: {
            'X-CSRFToken': getCSRFToken(),
          },
          body: formData, 
        })
        .then(response => {
          if (response.ok) {
            showNotification("Post updated successfully!");
            location.reload(2000);
            updateModal.classList.remove("hidden");
            console.log('Post updated successfully');
            
          } else {
            console.error('Failed to update post');
          }
        })
        .catch(error => {
          console.error('Error:', error);
        });
      });
    });
  });
});

document.getElementById('create-button-1').addEventListener('click', function() {
  document.getElementById('modal-create').classList.remove('hidden');
});


document.addEventListener("DOMContentLoaded", function () {
  const openProfileBtn = document.getElementById("open-profile_posts");
  const profileSign = document.getElementById("profile_sign_posts");

  // Function to toggle profile sign visibility
  function toggleProfileSign(event) {
    event.preventDefault(); // Prevent the default behavior of the button
    if (profileSign.classList.contains("hidden")) {
      profileSign.classList.remove("hidden");
    } else {
      profileSign.classList.add("hidden");
    }
  }

  // Add event listener to open profile button
  openProfileBtn.addEventListener("click", function (event) {
    toggleProfileSign(event);
  });
});