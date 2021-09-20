const updatePassFormHandler = async (event) => {
    event.preventDefault()
    // get values from form
    const currentPassword = document
        .querySelector("#current-password")
        .value.trim()
    const newPassword = document.querySelector("#new-password").value.trim()

    if (currentPassword && newPassword) {
        // call login API
        const response = await fetch("/api/user/updatepass", {
            method: "PATCH",
            body: JSON.stringify({ currentPassword, newPassword }),
            headers: { "Content-Type": "application/json" },
        })

        if (response.ok) {
            document.location.replace("/users/")
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
    .querySelector("#password-form")
    .addEventListener("submit", updatePassFormHandler)

const updateAvatarFormHandler = async (event) => {
    event.preventDefault()
    // get values from form
    const avatar = document.querySelector("#new-avatar").value.trim()

    if (avatar) {
        // call login API
        const response = await fetch("/api/user/updateavatar", {
            method: "PATCH",
            body: JSON.stringify({ avatar }),
            headers: { "Content-Type": "application/json" },
        })

        if (response.ok) {
            document.location.replace("/users/")
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
    .querySelector("#avatar-form")
    .addEventListener("submit", updateAvatarFormHandler)
