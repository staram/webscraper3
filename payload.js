// Retrieve the title and URL of the current webpage
var title = document.title.replace(/[|&:;$%@"<>()+,]/g, "-");
var docURL = window.location.href;


// send the page title as a chrome message
chrome.runtime.sendMessage({ 
    messageTitle: title, 
    messageURL: docURL 
});