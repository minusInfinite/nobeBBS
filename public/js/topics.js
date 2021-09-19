/**
 *
 * @param {Event} event
 */
function showForm(event) {
    event.stopPropagation()

    const topicForm = document.querySelector(".topic-form")
    topicForm.style.display = "flex"

    submitTopic()
}

function submitTopic() {
    const topicForm = document.querySelector(".topic-form")
    const topicSubject = document.querySelector("#topic-subject")
    const submitBtn = document.querySelector("input[value='Submit']")
    const dismissBtn = document.querySelector("input[value='Dismiss']")

    dismissBtn.onclick = () => {
        topicSubject.value = ""
        topicForm.style.display = "none"
    }

    submitBtn.addEventListener("click", async (event) => {
        event.preventDefault()
        event.stopPropagation()
        const subject = topicSubject.value

        try {
            const response = await fetch("/api/topic/", {
                method: "POST",
                body: JSON.stringify({ subject }),
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

document.querySelector("#add-topic").addEventListener("click", showForm)
