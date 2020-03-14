chrome.runtime.sendMessage({}, (response) => {
    var checkReady = setInterval(() => {
        if (document.readyState === "complete") {
            clearInterval(checkReady)
            console.log("Running Bloomberg paywall extension!")

            removePayWall(document)
            enableScrolling(document)
        }
    })
})


function removePayWall(d: Document) {
    const ePaywallId = "graphics-paywall-overlay"
    const ePaywall = d.getElementById(ePaywallId)
    ePaywall.remove()
}

function enableScrolling(d: Document) {
    const attribute = "data-paywall-overlay-status"
    const selector = `[${attribute}*="show"]`
    const elements = [...document.querySelectorAll(selector)]
    elements.forEach(e => e.setAttribute(attribute, "hide"))
}