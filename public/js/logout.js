const logout = async () => {
    const response = await fetch("/api/user/logout", {
        method: "Post",
        headers: { "Content-Type": "application/json" },
    })

    if (response.ok) {
        document.location.replace("/")
    } else {
        displayModal(response.statusText)
    }
}

document.querySelector("#logout").addEventListener("click", logout)
