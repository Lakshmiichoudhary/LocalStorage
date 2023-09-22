const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const form = document.getElementById('my-form');
const usersList = document.getElementById('users');

// Load existing users from local storage
const savedUsers = JSON.parse(localStorage.getItem('users')) || [];

let editIndex = -1;

// Function to display existing users
function displayUsers() {
    usersList.innerHTML = ""; // Clear the list before re-adding
    savedUsers.forEach((user, index) => {
        const li = document.createElement('li');

        const nameSpan = document.createElement('span');
        nameSpan.textContent = user.name;
        li.appendChild(nameSpan);

        const emailSpan = document.createElement('span');
        emailSpan.textContent = ` - ${user.email}`;
        li.appendChild(emailSpan);

        const editButton = document.createElement('button');
        editButton.textContent = "Edit";
        editButton.addEventListener('click', () => editUser(index));

        const deleteButton = document.createElement('button');
        deleteButton.textContent = "Delete";
        deleteButton.addEventListener('click', () => deleteUser(index));

        li.appendChild(editButton);
        li.appendChild(deleteButton);

        usersList.appendChild(li);
    });
}

// Function to edit a user
function editUser(index) {
    const user = savedUsers[index];
    nameInput.value = user.name;
    emailInput.value = user.email;
    editIndex = index;
}

// Function to delete a user
function deleteUser(index) {
    savedUsers.splice(index, 1);
    localStorage.setItem('users', JSON.stringify(savedUsers));
    editIndex = -1;
    displayUsers();
    nameInput.value = '';
    emailInput.value = '';
}

// Display existing users on page load
displayUsers();

// Add event listener
form.addEventListener('submit', function (e) {
    e.preventDefault();

    const name = nameInput.value;
    const email = emailInput.value;

    if (editIndex !== -1) {
        // Editing an existing user
        savedUsers[editIndex].name = name;
        savedUsers[editIndex].email = email;
        editIndex = -1;
    } else {
        // Adding a new user
        const user = { name, email };
        savedUsers.push(user);
    }

    localStorage.setItem('users', JSON.stringify(savedUsers));
    displayUsers();

    nameInput.value = '';
    emailInput.value = '';
});

// Replace this with your actual data
const userData = {
    
  };
  
  // Axios POST Request with data and corrected URL
  axios.post("https://crudcrud.com/api/4b3fab6b45c54841bda7ba26659891e5/users", userData)
    .then((response) => {
        
      console.log(response.data);
    })
    .catch((err) => {
      console.error(err);
    });
  