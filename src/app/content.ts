const delayToRunMs = 3000

chrome.runtime.sendMessage({}, (response) => {
    var checkReady = setInterval(() => {
        if (document.readyState === "complete") {
            clearInterval(checkReady)
            console.log("Running Bloomberg paywall extension!")
            
            try {
                // simple way instead of listening to the element being added
                setTimeout(runAll, delayToRunMs)
            } catch (error) {
                
            }
        }
    })
})

function runAll() {
    method1()
    method2()
}

function method1() {
    try {
        removePaywallElement1()
        enableScrolling()
    }
    catch(error) {}
}

function method2() {
    try {
        removePaywallElement2()
        showHiddenArticle()
    }
    catch(error) {}
}

// There are two elements, either can appear
const ePaywall1Id = "graphics-paywall-overlay"
const ePaywall2Class = "paywall-inline-tout"

function removePaywallElement1() {
    const e = document.getElementById(ePaywall1Id)
    e.remove()
}

function removePaywallElement2() {
    const es = document.getElementsByClassName(ePaywall2Class)
    for (let i = 0; i < es.length; i++) {
        const e = es[i];
        e.remove()
    }
}


function enableScrolling() {
    const attribute = "data-paywall-overlay-status"
    const selector = `[${attribute}*="show"]`
    const elements = [...document.querySelectorAll(selector)]
    elements.forEach(e => e.setAttribute(attribute, "hide"))
}

function showHiddenArticle() {
    const selector = `p[style*="display: none;"]`
    const elements = [...document.querySelectorAll(selector)]
    elements.forEach(e => e.setAttribute("style", ""))
}