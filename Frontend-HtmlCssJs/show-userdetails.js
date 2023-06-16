function displayLoggedInUserDetails() {
    const userData = localStorage.getItem('userData');
    if (userData) {
      const user = JSON.parse(userData);
      const userContainer = document.getElementById('user-container');
      userContainer.innerHTML = `
        <p>Welcome, ${user.name}!</p>
        <p>Email: ${user.email}</p>
        <p>Contact: ${user.number}</p>
      `;
    }
  }
  

displayLoggedInUserDetails();
  