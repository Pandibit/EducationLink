document.addEventListener('DOMContentLoaded', function() {
    const submitButton = document.getElementById('submitBtn');

    if (submitButton) {
        submitButton.addEventListener('click', function(event) {
            event.preventDefault(); // Prevent default form submission behavior

            // Get input field values
            const firstName = document.getElementById('first-name').value;
            const lastName = document.getElementById('last-name').value;
            const email = document.getElementById('email').value;
            const phone = document.getElementById('phone').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;

            // Prepare data to send to backend
            const formData = {
                'first_name': firstName,
                'last_name': lastName,
                'email': email,
                'phone': phone,
                'subject': subject,
                'message': message
            };

            // Send data to backend using fetch API
            fetch('/submit_application/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRFToken': getCookie('csrftoken') // Include CSRF token
                },
                body: JSON.stringify(formData)
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    // Show confirmation message or perform other actions on success
                    alert('Application submitted successfully!');
                   
                    document.getElementById('first-name').value = '';
                    document.getElementById('last-name').value = '';
                    document.getElementById('email').value = '';
                    document.getElementById('phone').value = '';
                    document.getElementById('subject').value = '';
                    document.getElementById('message').value = '';
                } else {
                    alert('Failed to submit application. Please try again.');
                }
            })
            .catch(error => {
                console.error('Error:', error);
                alert('An error occurred while submitting the application.');
            });
        });
    }

    // Function to retrieve CSRF token from cookies
    function getCookie(name) {
        let cookieValue = null;
        if (document.cookie && document.cookie !== '') {
            const cookies = document.cookie.split(';');
            for (let i = 0; i < cookies.length; i++) {
                const cookie = cookies[i].trim();
                if (cookie.startsWith(name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    }
});