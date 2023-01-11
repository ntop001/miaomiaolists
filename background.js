// background.js
try {
  importScripts('miaow.js');
} catch (error) {
  console.error(error);
}

chrome.runtime.onInstalled.addListener(() => {
    console.log("ex installed first time")
});

function setSafeIcon(tabId) {
  // chrome.action.setBadgeBackgroundColor(
  //   {color: '#1FB655', tabId: tabId, },  // Green
  //   () => { /* ... */ },
  // );
  chrome.action.setBadgeText(
    {text: "SAFU", tabId: tabId, },
    () => {  /* ... */  }
  );
}

function resetSafeIcon(tabId) {
  chrome.action.setBadgeText({
    'text': '', //an empty string displays nothing!
    tabId: tabId,
  });
}

chrome.tabs.onUpdated.addListener(function(number, activeInfo, tab) {
    if (activeInfo.status !== "complete") {
      return 
    }
    const host = getHost(tab.url)
    if (isWhitelisted(host)) {
      setSafeIcon(number) 
    } else {
      resetSafeIcon(number)
    }
});



