parent.postMessage(document.title, "*")

new MutationObserver(function(mutations) {
    parent.postMessage(mutations[0].target.nodeValue, "*")
}).observe(
    document.querySelector('title'),
    { subtree: true, characterData: true, childList: true }
);