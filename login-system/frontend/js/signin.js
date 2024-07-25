document.getElementById('signInForm').addEventListener('submit', async function(event) {
    event.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    const errorElement = document.getElementById('error');

    try {
        const response = await fetch('http://localhost:3000/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        });

        if (!response.ok) {
            throw new Error(await response.text());
        }

        window.location.href = 'dashboard.html';
    } catch (err) {
        errorElement.textContent = err.message;
    }
});
