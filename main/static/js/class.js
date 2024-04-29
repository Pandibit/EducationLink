document.addEventListener("DOMContentLoaded", function () {
  var membersButtons = document.querySelectorAll(".dashboard-button");

  membersButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      var classPk = button.getAttribute("data-class-pk");
      console.log("Class PK:", classPk);

      // Construct the URL for the members page using the class PK
      var membersUrl = "/class/" + classPk;
      console.log("Members URL:", membersUrl);

      // Navigate to the members page URL
      window.location.href = membersUrl;
    });
  });
});

document.addEventListener("DOMContentLoaded", function () {
  var membersButtons = document.querySelectorAll(".members-button");

  membersButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      var classPk = button.getAttribute("data-class-pk");
      console.log("Class PK:", classPk);

      // Construct the URL for the members page using the class PK
      var membersUrl = "/class/" + classPk + "/members/";
      console.log("Members URL:", membersUrl);

      // Navigate to the members page URL
      window.location.href = membersUrl;
    });
  });
});

document.addEventListener("DOMContentLoaded", function () {
  var membersButtons = document.querySelectorAll(".class-code-button");

  membersButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      var classPk = button.getAttribute("data-class-pk");
      console.log("Class PK:", classPk);

      // Construct the URL for the members page using the class PK
      var membersUrl = "/class/" + classPk + "/code/";
      console.log("Members URL:", membersUrl);

      // Navigate to the members page URL
      window.location.href = membersUrl;
    });
  });
});

document.addEventListener("DOMContentLoaded", function () {
  var membersButtons = document.querySelectorAll(".class-announcements");

  membersButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      var classPk = button.getAttribute("data-class-pk");
      console.log("Class PK:", classPk);

      // Construct the URL for the members page using the class PK
      var membersUrl = "/class/" + classPk + "/announcements/";
      console.log("Members URL:", membersUrl);

      // Navigate to the members page URL
      window.location.href = membersUrl;
    });
  });
});

document.addEventListener("DOMContentLoaded", function () {
  var membersButtons = document.querySelectorAll(".class-calendar");

  membersButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      var classPk = button.getAttribute("data-class-pk");
      console.log("Class PK:", classPk);

      // Construct the URL for the members page using the class PK
      var membersUrl = "/class/" + classPk + "/calendar/";
      console.log("Members URL:", membersUrl);

      // Navigate to the members page URL
      window.location.href = membersUrl;
    });
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const sendButton = document.getElementById("sendLection");
  sendButton.addEventListener("click", function (event) {
    event.preventDefault();

    const classId = sendButton.getAttribute("data-class-id");
    const lessonText = document.getElementById("lesson_text").value;
    const imageInput = document.getElementById("imageInput").files[0];
    const fileInput = document.getElementById("fileInput").files[0];

    const formData = new FormData();
    formData.append("class_id", classId);
    formData.append("lesson_text", lessonText);

    // Only append the image and file if they exist
    if (imageInput) formData.append("image", imageInput);
    if (fileInput) formData.append("file", fileInput);

    fetch("/submit-lection/", {
      method: "POST",
      body: formData,
      credentials: "same-origin", // Ensure credentials are included for CSRF token to be validated
      headers: {
        "X-CSRFToken": getCookie("csrftoken"), // Add CSRF token from cookies
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          alert("Lection submitted successfully");
        } else {
          throw new Error(data.error || "Failed to submit lection");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        alert("Error submitting lection: " + error.message);
      });
  });

  // Function to get the CSRF token from a cookie
  function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== "") {
      const cookies = document.cookie.split(";");
      for (let i = 0; i < cookies.length; i++) {
        let cookie = cookies[i].trim();
        // Does this cookie string begin with the name we want?
        if (cookie.startsWith(name + "=")) {
          cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
          break;
        }
      }
    }
    return cookieValue;
  }
});


document.addEventListener('DOMContentLoaded', function() {
  const deleteButtons = document.querySelectorAll('.deleteLection');

  // Loop through each button and attach the event listener
  deleteButtons.forEach(function(deleteButton) {
      deleteButton.addEventListener('click', function() {
          const lectionId = this.getAttribute('data-class-id');
          console.log('Lection ID:', lectionId);
          if (confirm('Are you sure you want to delete this lection?')) {
              fetch(`/delete-lection/${lectionId}/`, { // Update URL as necessary
                  method: 'DELETE',
                  headers: {
                      'X-CSRFToken': getCookie('csrftoken'),
                      'Content-Type': 'application/json',
                  }
              })
              .then(response => {
                  if (response.ok) {
                      alert('Lection deleted successfully.');
                      window.location.reload(); // Optionally reload the page or redirect
                  } else {
                      alert('Failed to delete the lection.');
                  }
              })
              .catch(error => console.error('Error:', error));
          }
      });
  });

  function getCookie(name) {
      let cookieValue = null;
      if (document.cookie && document.cookie !== "") {
          const cookies = document.cookie.split(';');
          for (let i = 0; i < cookies.length; i++) {
              let cookie = cookies[i].trim();
              if (cookie.startsWith(name + '=')) {
                  cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                  break;
              }
          }
      }
      return cookieValue;
  }
});
