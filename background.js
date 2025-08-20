
let activeTabId = null;
let activeDomain = null;
let timeData = {}; //format should be "icon-url":"domain-name":"time"

function getDomain(url) {
    try {
        return new URL(url).hostname;
    } catch {
        return null;
    }
}

chrome.tabs.onActivated.addListener(async (activeInfo) => {
    const tab = await chrome.tabs.get(activeInfo.tabId);
    activeTabId = activeInfo.tabId;
    activeDomain = getDomain(tab.url);
});

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (tabId === activeTabId && changeInfo.url) {
        activeDomain = getDomain(changeInfo.url);
    }
});

setInterval(() => {
    if (activeDomain) {
        if (!timeData[activeDomain]) timeData[activeDomain] = 0;
        timeData[activeDomain]++;
        chrome.storage.local.set({ timeData });
    }
}, 1000);