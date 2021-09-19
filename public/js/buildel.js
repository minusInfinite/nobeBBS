function buildEl(tagName, elText, cssString, elAttr) {
    let el = document.createElement(tagName)
    el.className = cssString || ""
    el.textContent = elText || ""
    for (let i = 0; i < elAttr.length; i++) {
        el.setAttribute(
            elAttr[i].toString().split("#")[0],
            elAttr[i].toString().split("#")[1]
        )
    }
    return el
}
