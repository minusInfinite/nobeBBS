const signupFormHandler = async(event) => {

    event.preventDefault();
    // get values from form
    const username = document.querySelector('#username').value.trim();
    const password = document.querySelector('#password').value.trim();

    if (username && password) {
        // call signup API
        const response = await fetch('/api/users/new', {
            method: 'POST',
            body: JSON.stringify({username, password, is_admin: 0}),
            headers: {'Content-Type': 'application/json'}
        });

        if (response.ok) {
            document.location.replace('/users/');
        } else {
            alert('Failed to sign up');
        };
    }
};

document
    .querySelector('#signup-form')
    .addEventListener('submit', signupFormHandler);