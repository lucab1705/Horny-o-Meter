let nsfw = {
    "overwatch":"overwatch_porn",
    "nier":"nierNSFW",
    "helltaker":"helltakerhentai"
}

let data = {}

function getData(){
    for (var elem in nsfw){
        let safe = "https://www.reddit.com/r/"+elem+"/about.json"
        let elem_nsfw = "https://www.reddit.com/r/"+nsfw[elem]+"/about.json"
        data[elem] = {}
        fetch(safe, {
            }).then(function (response) { 
                return response.json();
            }).then(function (result) {
                data[elem]["safe"] = result.data.subscribers
                console.log(result.data.subscribers)
            });
        fetch(elem_nsfw, {
            }).then(function (response) { 
                return response.json();
            }).then(function (result) {
                data[elem]["nsfw"] = result.data.subscribers
                console.log(result.data.subscribers)
            });
    }

console.log(data);
}