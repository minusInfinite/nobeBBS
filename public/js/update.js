/**
 *
 * @param {String} contentType
 * @param {Number} contentId
 */
async function deleteContent(contentType, contentId) {
    try {
        if (contentType === "post") {
            const response = await fetch(`/api/post/${contentId}`, {
                method: "DELETE",
            })

            if (response.ok) {
                document.location.reload()
            } else {
                const errMsg = await response.json((msg) => JSON.stringify(msg))
                displayModal(errMsg)
            }
        }
        if (contentType === "comment") {
            const response = await fetch(`/api/comment/${contentId}`, {
                method: "DELETE",
            })

            if (response.ok) {
                document.location.reload()
            } else {
                const errMsg = await response.json((msg) => JSON.stringify(msg))
                displayModal(errMsg)
            }
        }
    } catch (err) {
        displayModal(JSON.stringify(err))
    }
}

document.querySelector("#user-post-list").addEventListener("click", (event) => {
    event.stopPropagation()

    /** @type {HTMLElement} */
    const element = event.target

    if (element.localName === "button" && element.dataset.post) {
        const postID = element.dataset.post

        deleteContent("post", postID)
    }

    if (element.localName === "button" && element.dataset.comment) {
        const commentID = element.dataset.comment

        deleteContent("comment", commentID)
    }
})

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
            displayModal("Password Saved")
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
    const avatar = document.querySelector("#avatar-url").value.trim()

    if (avatar) {
        // call login API
        const response = await fetch("/api/user/updateavatar", {
            method: "PATCH",
            body: JSON.stringify({ avatar }),
            headers: { "Content-Type": "application/json" },
        })

        if (response.ok) {
            document.location.reload()
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
