let data = {}

let makeURL = (src) => {
    return "https://www.reddit.com/r/"+src+"/about.json"
}

let askData = async (target, game, key) => {
    let retVal
    await fetch(target, {}).then(async (response) => { 
        await response.json().then(async (response) => {
            retVal = response.data.subscribers
        })
    })
    data[game][key] = retVal
    return retVal
}

const getData = async (nsfw) => {
    waitArray = new Array()
    for (const [key, value] of Object.entries(nsfw)){
        data[key] = {}
        let safe = makeURL(key)
        let elem_nsfw = makeURL(value)
        waitArray.push(askData(safe, key,"safe"))
        waitArray.push(askData(elem_nsfw, key, "nsfw"))
    }
    while(elem = waitArray.pop())
        await elem
}

const buildChartData = async () => {
    let datasets = []
    for (const [key, value] of Object.entries(data)){
        for (let [k, val] of Object.entries(data[key])){
            datasets.push(
                {
                    label : key + ' ' + k,
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

const plotData = async () => {
    const ctx = document.getElementById('chart').getContext('2d');
    const plotData = await buildChartData()

    console.log(plotData)
    const myChart = new Chart(ctx, {
        type: 'bar',
        data: plotData,
        options: {
            plugins: {
              title: {
                display: true,
                text: 'HornyChart'
              },
            },
            responsive: true
          }
    });
}

const printData = (item) => {
    document.querySelector("#data").textContent = JSON.stringify(item)
}