// background.js
try {
  importScripts('miaow.js');
} catch (error) {
  console.error(error);
}

chrome.runtime.onInstalled.addListener(() => {
    console.log("installed first time, update whitelist")
    updateWhitelists()
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

chrome.tabs.onUpdated.addListener(async function(number, activeInfo, tab) {
    if (activeInfo.status !== "complete") {
      return 
    }
    const host = getHost(tab.url)
    const verified = await isWhitelisted(host)
    if (verified) {
      setSafeIcon(number) 
    } else {
      resetSafeIcon(number)
    }
});



