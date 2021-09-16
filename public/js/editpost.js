const postFormHandler = async (event) => {
    event.preventDefault()
    // get values from form
    const postId = document.querySelector("#post-id").value
    const subject = document.querySelector("#subject").value.trim()
    const content = document.querySelector("#content").value.trim()

    if (postId && subject && content) {
        // call post api
        const url = "/api/post/edit/" + postId
        const response = await fetch(url, {
            method: "POST",
            body: JSON.stringify({ subject, content }),
            headers: { "Content-Type": "application/json" },
        })

        if (response.ok) {
            document.location.replace("/posts/")
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
