
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



  document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('copy-button').addEventListener('click', function() {
        var classCodeInput = document.getElementById('class-code');

        
        var code = classCodeInput.value;

        
        try {
            // Copy the value to the clipboard
            navigator.clipboard.writeText(code)
                .then(function() {
                    console.log('Copying text was successful');
                    console.log(code);
                    
                    var copyButton = document.getElementById('copy-button');
                    copyButton.textContent = 'Copied!';
                    setTimeout(function() {
                        copyButton.textContent = 'Copy';
                    }, 1000); 
                })
                .catch(function(err) {
                    console.error('Unable to copy text: ', err);
                });
        } catch (err) {
            console.error('Unable to copy text: ', err);
        }
    });
});