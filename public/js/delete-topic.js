async function editFormHandler(event) {
    event.preventDefault()

    const title = document.querySelector('input[name="topic-title"]').value
    const post_text = document.querySelector(
        'textarea[name="topic-text"]'
    ).value
    const id = window.location.toString().split("/")[
        window.location.toString().split("/").length - 1
    ]

    const response = await fetch(`/api/topics/${id}`, {
        method: "PUT",
        body: JSON.stringify({
            title,
            post_text,
        }),
        headers: {
            "Content-Type": "application/json",
        },
    })

    if (response.ok) {
        document.location.replace("/dashboard/")
    } else {
        const errMsg = await response.json((msg) => JSON.parse(msg))
        if ("errors" in errMsg) {
            displayModal(errMsg.errors[0].message)
        } else {
            displayModal(errMsg)
        }
    }
}

document
    .querySelector(".edit-topic-form")
    .addEventListener("submit", editFormHandler)
