//* Background - Interface with the browser API

// declare extension default properties
let savedEntriesArray = [];
let initialState = {
  savedEntries: savedEntriesArray
};

/* global chrome */
chrome.runtime.onInstalled.addListener(function() {
  chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
    chrome.declarativeContent.onPageChanged.addRules([
      {
        conditions: [
          new chrome.declarativeContent.PageStateMatcher({
            pageUrl: {
              urlContains: "linkedin.com/search"
            }
          })
        ],
        actions: [new chrome.declarativeContent.ShowPageAction()]
      }
    ]);
  });
  chrome.storage.local.set(initialState);
});
