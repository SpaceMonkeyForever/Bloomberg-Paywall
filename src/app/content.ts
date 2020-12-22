// https://developer.chrome.com/docs/extensions/mv2/messaging/
chrome.runtime.onMessage.addListener((request) => {
    console.log("received message: " + request)

    if (request.action === 'case1') {
        PaywallRemover.case1()
    }

    if (request.action === 'case2') {
        PaywallRemover.case2()
    }
});

class PaywallRemover
{
    static runBothCases() {
        PaywallRemover.case1()
        PaywallRemover.case2()
    }

    static case1() {
        PaywallRemover.removePaywallElement1()
        PaywallRemover.showHiddenArticle()
    }

    static case2() {
        PaywallRemover.removePaywallElement2()
        PaywallRemover.enableScrolling()
    }

    // There are two elements, either can appear
    static removePaywallElement1() {
        const ePaywall2Class = "paywall-inline-tout"
        const es = document.getElementsByClassName(ePaywall2Class)
        for (let i = 0; i < es.length; i++) {
            const e = es[i];
            e.remove()
        }
    }

    static removePaywallElement2() {
        const ePaywall1Id = "graphics-paywall-overlay"
        const e = document.getElementById(ePaywall1Id)
        e.remove()
    }

    static enableScrolling() {
        const attribute = "data-paywall-overlay-status"
        const selector = `[${attribute}*="show"]`
        const elements = [...document.querySelectorAll(selector)]
        elements.forEach(e => e.setAttribute(attribute, "hide"))
    }

    static showHiddenArticle() {
        const selector = `[style*="display: none;"]`
        const elements = [...document.querySelectorAll(selector)]
        elements.forEach(e => e.setAttribute("style", ""))
    }
}