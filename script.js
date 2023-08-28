const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const form = document.getElementById('my-form');
const usersList = document.getElementById('users');

// Load existing users from local storage
const savedUsers = JSON.parse(localStorage.getItem('users')) || [];

// Function to display existing users
function displayUsers() {
    usersList.innerHTML = ""; // Clear the list before re-adding
    savedUsers.forEach((user, index) => {
        const li = document.createElement('li');
        li.textContent = `${user.name} - ${user.email}`;
        
        const deleteButton = document.createElement('button');
        deleteButton.textContent = "Delete";
        deleteButton.addEventListener('click', () => deleteUser(index));
        
        li.appendChild(deleteButton);
        usersList.appendChild(li);
    });
}

// Function to delete a user
function deleteUser(index) {
    savedUsers.splice(index, 1); 
    localStorage.setItem('users', JSON.stringify(savedUsers)); 
    displayUsers(); 
}

// Display existing users on page load
displayUsers();

// Add event listener 
form.addEventListener('submit', function (e) {
    e.preventDefault();
    
    const name = nameInput.value;
    const email = emailInput.value;
    
    const user = { name, email };
    savedUsers.push(user);
    localStorage.setItem('users', JSON.stringify(savedUsers));
    
    displayUsers();
    
    nameInput.value = '';
    emailInput.value = '';
});
