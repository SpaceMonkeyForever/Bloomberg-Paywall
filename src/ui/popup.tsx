import * as React from "react"
import * as ReactDOM from "react-dom"

import "../styles/popup.css"

class RemoveActions extends React.Component {

    constructor(props) {
        super(props);
        // This binding is necessary to make `this` work in the callback
        this.sendMessageToContentPage = this.sendMessageToContentPage.bind(this);
    }

    sendMessageToContentPage(message: String) {
        chrome.tabs.query({ active: true, currentWindow: true}, function(activeTabs) {
            console.log("sending case1 to content");
            // https://developer.chrome.com/docs/extensions/mv2/messaging/
            chrome.tabs.sendMessage(activeTabs[0].id, { action: message });
        });
    }

    render() {
        console.log("rendering")
        return (
            <div className="popup-padded">
                <h1>Manual:</h1>
                <button onClick={() => this.sendMessageToContentPage("case1")}> Case 1 </button>
                <button onClick={() => this.sendMessageToContentPage("case2")}> Case 2 </button>
            </div>
        )
    }
}

// perform action once popup is displayed i.e. when the extension button is clicked
chrome.tabs.query({ active: true, currentWindow: true}, function(activeTabs) {
    chrome.tabs.sendMessage(activeTabs[0].id, { action: "case1" });
    chrome.tabs.sendMessage(activeTabs[0].id, { action: "case2" });
});

ReactDOM.render(
    <RemoveActions />,
    document.getElementById('root')
)