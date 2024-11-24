const users = JSON.parse(localStorage.getItem('users')) || [];

// Function to handle form submission
function handleAuth(event) {
    event.preventDefault(); // Prevent form submission

    const isSigningUp = document.getElementById('signupFields').style.display === 'block';

    if (isSigningUp) {
        // Sign up logic
        const usernameInput = document.getElementById('signupUsername').value;
        const passwordInput = document.getElementById('signupPassword').value;
        const signupMessage = document.getElementById('signup-message');

        // Check if username already exists
        const existingUser = users.find(user => user.username === usernameInput);

        if (existingUser) {
            signupMessage.textContent = 'Username already exists. Please choose another one.';
        } else {
            // Create new user and save to localStorage
            users.push({ username: usernameInput, password: passwordInput });
            localStorage.setItem('users', JSON.stringify(users));
            signupMessage.textContent = 'Account created successfully! You can now log in.';
            document.getElementById('authForm').reset();
        }
    } else {
        // Login logic
        const usernameInput = document.getElementById('username').value;
        const passwordInput = document.getElementById('password').value;
        const errorMessage = document.getElementById('error-message');

        // Check user credentials
        const user = users.find(user => user.username === usernameInput && user.password === passwordInput);

        if (user) {
            // Successful login
            localStorage.setItem('loggedInUser', usernameInput); // Store username in localStorage
            window.location.href = 'index.html'; // Redirect to home page
        } else {
            // Show error message
            errorMessage.textContent = 'Invalid username or password.';
        }
    }
}

// Attach event listener to the form
document.getElementById('authForm').addEventListener('submit', handleAuth);

// Toggle between login and signup
document.getElementById('toggleButton').addEventListener('click', function() {
    const loginFields = document.getElementById('loginFields');
    const signupFields = document.getElementById('signupFields');
    const formTitle = document.getElementById('formTitle');
    const submitButton = document.getElementById('submitButton');

    if (loginFields.style.display === 'none') {
        // Switch to login
        signupFields.style.display = 'none';
        loginFields.style.display = 'block';
        formTitle.textContent = 'Login to INWOOD';
        submitButton.textContent = 'Login';
        document.getElementById('error-message').textContent = ''; // Clear error message
    } else {
        // Switch to signup
        loginFields.style.display = 'none';
        signupFields.style.display = 'block';
        formTitle.textContent = 'Create an Account';
        submitButton.textContent = 'Sign Up';
        document.getElementById('signup-message').textContent = ''; // Clear signup message
    }
});