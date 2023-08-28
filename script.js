const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const form = document.getElementById('my-form');
const usersList = document.getElementById('users');

// Load existing users from local storage
const savedUsers = JSON.parse(localStorage.getItem('users')) || [];

// Display existing users 
savedUsers.forEach(user => {
    const li = document.createElement('li');
    li.textContent = `${user.name} - ${user.email}`;
    usersList.appendChild(li);
});

// Add event listener 
form.addEventListener('submit', function (e) {
    e.preventDefault();

    // Get user input
    const name = nameInput.value;
    const email = emailInput.value;

    // Store user details in local storage
    const user = { name, email };
    savedUsers.push(user);
    localStorage.setItem('users', JSON.stringify(savedUsers));

    const li = document.createElement('li');
    li.textContent = `${name} - ${email}`;
    usersList.appendChild(li);

    // Clear the form inputs
    nameInput.value = '';
    emailInput.value = '';
});