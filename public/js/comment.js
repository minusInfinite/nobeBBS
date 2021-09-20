/**
 *
 * @param {Event} event
 */
async function showForm(event) {
    event.stopPropagation()
    event.preventDefault()
    /** @type {HTMLElement} */
    const element = event.target

    if (element.localName === "button" && element.id.includes("reply")) {
        const elParent = element.parentElement.parentElement
        elParent.nextElementSibling.style.display = "flex"
    }

    if (element.localName === "button" && element.id.includes("quote")) {
        const elParent = element.parentElement.parentElement
        const elForm = element.parentElement.parentElement.nextElementSibling
        elForm.style.display = "flex"
        const currentContent = elParent.childNodes[5].textContent.trim()
        elForm.childNodes[1][1].value = `<em>${currentContent}</em>`
    }

    if (element.localName === "input" && element.value.includes("Dismiss")) {
        const elParent = element.parentElement.parentElement.parentElement
        element.previousElementSibling.previousElementSibling.value = ""
        elParent.style.display = "none"
    }

    if (element.localName === "input" && element.value.includes("Submit")) {
        const comment_text = element.previousElementSibling.value.trim()
        const post_id = window.location.pathname.toString().split("/")[
            window.location.pathname.toString().split("/").length - 1
        ]

        if (comment_text) {
            try {
                const response = await fetch("/api/comment/", {
                    method: "POST",
                    body: JSON.stringify({
                        post_id,
                        comment_text,
                    }),
                    headers: {
                        "Content-Type": "application/json",
                    },
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
            } catch (err) {
                displayModal(err)
            }
        }
    }
}

document.querySelector("#post-template").addEventListener("click", showForm)
