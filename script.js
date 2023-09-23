const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const form = document.getElementById('my-form');
const usersList = document.getElementById('users');

let savedUsers = [];

let editIndex = -1;

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

        const deleteButton = document.createElement('button'); 
        deleteButton.textContent = "Delete"; 
        deleteButton.addEventListener('click', () => deleteUser(index, user._id)); 
        li.appendChild(deleteButton); 

        usersList.appendChild(li);
    });
}

function editUser(index) {
    const user = savedUsers[index];
    nameInput.value = user.name;
    emailInput.value = user.email;
    editIndex = index;
}

function deleteUser(index, userId) {
    axios
        .delete(`https://crudcrud.com/api/2d96262635804c53a6eb922753f92a9b/users/${userId}`)
        .then(() => {
            savedUsers.splice(index, 1);
            displayUsers();
        })
        .catch((err) => {
            console.error(err);
        });
}

displayUsers();

axios.get("https://crudcrud.com/api/2d96262635804c53a6eb922753f92a9b/users")
    .then((response) => {
        savedUsers = response.data;
        displayUsers();
    })
    .catch((err) => {
        console.error(err);
    });

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

    axios.post("https://crudcrud.com/api/2d96262635804c53a6eb922753f92a9b/users", userData)
        .then((response) => {
            console.log(response.data);
            displayUsers();
        })
        .catch((err) => {
            console.error(err);
        });

    nameInput.value = '';
    emailInput.value = '';
    editIndex = -1;
});
