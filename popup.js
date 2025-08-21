const darkModeBtn = document.getElementById('darkModeBtn');


darkModeBtn.addEventListener('click', () => {
    const bodyDoc = document.querySelector('body');
    bodyDoc.classList.toggle('darkMode');

})




function drawPieChart(ctx, data, colors) {
    let total = data.reduce((a, b) => a + b, 0);
    let startAngle = 0;

    data.forEach((value, i) => {
        let sliceAngle = (value / total) * 2 * Math.PI;
        ctx.beginPath();
        ctx.moveTo(50, 50); // center
        ctx.arc(50, 50, 50, startAngle, startAngle + sliceAngle);
        ctx.closePath();
        ctx.fillStyle = colors[i];
        ctx.fill();
        startAngle += sliceAngle;
        ctx.lineWidth = 1;         // border thickness
        ctx.strokeStyle = "#000000";  // border color (white looks nice)
        ctx.stroke();
    });
}

const domainColors = {
    youtube: "#FF0000",
    chrome: "#4285F4",
    reddit: "#FF5700",
    google: "#ffffffff",
    twitter: "#1DA1F2",
    facebook: "#1877F2",
    instagram: "#E1306C",
    linkedin: "#0A66C2",
    pinterest: "#E60023",
    tiktok: "#69C9D0",
    netflix: "#E50914",
    amazon: "#FF9900",
    stackoverflow: "#F48024",
    wikipedia: "#efe3e3ff",
    yahoo: "#430297",
    msn: "#00ADEF",
    microsoft: "#F25022",
    spotify: "#1DB954",
    twitch: "#9146FF",
    quora: "#B92B27",
    tumblr: "#36465D",
    medium: "#00AB6C",
    vimeo: "#1AB7EA",
    soundcloud: "#FF5500",
    slack: "#4A154B",
    dropbox: "#0061FF",
    ebay: "#E53238",
    whatsapp: "#25D366",
    telegram: "#0088CC",
    snapchat: "#FFFC00",
    stackexchange: "#2F6FAB",
    wix: "#1C7BBA",
    canva: "#00C4CC",
    paypal: "#003087",
    adobe: "#FF0000",
    cnn: "#CC0000",
    bbc: "#BBCBBC",
    nytimes: "#000000",
    hulu: "#1CE783",
    zoom: "#2D8CFF",
    discord: "#5865F2",
    dropbox: "#0061FF",
    airbnb: "#FF5A5F",
    medium: "#00AB6C",
    twitch: "#9146FF",
    reddit: "#FF5700",
    quora: "#B92B27",
    stackoverflow: "#F48024",
    github: "#181717",
    googlemaps: "#4285F4",
    imdb: "#F5DE50",
    vercel: "#000000",
    icons8: "#26fb00ff",
    figma: "#f21e9dff",
    chatgpt: "#b4b4b4ff",
    openai: "#a0a0a0ff",
    w3schools: "#4CAF50",
    codecademy: "#303F9F",
    coursera: "#2A73CC",

};



const timeList = document.getElementById('listOfTimes');

function formatTime(sec) {
    const h = Math.floor(sec / 3600);
    const m = Math.floor((sec % 3600) / 60);
    const s = sec % 60;
    return `${h}h ${m}m ${s}s`;
}

function getCleanName(domain) {
    if (!domain) return "";
    // Remove www.
    domain = domain.replace(/^www\./, "");
    // Take only first part before "."
    let name = domain.split(".")[0];
    // Capitalize first letter
    return name.charAt(0).toUpperCase() + name.slice(1);
}





function updateList() {
    chrome.storage.local.get('storeTabData', ({ storeTabData }) => {
        timeList.innerHTML = "";
        const ctx = document.getElementById("timeChart").getContext("2d");
        const values = []
        const labels = []

        if (storeTabData) {
            Object.entries(storeTabData).sort((a, b) => b[1] - a[1]).slice(0, 5).forEach(([domain, seconds], i) => {
                const li = document.createElement('li');
                const img = document.createElement("img");
                img.src = "https://www.google.com/s2/favicons?domain=" + domain;
                img.className = "favicon";
                const h1 = document.createElement("h3");
                h1.textContent = getCleanName(domain);
                const span = document.createElement("span");
                span.textContent = formatTime(seconds);

                li.appendChild(img);
                li.appendChild(h1);
                li.appendChild(span);
                timeList.appendChild(li);
                values.push(seconds);
                labels.push(getCleanName(domain));
                const warnOnBtn = document.getElementById('warnOn');
                if (warnOnBtn.checked) {
                    if (seconds === 3600) {
                        alert(`🚨 You've been on ${getCleanName(domain)} for 1 hour straight!`);
                    }

                }




            });
            const colors = labels.map(domain => {
                const name = domain.toLowerCase().replace(/^www\./, '').split('.')[0]; // normalize
                return domainColors[name] || "#888"; // fallback gray if not in map
            });
            drawPieChart(ctx, values, colors);




        }

    })



}


setInterval(updateList, 1000);
updateList();
