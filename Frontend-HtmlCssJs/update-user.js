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
        fetch(`http://localhost:9001/users/${userId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(profileData)
    })
    .then(data => {
        
       
            localStorage.setItem('userData', JSON.stringify(profileData));
            window.location.href = 'dashboard.html';
      
    })
    .catch(error => {
        console.error('Error:', error);
        errorMessage.textContent = 'An error occurred. Please try again.';
    });
    }
  
  });
  