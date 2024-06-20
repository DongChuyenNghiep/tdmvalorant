document.addEventListener('DOMContentLoaded', () => {
    const signUpForm = document.getElementById('signUpForm');
    const loginForm = document.getElementById('loginForm');
    const showUsersBtn = document.getElementById('showUsersBtn');
    const userList = document.getElementById('userList');

    signUpForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const username = document.getElementById('signUpUsername').value;
        const password = document.getElementById('signUpPassword').value;

        let users = JSON.parse(localStorage.getItem('users')) || {};

        if (users[username]) {
            alert('Username already exists');
        } else {
            users[username] = { password: password };
            localStorage.setItem('users', JSON.stringify(users));
            alert('User registered successfully');
        }

        signUpForm.reset();
    });

    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const username = document.getElementById('loginUsername').value;
        const password = document.getElementById('loginPassword').value;

        let users = JSON.parse(localStorage.getItem('users')) || {};

        if (users[username] && users[username].password === password) {
            alert('Login successful');
        } else {
            alert('Invalid username or password');
        }

        loginForm.reset();
    });

    showUsersBtn.addEventListener('click', () => {
        let users = JSON.parse(localStorage.getItem('users')) || {};
        userList.innerHTML = ''; // Clear the current list
        for (let username in users) {
            let userItem = document.createElement('div');
            userItem.textContent = `Username: ${username}, Password: ${users[username].password}`;
            userList.appendChild(userItem);
        }
    });
});
