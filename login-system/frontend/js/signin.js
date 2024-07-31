document.getElementById('signInForm').addEventListener('submit', async function(event) {
    event.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    const errorElement = document.getElementById('error');

    try {
        const response = await fetch('http://localhost:3000/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        });

        if (!response.ok) {
            throw new Error(await response.text());
        }

        // const data = await response.json();
        // console.log('Login response:', data); // Log the response to verify it contains the token

        // localStorage.setItem('token', data.token); // Store the token in localStorage
        // alert('Login successful!');
        window.location.href = 'dashboard.html';
    } catch (err) {
        errorElement.textContent = err.message;
    }
});
