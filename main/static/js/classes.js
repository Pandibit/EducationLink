

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
    // Select relevant elements
    const modal = document.getElementById("modal-create");
    const enterButton = document.getElementById("enterButton");
    const cancelButton = document.getElementById("cancelButton");
  
    // Event listener for the Enter button
    enterButton.addEventListener("click", function () {
      // Collect input values
      const className = document.getElementById("className").value;
      const section = document.getElementById("section").value;
      const subject = document.getElementById("subject").value;
      const room = document.getElementById("room").value;
      const fileInput = document.getElementById("file_input").files[0];
  
      // Create FormData object to send data via AJAX
      const formData = new FormData();
      formData.append("name", className);
      formData.append("section", section);
      formData.append("subject", subject);
      formData.append("room", room);
      formData.append("class_photo", fileInput);
  
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
            showNotification("Successfully created!")
            setTimeout(function() {
              location.reload();
          }, 200); // Reload the page after successful submission
            modal.classList.add("hidden"); // Hide the modal
          } else {
            throw new Error("Error occurred while saving class");
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






//   document.addEventListener("DOMContentLoaded", function() {
//     // Find all elements with the class jump-in-button
//     var jumpInButtons = document.querySelectorAll('.jump-in-button');

//     // Add click event listener to each jump-in button
//     jumpInButtons.forEach(function(button) {
//         button.addEventListener('click', function() {
//             // Retrieve the data-class-pk attribute value (primary key of the class)
//             var classPk = button.getAttribute('data-class-pk');
            
//             // Construct the URL for the specific class detail page
//             var classDetailUrl = '/classes/' + classPk + '/'; // Adjust the URL as per your project's URL configuration

//             // Redirect to the class detail page
//             window.location.href = classDetailUrl;
//         });
//     });
// });


document.addEventListener("DOMContentLoaded", function() {
  // Find the Jump in buttons
  var jumpInButtons = document.querySelectorAll('.jump-in-button');

  // Add click event listener to each button
  jumpInButtons.forEach(function(button) {
    button.addEventListener('click', function() {
      // Retrieve the value of the data-class-pk attribute
      var classPk = button.getAttribute('data-class-pk');
      console.log(classPk);

      // Construct the URL for the specific class using the class PK
      var classUrl = '/class/' + classPk; // Replace '/class/' with your actual URL pattern

      // Navigate to the URL
      window.location.href = classUrl;
    });
  });
});