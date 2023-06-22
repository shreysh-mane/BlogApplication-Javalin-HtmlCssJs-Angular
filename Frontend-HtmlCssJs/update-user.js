document.addEventListener('DOMContentLoaded', () => {
    const updateProfileForm = document.getElementById('update-profile-form');
    updateProfileForm.addEventListener('submit', handleUpdateProfile);
  
    function handleUpdateProfile(event) {
      event.preventDefault();
  
      const name = document.getElementById('name').value;
      const number = document.getElementById('number').value;
      const password = document.getElementById('password').value;
  
      const email = JSON.parse(localStorage.getItem('userData')).email;
  
      const profileData = {
        name: name,
        number: number,
        password: password,
        email: email,
        id:JSON.parse(localStorage.getItem('userData')).id
      };
  
        const userId = JSON.parse(localStorage.getItem('userData')).id;
        fetch(`http://localhost:9002/blog-posts/${userId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(userCredentials)
    })
    .then(response => response.json())
    .then(data => {
        
        if (data!=null) {
            localStorage.setItem('userData', JSON.stringify(data));
            window.location.href = 'dashboard.html';
        }else {
            errorMessage.textContent = 'Invalid credentials. Please try again.';
        }
    })
    .catch(error => {
        console.error('Error:', error);
        errorMessage.textContent = 'An error occurred. Please try again.';
    });
    }
  
    function displayErrorMessage(message) {
      const errorMessage = document.getElementById('error-message');
      errorMessage.textContent = message;
      errorMessage.style.display = 'block';
    }
  
    function displaySuccessMessage(message) {
      const successMessage = document.getElementById('success-message');
      successMessage.textContent = message;
      successMessage.style.display = 'block';
    }
  });
  