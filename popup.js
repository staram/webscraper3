// Inject the payload.js script into the current tab after the popout has loaded

window.addEventListener("load", function(e) {
	chrome.extension.getBackgroundPage().chrome.tabs.executeScript(null, {
		file: "payload.js"
	});;
});

// Listen to messages from the payload.js script and write to popout.html
chrome.runtime.onMessage.addListener(function (message) {
    document.getElementById('page-url').value = message.messageURL;
	document.getElementById('page-title').value = message.messageTitle;
});

document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('savebutton').addEventListener("click", saveTextToFile);
});

function saveTextToFile() {
    const textToSave = document.getElementById("page-text").value;

    if (!textToSave) {
        alert("Please enter some text to save.");
        return;
    }

    const blob = new Blob([textToSave], {type: 'text/plain;charset=utf8'});
    const url = URL.createObjectURL(blob);
    let fileName = document.getElementById("page-text").value
    if(fileName.length > 5) {
        fileName = fileName.substring(0,5) };

    chrome.downloads.download({
        url: url, 
        filename: fileName,
        saveAs: true
    });

    

    URL.revokeObjectURL(url);
}

