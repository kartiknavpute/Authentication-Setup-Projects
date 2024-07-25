document.getElementById('signUpForm').addEventListener('submit', async function(event) {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;

    const errorElement = document.getElementById('error');

    if (password !== confirmPassword) {
        errorElement.textContent = 'Passwords do not match!';
        return;
    } else {
        errorElement.textContent = '';
    }

    try {
        const response = await fetch('http://localhost:3000/auth/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, email, password, confirmPassword })
        });

        if (!response.ok) {
            throw new Error(await response.text());
        }

        window.location.href = 'welcome.html';
    } catch (err) {
        errorElement.textContent = err.message;
    }
});
