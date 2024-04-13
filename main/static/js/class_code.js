
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



  const copyToClipboard = (text) => {
    const input = document.createElement('textarea');
    input.value = text;
    document.body.appendChild(input);
    input.select();
    document.execCommand('copy');
    document.body.removeChild(input);
};

const copyButton = document.querySelector('[data-copy-target="#class-code"]');
const successIcon = document.getElementById('success-icon');
const successTooltipMessage = document.getElementById('success-tooltip-message');

copyButton.addEventListener('click', () => {
    const codeElement = document.getElementById('class-code');
    const classCode = codeElement.textContent || codeElement.innerText;

    copyToClipboard(classCode);

    // Show success icon and tooltip message
    successIcon.classList.remove('hidden');
    successTooltipMessage.classList.remove('hidden');

    // Hide success message after 2 seconds
    setTimeout(() => {
        successIcon.classList.add('hidden');
        successTooltipMessage.classList.add('hidden');
    }, 2000);
});