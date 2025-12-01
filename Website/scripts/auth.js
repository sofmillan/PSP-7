const API_URL = 'http://localhost:3000/users';

const loginView = document.getElementById('login-view');
const registerView = document.getElementById('register-view');
const message = document.getElementById('message');

// --- Form Toggle Logic ---

document.getElementById('show-register').addEventListener('click', (e) => {
    e.preventDefault();
    loginView.style.display = 'none';
    registerView.style.display = 'block';
    message.textContent = ''; // Clear status message on switch
});

document.getElementById('show-login').addEventListener('click', (e) => {
    e.preventDefault();
    registerView.style.display = 'none';
    loginView.style.display = 'block';
    message.textContent = ''; // Clear status message on switch
});


// --- Helper Function (Unchanged) ---
function saveUserSession(user) {
    // Store user info (especially the role) in localStorage
    localStorage.setItem('currentUser', JSON.stringify(user));
    
    // Redirect based on role
    if (user.role === 'admin') {
        window.location.href = 'pages/create-product.html';
    } else { // user.role === 'user'
        window.location.href = 'pages/home.html';
    }
}

// --- Registration Handler ---
document.getElementById('register-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('register-email').value;
    const password = document.getElementById('register-password').value;
    
    message.textContent = 'Processing registration...';

    // 1. Check if user already exists
    try {
        const checkUser = await fetch(`${API_URL}?email=${email}`);
        const existingUsers = await checkUser.json();

        if (existingUsers.length > 0) {
            message.textContent = 'Registration failed: User already exists.';
            return;
        }

        // 2. Register new user (default role is 'user')
        const newUser = { email, password, role: 'user' };
        
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newUser)
        });

        if (response.ok) {
            const user = await response.json();
            message.textContent = 'Registration successful! Logging you in...';
            // Optional: Clear form
            document.getElementById('register-form').reset(); 
            saveUserSession(user);
        } else {
            message.textContent = 'Registration failed due to server error.';
        }
    } catch (error) {
        message.textContent = 'Network error during registration.';
        console.error('Registration Error:', error);
    }
});

// --- Login Handler ---
document.getElementById('login-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;

    message.textContent = 'Attempting login...';

    try {
        // 1. Find user by email and password
        const response = await fetch(`${API_URL}?email=${email}&password=${password}`);
        const users = await response.json();

        if (users.length === 1) {
            message.textContent = 'Login successful! Redirecting...';
            // Optional: Clear form
            document.getElementById('login-form').reset();
            saveUserSession(users[0]);
        } else {
            message.textContent = 'Login failed: Invalid email or password.';
        }
    } catch (error) {
        message.textContent = 'Network error during login.';
        console.error('Login Error:', error);
    }
});