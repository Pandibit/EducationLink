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
          alert("Post saved successfully!");
          location.reload()

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
document.querySelectorAll('.delete-post-btn').forEach(button => {
    button.addEventListener('click', function() {
        // Get the post ID from the data attribute
        const postId = this.getAttribute('data-post-id');
        
        // Send a DELETE request to the server to delete the post
        fetch(`/delete_post`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': getCookie('csrftoken'), // Include CSRF token
            },
            body: JSON.stringify({post_id: postId}), // Send post ID in JSON format
        })
        .then(response => {
            if (response.ok) {
                // Post was deleted successfully
                alert('Post deleted successfully!');
                // Remove the deleted post from the DOM
                this.closest('.col-span-1').remove();
            } else {
                // Error occurred while deleting the post
                throw new Error('Error deleting post');
            }
        })
        .catch(error => {
            // Handle errors
            console.error('Error:', error);
            alert('An error occurred while deleting the post. Please try again later.');
        });
    });
});
