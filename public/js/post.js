/**
 *
 * @param {Event} event
 */
function showForm(event) {
    event.stopPropagation()

    const postForm = document.querySelector(".post-form")
    postForm.style.display = "flex"

    submitTopic()
}

function submitTopic() {
    const postForm = document.querySelector(".post-form")
    const postSubject = document.querySelector("#post-subject")
    const postContent = document.querySelector("#post-content")
    const submitBtn = document.querySelector("input[value='Submit']")
    const dismissBtn = document.querySelector("input[value='Dismiss']")

    dismissBtn.onclick = () => {
        postSubject.value = ""
        postContent.value = ""
        postForm.style.display = "none"
    }

    submitBtn.addEventListener("click", async (event) => {
        event.preventDefault()
        event.stopPropagation()
        const subject = postSubject.value
        const content = postContent.value
        const topic_id = window.location.pathname.toString().split("/")[
            window.location.pathname.toString().split("/").length - 1
        ]

        try {
            const response = await fetch("/api/post/", {
                method: "POST",
                body: JSON.stringify({ subject, content, topic_id }),
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
            displayModal(errMsg)
        }
    })
}

document.querySelector("#add-post").addEventListener("click", showForm)
