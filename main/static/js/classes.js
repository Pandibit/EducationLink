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

function showAlertFailed(message, duration = 1200) {
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

//Function for creating the class
document.addEventListener("DOMContentLoaded", function () {
  // Select relevant elements
  const modal = document.getElementById("modal-create");
  const enterButton = document.getElementById("enterButton");
  const cancelButton = document.getElementById("cancelButton");
  const fileInput = document.getElementById("file_input");
  // Event listener for the Enter button
  enterButton.addEventListener("click", function () {
    if (fileInput.files.length === 0) {
      alert("Please select a file.");
      return; // Stop further execution
    }

    // Get the selected file
    const selectedFile = fileInput.files[0];

    // Check if the selected file is an image
    if (!selectedFile.type.startsWith("image/")) {
      alert("Please select an image file.");
      return; // Stop further execution
    }
    // Collect input values
    const className = document.getElementById("className").value;
    const section = document.getElementById("section").value;
    const subject = document.getElementById("subject").value;
    const room = document.getElementById("room").value;

    // Create FormData object to send data via AJAX
    const formData = new FormData();
    formData.append("name", className);
    formData.append("section", section);
    formData.append("subject", subject);
    formData.append("room", room);
    formData.append("class_photo", selectedFile); // Pass selected file directly

    // Send AJAX request to Django view
    fetch("save_class", {
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
          showNotification("Successfully created!");
          setTimeout(function () {
            location.reload();
          }, 700); // Reload the page after successful submission
          modal.classList.add("hidden"); // Hide the modal
        } else {
          showAlert("Please fill the other fields too");
        }
      })
      .catch((error) => {
        showAlert(error);
      });
  });
  cancelButton.addEventListener("click", function () {
    modal.classList.add("hidden");
  });
});

//When clicking the jump in button redirected to the specific class
document.addEventListener("DOMContentLoaded", function () { 
  var jumpInButtons = document.querySelectorAll(".jump-in-button");

  jumpInButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      var classPk = button.getAttribute("data-class-pk");
      console.log(classPk);
      var classUrl = "/class/" + classPk;
      window.location.href = classUrl;
    });
  });
});

//Function for getting the csrf token
function getCSRFToken() {
  // Retrieve CSRF token from the cookie
  const cookieValue = document.cookie.match(/csrftoken=([^ ;]+)/)[1];
  return cookieValue;
}

//Deleting the class function
document.addEventListener("DOMContentLoaded", function () {
  // Get a reference to the delete class modal
  const deleteClassModal = document.getElementById("delete-class-modal");

  // Function to display the delete class modal
  function displayDeleteClassModal() {
    deleteClassModal.classList.remove("hidden");
  }

  // Add event listeners to trigger display of the delete class modal
  const deleteButtons = document.querySelectorAll(".delete-class-btn");

  deleteButtons.forEach((button) => {
    button.addEventListener("click", function () {
      displayDeleteClassModal();
      const classId = this.getAttribute("data-class-id");
      console.log(classId);

      const confirmDeleteButton = document.getElementById("confirm-delete-btn");
      confirmDeleteButton.addEventListener("click", function () {
        // Send AJAX request to delete the class
        fetch(`/delete_class/${classId}/`, {
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
              showNotification("You are not allowed to delete this class!");
              setTimeout(function () {
                location.reload();
              }, 200); // Reload the page after successful submission
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
    deleteClassModal.classList.add("hidden");
  });

  // Add event listener to close the modal when clicking outside of it
  window.addEventListener("click", function (event) {
    if (event.target === deleteClassModal) {
      deleteClassModal.classList.add("hidden");
    }
  });
});

// JavaScript to handle showing the modal when button is clicked

document.addEventListener("DOMContentLoaded", function () {
  // Select the modal and overlay
  const modal = document.getElementById("modal-create");
  const overlay = document.querySelector(".bg-gray-500");
  const createButton = document.getElementById("create-button-1");

  // Function to show modal
  function showModal() {
    modal.classList.remove("hidden");
    overlay.classList.remove("hidden");
  }

  // Function to hide modal
  function hideModal() {
    modal.classList.add("hidden");
    overlay.classList.add("hidden");
  }

  // Add event listener to the create button to show modal
  createButton.addEventListener("click", function (event) {
    event.preventDefault();
    showModal();
  });

  // Add event listener to the overlay to hide modal when clicked outside
  overlay.addEventListener("click", function (event) {
    if (event.target === overlay) {
      hideModal();
    }
  });

  // Select the cancel button
  const cancelButton = document.getElementById("cancelButton");

  // Add event listener to the cancel button
  cancelButton.addEventListener("click", function () {
    // Hide the modal and overlay
    hideModal();
  });

  // Add event listener to the Escape key to hide modal
  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape" && !modal.classList.contains("hidden")) {
      hideModal();
    }
  });
});


// Toogle the user_profile
document.addEventListener("DOMContentLoaded", function () {
  const profileButtonClasses = document.getElementById("user_profile_classes");
  const profileSignClasses = document.getElementById("profile_sign_classes");

  // Add event listener to the profile button
  profileButtonClasses.addEventListener("click", function () {
    profileSignClasses.classList.toggle("hidden");
  });
});

function checkClassCode(classCode) {
  return fetch("/api/check_class_code/?code=" + encodeURIComponent(classCode), {
    method: "GET",
    headers: {
      "X-Requested-With": "XMLHttpRequest",
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      return data.exists; // Return true if class code exists, false otherwise
    })
    .catch((error) => {
      console.error("There was an error with the request:", error);
      return false;
    });
}

document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("joinButton").addEventListener("click", function () {
    var classCode = document.getElementById("classCode").value;
    checkClassCode(classCode).then((exists) => {
      if (exists) {
      } else {
        showAlertFailed("Please enter a valid class code.");
      }
    });
  });
});

function joinClass(classCode) {
  return fetch("/api/join_class/?code=" + encodeURIComponent(classCode), {
    method: "GET",
    headers: {
      "X-Requested-With": "XMLHttpRequest",
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      return data.status; // Return status: success or check_code
    })
    .catch((error) => {
      console.error("There was an error with the request:", error);
      return "error";
    });
}

document.addEventListener("DOMContentLoaded", function () {
  const modal = document.getElementById("modal-join");

  document.getElementById("joinButton").addEventListener("click", function () {
    var classCode = document.getElementById("classCode").value;
    joinClass(classCode).then((status) => {
      if (status === "success") {
        showNotification("You have joined the class successfully");
        setTimeout(function () {
          location.reload();
        }, 200); // Reload the page after successful submission
        modal.classList.add("hidden");
      } else if (status === "check_code") {
        showAlert("You are already the class creator");
        setTimeout(function () {}, 200);
      } else if (status === "already_member") {
        showAlert("You are already a member of this class");
      } else {
      }
    });
  });
});

// Unenrolling from the existing class
document.addEventListener("DOMContentLoaded", function () {
  const unenrollClassModal = document.getElementById("unenroll-class-modal");

  function displayUnenrollClassModal() {
    unenrollClassModal.classList.remove("hidden");
  }

  const unenrollButtons = document.querySelectorAll(".unenroll-class-btn");

  unenrollButtons.forEach((button) => {
    button.addEventListener("click", function () {
      displayUnenrollClassModal();
      const classId = this.getAttribute("data-class-id");
      console.log(classId);

      const confirmUnenrollButton = document.getElementById(
        "confirm-unenroll-btn"
      );

      confirmUnenrollButton.addEventListener("click", function () {
        fetch(`/unenroll_class/${classId}/`, {
          method: "POST",
          headers: {
            "X-CSRFToken": getCSRFToken(),
            "Content-Type": "application/json",
          },
        })
          .then((response) => {
            if (response.ok) {
              showNotification(
                "Successfully unenrolled from the existing class!"
              );
              setTimeout(function () {
                location.reload();
              }, 1000); // Reload the page after successful submission
              unenrollClassModal.classList.add("hidden"); // Hide the modal
            } else {
              showAlertFailed(
                "You are not allowed to unenroll from this class!"
              );
              setTimeout(function () {
                location.reload();
              }, 500); // Reload the page after successful submission
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
  const cancelButton = document.getElementById("cancelbutton");
  cancelButton.addEventListener("click", function () {
    unenrollClassModal.classList.add("hidden");
  });

  // Add event listener to close the modal when clicking outside of it
  window.addEventListener("click", function (event) {
    if (event.target === unenrollClassModal) {
      unenrollClassModal.classList.add("hidden");
    }
  });
});



function updateFileLabelClasses(event) {
  const fileInputClasses = event.target;
  const fileNameClasses = fileInputClasses.files[0].name; // Get the name of the selected file

  const fileLabelClasses = document.getElementById('file_label');
  if (fileLabelClasses) {
      fileLabelClasses.textContent = fileNameClasses; // Update the label text with the file name
  }
}



document.addEventListener("DOMContentLoaded", function () {
  const userMenuBtn = document.getElementById("user-menu-button");
  const userMenu = document.getElementById("user-menu");

  
  userMenuBtn.addEventListener("click", function (event) {
      
      toggleMenu();
      event.stopPropagation();
  });

  
  document.body.addEventListener("click", function (event) {
      const target = event.target;

      
      if (!target.closest("#user-menu-button") && !target.closest("#user-menu")) {
         
          hideMenu();
      }
  });

 
  const allButtons = document.querySelectorAll("button");
  allButtons.forEach(button => {
      if (button !== userMenuBtn) {
          button.addEventListener("click", function () {
              
              hideMenu();
          });
      }
  });

 
  function toggleMenu() {
      if (userMenu.classList.contains("hidden")) {
          
          userMenu.classList.remove("hidden");
          userMenu.classList.add("block");
      } else {
          
          hideMenu();
      }
  }

  
  function hideMenu() {
      userMenu.classList.add("hidden");
      userMenu.classList.remove("block");
  }
});


document.addEventListener("DOMContentLoaded", function () {
  
  const classMenuBtn = document.getElementById("class-menu-btn");
  const classMenu = document.getElementById("class-menu");

  
  classMenuBtn.addEventListener("click", function (event) {
      
      toggleMenu();
      event.stopPropagation();
  });

  
  document.body.addEventListener("click", function (event) {
      const target = event.target;

      
      if (!target.closest("#class-menu-btn") && !target.closest("#class-menu")) {
         
          hideMenu();
      }
  });

 
  const allButtons = document.querySelectorAll("button");
  allButtons.forEach(button => {
      if (button !== classMenuBtn) {
          button.addEventListener("click", function () {
              
              hideMenu();
          });
      }
  });

 
  function toggleMenu() {
      if (classMenu.classList.contains("hidden")) {
          
          classMenu.classList.remove("hidden");
        classMenu.classList.add("block");
      } else {
          
          hideMenu();
      }
  }

  
  function hideMenu() {
      classMenu.classList.add("hidden");
      classMenu.classList.remove("block");
  }
});

document.addEventListener("DOMContentLoaded", function () {
  // Select the create class link
  const joinClassLink = document.getElementById("join-button");

  // Select the modal and overlay
  const joinmodal = document.getElementById("modal-join");
  const overlay = document.querySelector(".bg-gray-500");

  // Function to hide modal and overlay
  function hidejoinModal() {
    joinmodal.classList.add("hidden");
    overlay.classList.add("hidden");
  }

  // Add event listener to the create class link
  joinClassLink.addEventListener("click", function (event) {
    event.preventDefault();
    // Display the modal and overlay
    joinmodal.classList.remove("hidden");
    overlay.classList.remove("hidden");
  });

  // Add event listener to the overlay to hide modal when clicked outside
  overlay.addEventListener("click", function (event) {
    if (event.target === overlay) {
      hidejoinModal();
    }
  });

  // Select the cancel button
  const cancelButton = document.getElementById("cancelButton-join");

  // Add event listener to the cancel button
  cancelButton.addEventListener("click", function () {
    // Hide the modal and overlay
    hidejoinModal();
  });

  // Add event listener to the Escape key to hide modal
  document.addEventListener("keydown", function (event) {
    if (
      event.key === "Escape" &&
      !joinmodal.classList.contains("hidden")
    ) {
      hidejoinModal();
    }
  });
});



document.addEventListener('DOMContentLoaded', () => {
  // Select all dropdown buttons within list items
  const dropdownButtons = document.querySelectorAll('[data-dropdown-toggle="dropdown"]');

  // Function to show a specific dropdown menu
  function showDropdown(dropdownMenu) {
      dropdownMenu.classList.remove('hidden');
  }

  // Function to hide a specific dropdown menu
  function hideDropdown(dropdownMenu) {
      dropdownMenu.classList.add('hidden');
  }

  // Toggle dropdown menu visibility when dropdown button is clicked
  dropdownButtons.forEach((button) => {
      const dropdownMenu = button.nextElementSibling; // Assuming the dropdown menu follows the button in the DOM

      button.addEventListener('click', (event) => {
          event.stopPropagation(); // Prevent document click event from immediately hiding the dropdown

          const isVisible = !dropdownMenu.classList.contains('hidden');
          
          // Hide all dropdown menus before showing the clicked one
          dropdownButtons.forEach((btn) => {
              const menu = btn.nextElementSibling;
              if (menu !== dropdownMenu) {
                  hideDropdown(menu);
              }
          });

          // Toggle visibility of the clicked dropdown menu
          if (isVisible) {
              hideDropdown(dropdownMenu);
          } else {
              showDropdown(dropdownMenu);
          }
      });
  });

  // Add click event listener to the document to handle outside clicks
  document.addEventListener('click', (event) => {
      const isClickedOnDropdown = event.target.matches('[data-dropdown-toggle="dropdown"]');
      const isClickedInsideDropdown = event.target.closest('.dropdown');

      // If clicked outside any dropdown or its associated button, hide all dropdown menus
      if (!isClickedOnDropdown && !isClickedInsideDropdown) {
          dropdownButtons.forEach((button) => {
              const dropdownMenu = button.nextElementSibling;
              hideDropdown(dropdownMenu);
          });
      }
  });

  // Add click event listeners to all dropdown links to hide dropdowns when clicked
  const dropdownLinks = document.querySelectorAll('.dropdown a');
  dropdownLinks.forEach((link) => {
      link.addEventListener('click', () => {
          dropdownButtons.forEach((button) => {
              const dropdownMenu = button.nextElementSibling;
              hideDropdown(dropdownMenu);
          });
      });
  });
});




document.addEventListener('DOMContentLoaded', () => {
  const joinButton = document.getElementById('join-button');
  const createButton = document.getElementById('create-button');
  const classMenu = document.getElementById('class-menu');

  // Function to hide the class menu
  function hideClassMenu() {
      classMenu.classList.add('hidden');
  }

  // Add click event listener to the Join button
  if (joinButton) {
      joinButton.addEventListener('click', () => {
          hideClassMenu();
      });
  }

  // Add click event listener to the Create button
  if (createButton) {
      createButton.addEventListener('click', () => {
          hideClassMenu();
      });
  }

  });




