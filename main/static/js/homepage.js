
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
      <h3 class="text-sm  font-medium text-green-800">Successful response</h3>
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

