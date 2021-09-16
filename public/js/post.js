const postFormHandler = async (event) => {
    event.preventDefault()
    // get values from form
    const subject = document.querySelector("#subject").value.trim()
    const content = document.querySelector("#content").value.trim()

    if (subject && content) {
        // call post api
        const response = await fetch("/api/post/", {
            method: "POST",
            body: JSON.stringify({ subject, content }),
            headers: { "Content-Type": "application/json" },
        })

        if (response.ok) {
            window.history.back()
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

document.querySelector("#post-form").addEventListener("submit", postFormHandler)
