let data = {}

let makeURL = (src) => {
    return "https://www.reddit.com/r/"+src+"/about.json"
}

let askData = async (target, container, key) => {
    await fetch(target, {}).then(async response => { 
        await response.json().then(data => {
            container[key] = data.data.subscribers
        })
    })
}

const getData = async (nsfw) => {
    for (const [key, value] of Object.entries(nsfw)){
        data[key] = {}
        let safe = makeURL(key)
        let elem_nsfw = makeURL(value)
        await askData(safe, data[key], "safe")
        await askData(elem_nsfw, data[key], "nsfw")
    }
    printData(data)
}

const plotData = (data) => {
    const ctx = document.getElementById('chart').getContext('2d');
    const myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: Object.keys(nsfw),
            datasets: [{
                label: '# of Subs',
                data: [12, 19, 3, 5, 2, 3],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}

const printData = (item) => {
    document.querySelector("#data").textContent = JSON.stringify(item)
}