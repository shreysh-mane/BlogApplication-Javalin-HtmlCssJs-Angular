
const registerForm = document.getElementById('registerForm');
registerForm.addEventListener('submit', function(event) {
    event.preventDefault(); 

  
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const number= document.getElementById('number').value;


    const userData = {
        name: name,
        email: email,
        password: password,
        number:number
    };


    fetch('http://localhost:9001/users', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
    })
    .then(response => response.json())
    .then(data => {
    
            alert('Registration successful!');
            window.location.href = 'index.html';
    })
    .catch(error => {
        console.error('Error:', error);
        
    });
});
