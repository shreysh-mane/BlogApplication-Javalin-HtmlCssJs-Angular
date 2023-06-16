const loginForm = document.getElementById('loginForm');


loginForm.addEventListener('submit', function(event) {
    event.preventDefault(); 
    
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    const userCredentials = {
        email: email,
        password: password
    };

    fetch('http://localhost:9001/login', {
        method: 'POST',
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

});


