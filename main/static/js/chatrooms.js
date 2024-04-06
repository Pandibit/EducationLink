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

document.addEventListener("DOMContentLoaded", function () {
    const createRoomButton = document.getElementById("createRoomButton");
    const createRoomModal = document.getElementById("createRoomModal");
    const closeButton = document.querySelector(".close");
    const enterButton = document.getElementById("enterButton");
  
    // Function to open the modal
    function openModal() {
      createRoomModal.classList.remove("hidden");
    }
  
    // Function to close the modal
    function closeModal() {
      createRoomModal.classList.add("hidden");
    }
  
    // Event listener to open modal when create room button is clicked
    createRoomButton.addEventListener("click", openModal);
  
    // Event listener to close modal when close button is clicked
    closeButton.addEventListener("click", closeModal);
  
    // Event listener to close modal when clicking outside of it
    window.addEventListener("click", function (event) {
      if (event.target === createRoomModal) {
        closeModal();
      }
    });
  
    // Event listener for form submission
    enterButton.addEventListener("click", function () {
      // Get form data
      const roomName = document.getElementById("roomName").value;
      const subject = document.getElementById("subject").value;
      const fileInput = document.getElementById("file_input").files[0];
  
      // Validate form data
      if (!roomName || !subject || !fileInput) {
        showAlert("Please fill in all required fields.");
        return;
        
      }
  
      // Prepare form data for AJAX submission
      const formData = new FormData();
      formData.append("name", roomName);
      formData.append("subject", subject);
      formData.append("room_photo", fileInput);
  
      // Send AJAX request to create the room
      fetch("create_room/", {
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
            // Room created successfully
            showNotification("Room created successfully!");
            setTimeout(function () {
                location.reload();
              }, 700);
            createRoomModal.classList.add("hidden");
          } else {
            // Error occurred while creating room
            throw new Error("");
          }
        })
        .catch((error) => {
          // Show error message
          showAlert("You need to select an image file");
        });
    });
  });


  document.addEventListener("DOMContentLoaded", function() {
    const deleteButtons = document.querySelectorAll('.delete-room');
    const deleteModal = document.getElementById('deleteRoomModal');
    const cancelButton = document.querySelector('.cancel-delete-room');
    const confirmButton = document.querySelector('.confirm-delete-room');

    deleteButtons.forEach(button => {
      button.addEventListener('click', () => {
        deleteModal.classList.remove('hidden');
      });
    });

    cancelButton.addEventListener('click', () => {
      deleteModal.classList.add('hidden');
    });
  });

  

  function getCSRFToken() {
    // Retrieve CSRF token from the cookie
    const cookieValue = document.cookie.match(/csrftoken=([^ ;]+)/)[1];
    return cookieValue;
  }
  document.addEventListener("DOMContentLoaded", function () {
    // Get a reference to the delete class modal
    const deleteRoomModal = document.getElementById("deleteRoomModal");
  
    // Function to display the delete class modal
    function displayDeleteRoomModal() {
      deleteRoomModal.classList.remove("hidden");
    }
  
    // Add event listeners to trigger display of the delete class modal
    const deleteButtons = document.querySelectorAll(".delete-room-btn");
  
    deleteButtons.forEach((button) => {
      button.addEventListener("click", function () {
        displayDeleteRoomModal();
        const roomId = this.getAttribute("data-room-id");
        console.log(roomId);
  
        const confirmDeleteButton = document.getElementById("confirm-delete-btn");
        confirmDeleteButton.addEventListener("click", function () {
          
          fetch(`/delete-room/${roomId}/`, {
            method: "DELETE",
            headers: {
              "X-CSRFToken": getCSRFToken(),
              "Content-Type": "application/json",
            },
          })
            .then((response) => {
              if (response.ok) {
                showNotification("Successfully deleted class!");
                setTimeout(function () {
                  location.reload();
                }, 200); // Reload the page after successful submission
                deleteClassModal.classList.add("hidden"); // Hide the modal
              } else {
                showAlertFailed("The response was not ok!");
                 // Reload the page after successful submission
                modal.classList.add("hidden");
              }
            })
            .catch((error) => {
              console.error("Error:", error);
            });
        });
      });
    });
  
    // Add event listener to close the modal when cancel button is clicked
    const cancelButton = document.getElementById("cancel");
    cancelButton.addEventListener("click", function () {
      deleteRoomModal.classList.add("hidden");
    });

  });


// Jump in to the room 
  document.addEventListener("DOMContentLoaded", function () {
    var chatRoomButtons = document.querySelectorAll(".chat-room-btn");
  
    chatRoomButtons.forEach(function (button) {
      button.addEventListener("click", function () {
        var roomPk = button.getAttribute("data-room-id");
        console.log(roomPk);
        var roomUrl = "/room/" + roomPk ;
        window.location.href = roomUrl;
      });
    });
  });

 

function getCSRFToken() {
  // Retrieve CSRF token from the cookie
  const cookieValue = document.cookie.match(/csrftoken=([^ ;]+)/)[1];
  return cookieValue;
}


// Displaying the second menu when u are in the mobile  
document.addEventListener("DOMContentLoaded", function () {
  // Get references to the mobile menu and the open menu button
  const mobileMenu = document.getElementById("second-mobile-menu");
  const openMenuButton = document.getElementById("open-second-mobile-menu");
 

  
  openMenuButton.addEventListener("click", function () {

    openMenuButton.addEventListener("click", function () {
      mobileMenu.classList.toggle("hidden");
  });
    
  });

 
});