const darkModeBtn = document.getElementById('darkModeBtn');


darkModeBtn.addEventListener('click', ()=>{
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
  });
}



const timeList = document.getElementById('listOfTimes');

function formatTime(sec)
{
    const h = Math.floor(sec/3600);
    const m = Math.floor((sec%3600)/60);
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

function updateList()
{
    chrome.storage.local.get('storeTabData', ({storeTabData})=>{
        timeList.innerHTML = "";
        const ctx = document.getElementById("timeChart").getContext("2d");
        const colors = ["#ff6384", "#36a2eb", "#ffce56", "#4bc0c0", "#9966ff"];
        const values = []
        if(storeTabData)
        {
            Object.entries(storeTabData).sort((a, b)=> b[1]-a[1]).slice(0, 5).forEach(([domain, seconds])=>{
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
                
            });

        }
        drawPieChart(ctx, values, colors);

    })
    


}


setInterval(updateList, 1000);
updateList();
