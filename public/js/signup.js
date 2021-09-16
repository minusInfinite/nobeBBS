const signupFormHandler = async (event) => {
    event.preventDefault()
    // get values from form
    const username = document.querySelector("#username").value.trim()
    const password = document.querySelector("#password").value.trim()
    const avatar = document.querySelector("#avatar").value.trim()

    if (username && password) {
        // call signup API
        if (avatar) {
            body = { username, password, avatar, is_admin: 0 }
        } else {
            body = { username, password, is_admin: 0 }
        }
        const response = await fetch("/api/user/", {
            method: "POST",
            body: JSON.stringify(body),
            headers: { "Content-Type": "application/json" },
        })

        if (response.ok) {
            document.location.replace("/")
        } else {
            const errMsg = await response.json((msg) => JSON.parse(msg))
            if ("errors" in errMsg) {
                displayModal(errMsg.errors[0].message)
            } else {
                displayModal(errMsg)
            }
        }
    }
}

document
    .querySelector("#signup-form")
    .addEventListener("submit", signupFormHandler)
