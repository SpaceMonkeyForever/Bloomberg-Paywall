chrome.runtime.sendMessage({}, (response) => {
    var checkReady = setInterval(() => {
        if (document.readyState === "complete") {
            clearInterval(checkReady)
            console.log("Running Bloomberg paywall extension!")
            listenForChildElementAndRemove()
        }
    })
})



function enableScrolling(d: Document) {
    const attribute = "data-paywall-overlay-status"
    const selector = `[${attribute}*="show"]`
    const elements = [...document.querySelectorAll(selector)]
    elements.forEach(e => e.setAttribute(attribute, "hide"))
}

function listenForChildElementAndRemove() {
    const targetNode = document.body
    const ePaywallId = "graphics-paywall-overlay"

    // Options for the observer (which mutations to observe)
    const config = { childList: true };

    // Callback function to execute when mutations are observed
    const observe = function(mutationsList, observer) {
        // Use traditional 'for loops' for IE 11
        for(let mutation of mutationsList) {
            if (mutation.type === 'childList') {
                mutation.addedNodes.forEach(childElement => {
                    if (childElement.id == ePaywallId) {
                        childElement.remove()
                        enableScrolling(document)
                        // observer.disconnect()
                    }
                })
            }
        }
    };

    const observer = new MutationObserver(observe);
    observer.observe(targetNode, config);
}