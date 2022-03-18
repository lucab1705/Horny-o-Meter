let nsfw = {
    "overwatch":"overwatch_porn",
    "nier":"nierNSFW",
    "helltaker":"helltakerhentai"
}

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

const getData = async () => {
    for (const [key, value] of Object.entries(nsfw)){
        data[key] = {}
        let safe = makeURL(key)
        let elem_nsfw = makeURL(value)
        await askData(safe, data[key], "safe")
        await askData(elem_nsfw, data[key], "nsfw")
    }
    printData(data)
}

const printData = (item) => {
    document.querySelector("#data").textContent = JSON.stringify(item)
}