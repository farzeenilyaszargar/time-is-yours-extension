let activeTabId = null;
let activeDomain = null;
let storeTabData = {};
// store in the format of icon, title, timeSpent


function getDomainName(url)
{
    try{
        return new URL(url).hostname;
    }
    catch{
        return null;
    }
}


chrome.tabs.onActivated.addListener(async (activeTab)=>{

    const tab = await chrome.tabs.get(activeTab.tabId);
    activeTabId = activeTab.tabId;
    activeDomain = getDomainName(tab.url);

})

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab)=>{
    if (tabId == activeTabId && changeInfo.url)
    {
        activeDomain = getDomainName(changeInfo.url);
    }
})

setInterval(()=>{
    if(activeDomain)
    {
        if(!storeTabData[activeDomain])
        {
            storeTabData[activeDomain] = 0;
        }
        storeTabData[activeDomain]++;
        chrome.storage.local.set({storeTabData});
    }
}, 1000)