function toggleProps(this: HTMLElement) {
  this.classList.toggle("collapsed")
  this.setAttribute(
    "aria-expanded",
    this.getAttribute("aria-expanded") === "true" ? "false" : "true",
  )
  const content = this.nextElementSibling as HTMLElement | undefined
  if (!content) return
  content.classList.toggle("collapsed")
}

function setupProps() {
  for (const prop of document.getElementsByClassName("properties")) {
    const button = prop.querySelector(".props-header")
    const content = prop.querySelector(".props-content")
    if (!button || !content) return
    button.addEventListener("click", toggleProps)
    window.addCleanup(() => button.removeEventListener("click", toggleProps))
  }
}

document.addEventListener("nav", () => {
  setupProps()
})
