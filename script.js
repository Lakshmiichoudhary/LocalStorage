const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const form = document.getElementById('my-form');
const usersList = document.getElementById('users');

let savedUsers = []; 

let editIndex = -1;

// Function to display existing users
function displayUsers() {
    usersList.innerHTML = ""; 
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
    displayUsers();
    nameInput.value = '';
    emailInput.value = '';
}

// Display existing users on page load
displayUsers();

//  GET request to fetch user data from the CRUD API
axios.get("https://crudcrud.com/api/2d96262635804c53a6eb922753f92a9b/users")
    .then((response) => {
        savedUsers = response.data; // Update savedUsers with data from the API
        displayUsers(); // Display t
    })
    .catch((err) => {
        console.error(err);
    });

// Add event listener for form submission
form.addEventListener('submit', function (e) {
    e.preventDefault();
    
    const userData = {
        name: nameInput.value,
        email: emailInput.value
    };

    if (editIndex === -1) {
        
        savedUsers.push(userData);
    } else {
        
        savedUsers[editIndex] = userData;
    }

    // POST request to save user data to the CRUD API
    axios.post("https://crudcrud.com/api/2d96262635804c53a6eb922753f92a9b/users", userData)
        .then((response) => {
            console.log(response.data);
            displayUsers(); // Update the display
        })
        .catch((err) => {
            console.error(err);
        });

    nameInput.value = '';
    emailInput.value = '';
    editIndex = -1;
});
