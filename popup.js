const timeList = document.getElementById("timeList");

function formatTime(seconds) {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return `${h}h ${m}m ${s}s`;
}

function updateList() {
    chrome.storage.local.get("timeData", ({ timeData }) => {
        timeList.innerHTML = "";
        if (timeData) {
            Object.entries(timeData).sort((a, b) => b[1] - a[1]).forEach(([domain, seconds]) => {
                    const li = document.createElement("li");
                    li.textContent = `${domain}: ${formatTime(seconds)}`;
                    timeList.appendChild(li);
                });
        }
    });
}

// Update every second
setInterval(updateList, 1000);
updateList();
