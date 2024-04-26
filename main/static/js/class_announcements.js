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
  document
    .getElementById("anButton")
    .addEventListener("click", function (event) {
      event.preventDefault();

      const commentTextarea = document.getElementById("comment");
      const content = commentTextarea.value.trim();
      const classId = this.getAttribute("data-class-id");
      console.log(classId);
      console.log(content);

      if (!content || !classId) {
        alert("Content and class ID are required.");
        return;
      }

      // Prepare form data
      const formData = new FormData();
      formData.append("content", content);
      formData.append("class_id", classId);

      // Send POST request to create announcement
      fetch("/create_announcement/", {
        method: "POST",
        body: formData,
        headers: {
          "X-CSRFToken": getCookie("csrftoken"), // Ensure CSRF token is included
        },
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.success) {
            window.location.reload(100);
            alert("Announcement created successfully!");

            // Optionally update UI or perform other actions upon success
          } else {
            alert("Failed to create announcement. " + data.error);
          }
        })
        .catch((error) => {
          console.error("Error:", error);
          alert("An error occurred while processing your request.");
        });
    });
  // document
  //   .getElementById("anButton")
  //   .addEventListener("click", function (event) {
  //     event.preventDefault();

  //     const commentTextarea = document.getElementById("comment");
  //     const content = commentTextarea.value.trim();
  //     const classId = this.getAttribute("data-class-id");
  //     console.log(classId);

  //     if (!content) {
  //       alert("Please enter your announcement.");
  //       return;
  //     }

  //     // Prepare form data
  //     const formData = new FormData();
  //     formData.append("content", content);
  //     formData.append("class_id", classId);

  //     // Send POST request to create announcement
  //     fetch("/create_announcement/", {
  //       method: "POST",
  //       body: formData,
  //       headers: {
  //         "X-CSRFToken": getCookie("csrftoken"), // Ensure CSRF token is included
  //       },
  //     })
  //       .then((response) => response.json())
  //       .then((data) => {
  //         if (data.success) {
  //           alert("Announcement created successfully!");
  //           // Optionally update UI or perform other actions upon success
  //         } else {
  //           alert("Failed to create announcement. Please try again.");
  //         }
  //       })
  //       .catch((error) => {
  //         console.error("Error:", error);
  //         alert("An error occurred while processing your request.");
  //       });
  //   });

  // Function to retrieve CSRF token from cookies
  function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== "") {
      const cookies = document.cookie.split(";");
      for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i].trim();
        if (cookie.startsWith(name + "=")) {
          cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
          break;
        }
      }
    }
    return cookieValue;
  }
});
