let nsfw = {
    "overwatch":"overwatch_porn",
    "nier":"nierNSFW",
    "helltaker":"helltakerhentai"
}

let data = {}

const makeURL = (src) => {
    return "https://www.reddit.com/r/"+src+"/about.json"
}

const getData = () => {
    for (const [key, value] of Object.entries(nsfw)){
        let safe = makeURL(key)
        let elem_nsfw = makeURL(value)
        data[key] = {}
        fetch(safe, {
            }).then(response => { 
                return response.json()
            }).then(result => {
                data[key]["safe"] = result.data.subscribers
            });
        fetch(elem_nsfw, {
            }).then(response => { 
                return response.json()
            }).then(result => {
                data[key]["nsfw"] = result.data.subscribers
            });
    }

console.log(data);
}
