document.addEventListener("DOMContentLoaded", function () {
  // Get the button and modal elements
  const avatarButton = document.getElementById("avatar");
  const avatarModal = document.getElementById("avatarModal");
  const closeModalButton = document.getElementById("cancelModal");

  // Add click event listener to the button
  avatarButton.addEventListener("click", function () {
    avatarModal.classList.remove("hidden"); // Show the modal
  });

  // Add click event listener to the close button
  closeModalButton.addEventListener("click", function () {
    avatarModal.classList.add("hidden"); // Hide the modal
  });
});


document.addEventListener("DOMContentLoaded", function () {
    // Find the Enter button and avatar input field
    var enterButton = document.getElementById("enterButton");
    var avatarInput = document.getElementById("avatarInput");
  
    // Add click event listener to the button
    enterButton.addEventListener("click", function () {
      // Get the selected file from the input field
      var selectedFile = avatarInput.files[0];
  
      // Check if a file is selected
      if (selectedFile) {
        // Check if the selected file type is an image
        if (selectedFile.type.startsWith("image/")) {
          // Create a FileReader object to read the selected file
          var reader = new FileReader();
  
          // Define a function to handle the file reading process
          reader.onload = function (event) {
            // Update the src attribute of the avatar image with the data URL of the selected file
            var avatarImage = document.getElementById("avatarImage");
            avatarImage.src = event.target.result;
  
            // Hide the modal after updating the avatar image
            
            alert("Successfully changed the avatar image")
            hideModal();
            
          };
  
          // Read the selected file as a data URL
          reader.readAsDataURL(selectedFile);
        } else {
          // If the selected file is not an image, display an error message
          alert("Please select an image file.");
        }
      }
    });
  
    // Function to hide the modal
    function hideModal() {
      // Find the modal element and hide it
      var modal = document.getElementById("avatarModal");
      modal.classList.add("hidden");
    }


//     function showNotification(message) {
//         // Create notification panel
//         const notificationPanel = document.createElement('div');
//         notificationPanel.classList.add('fixed', 'inset-0', 'flex', 'items-end', 'px-4', 'py-6', 'pointer-events-none', 'sm:p-6', 'sm:items-start');
//         notificationPanel.setAttribute('aria-live', 'assertive');
      
//         // Inner content
//         notificationPanel.innerHTML = `
//         <div class="w-full flex flex-col z-10 items-center space-y-4 sm:items-end">
//           <div class="max-w-sm w-full bg-white shadow-lg rounded-lg pointer-events-auto ring-1 ring-black ring-opacity-5 overflow-hidden">
//             <div class="p-4">
//               <div class="flex items-start">
//                 <div class="flex-shrink-0">
//                   <svg class="h-5 w-5 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
//                       <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
//                   </svg>
//                 </div>
//                 <div class="ml-3 w-0 flex-1 pt-0.5">
//                   <p class="text-sm font-medium text-gray-900">${message}</p>
//                 </div>
//                 <div class="ml-4 flex-shrink-0 flex">
//                   <button class="bg-white rounded-md inline-flex text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
//                     <span class="sr-only">Close</span>
//                     <!-- Close icon -->
//                     <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
//                       <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
//                     </svg>
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       `;
      
//         // Append notification panel to the body
//         document.body.appendChild(notificationPanel);
//       }
    
   });



  

  

document.addEventListener("DOMContentLoaded", function () {
  // Find the avatar input field
  var avatarInput = document.getElementById("avatarInput");

  // Add change event listener to the input field
  avatarInput.addEventListener("change", function (event) {
    // Get the uploaded image file
    var imageFile = event.target.files[0];

    // Create a FormData object and append the image file
    var formData = new FormData();
    formData.append("image", imageFile);

    // Send an AJAX request to submit the form data
    fetch("/save_avatar", {
      method: "POST",
      body: formData,
      headers: {
        "X-CSRFToken": getCookie("csrftoken"), // Include CSRF token in the request headers
      },
    })
      .then((response) => {
        // Handle the response
        if (response.ok) {
          console.log("Avatar image saved successfully");
          
          
          // Optionally, update the UI to indicate success
        } else {
          console.error("Failed to save avatar image");
          // Optionally, display an error message to the user
        }
      })
      .catch((error) => {
        console.error("Error saving avatar image:", error);
        // Optionally, display an error message to the user
      });
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

