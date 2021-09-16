const postFormHandler = async(event) => {

    event.preventDefault();
    // get values from form
    const subject = document.querySelector('#subject').value.trim();
    const content = document.querySelector('#content').value.trim();

    if (subject && content) {
        // call post api
        const response = await fetch('/api/posts/new', {
            method: 'POST',
            body: JSON.stringify({subject, content}),
            headers: {'Content-Type': 'application/json'}
        });

        if (response.ok) {
            document.location.replace('/posts/');
        } else {
            alert('Failed to post');
        };
    }
};

document
    .querySelector('#post-form')
    .addEventListener('submit', postFormHandler);