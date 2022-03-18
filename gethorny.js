let nsfw = {
    "overwatch":"overwatch_porn",
    "nier":"nierNSFW",
    "helltaker":"helltakerhentai"
}

let data = {}

function getData(){
    for (const [key, value] of Object.entries(nsfw)){
        let safe = "https://www.reddit.com/r/"+key+"/about.json"
        let elem_nsfw = "https://www.reddit.com/r/"+value+"/about.json"
        data[key] = {}
        fetch(safe, {
            }).then(function (response) { 
                return response.json();
            }).then(function (result) {
                data[key]["safe"] = result.data.subscribers
                console.log(result.data.subscribers)
            });
        fetch(elem_nsfw, {
            }).then(function (response) { 
                return response.json();
            }).then(function (result) {
                data[key]["nsfw"] = result.data.subscribers
                console.log(result.data.subscribers)
            });
    }

console.log(data);
}
