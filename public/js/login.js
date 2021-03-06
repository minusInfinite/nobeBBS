const loginFormHandler = async (event) => {
    event.preventDefault()
    // get values from form
    const username = document.querySelector("#username").value.trim()
    const password = document.querySelector("#password").value.trim()

    if (username && password) {
        // call login API
        const response = await fetch("/api/user/login", {
            method: "POST",
            body: JSON.stringify({ username, password }),
            headers: { "Content-Type": "application/json" },
        })

        if (response.ok) {
            document.location.assign("/")
        } else {
            const errMsg = await response.json((msg) => JSON.parse(msg))
            if ("errors" in errMsg) {
                displayModal(errMsg.errors[0].message)
            } else {
                displayModal("Error in Submission")
            }
        }
    } else {
        displayModal("Password Error")
    }
}

document
    .querySelector("#login-form")
    .addEventListener("submit", loginFormHandler)
