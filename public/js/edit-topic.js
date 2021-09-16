async function deleteFormHandler(event) {
    event.preventDefault()

    const id = window.location.toString().split("/")[
        window.location.toString().split("/").length - 1
    ]

    const response = await fetch(`/api/topics/${id}`, {
        method: "DELETE",
        body: JSON.stringify({
            post_id: id,
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
    .querySelector(".delete-topic-btn")
    .addEventListener("click", deleteFormHandler)
