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
    return data
}

const buildChartData = (data) => {
    let datasets = []
    for (const [key, value] of Object.entries(data)){
        for (const [k, val] of Object.entries(value)){
            datasets.push(
                {
                    label : key + ' ' + k[0],
                    data : {[key]:val},
                    stack : 'Stack '+ (k == "nsfw" ? 1 : 0),
                    backgroundColor : (k == "nsfw" ? 'rgba(255,0,0,0.6)' : 'rgba(0,0,255,0.6)')
                }
            )
        }
    }
    return {
        labels: Object.keys(data),
        datasets: datasets
    }
}

const plotData = (graphData) => {
    const ctx = document.getElementById('chart').getContext('2d');
    const data = buildChartData(graphData)

    console.log(data)
    const myChart = new Chart(ctx, {
        type: 'bar',
        data: data,
        options: {
            plugins: {
              title: {
                display: true,
                text: 'Chart.js Bar Chart - Stacked'
              },
            },
            responsive: true,
            interaction: {
              intersect: false,
            }
          }
    });
}

const printData = (item) => {
    document.querySelector("#data").textContent = JSON.stringify(item)
}