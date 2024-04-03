document.addEventListener("DOMContentLoaded", function () {
  const membersLink = document.querySelector(".members-link");
  const homeLink = document.querySelector(".home-link");
  const classcodeLink = document.querySelector(".class-code-link");
  const membersContent = document.getElementById("membersContent");
  const homeContent = document.getElementById("homeContent");
  const classcodeContent = document.getElementById("classcodeContent");

  // Add click event listener to members link
  membersLink.addEventListener("click", function (event) {
    // Prevent default behavior of link click
    event.preventDefault();

    // Show members content and hide home content
    membersContent.classList.remove("hidden");
    homeContent.classList.add("hidden");
    classcodeContent.classList.add("hidden");
  });

  // Add click event listener to home link
  homeLink.addEventListener("click", function (event) {
    // Prevent default behavior of link click
    event.preventDefault();

    // Show home content and hide members content
    membersContent.classList.add("hidden");
    classcodeContent.classList.add("hidden");
    homeContent.classList.remove("hidden");
  });

  classcodeLink.addEventListener("click", function (event) {
    // Prevent default behavior of link click
    event.preventDefault();

    // Show home content and hide members content
    membersContent.classList.add("hidden");
    homeContent.classList.add("hidden");

    classcodeContent.classList.remove("hidden");
  });
});
