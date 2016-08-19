var urlRegex = /^https?:\/\/(?:[^./?#]+\.)?kissanime\.to/;
chrome.tabs.query({
    active: true,
    currentWindow: true
}, function(tabs) {
    askForAnimeInfo(tabs[0])
});
var animeObject;
var askForAnimeInfo = function(tab) {
    console.log("Asking");
    if (urlRegex.test(tab.url)) {
        chrome.tabs.sendMessage(tab.id, {
                type: "anime_info"
            },
            function(response) {
                if (response) {
                    console.log("Recieved Response")
                    response.animeURL = tab.url
                    animeObject = response
                    displayToInfotron(animeObject)
                }
            });
    }

}


var displayToInfotron = function(animeObj) {
    document.getElementById('infotron').style.display = "flex";
    document.getElementById('pageAnimeTitle').innerHTML = animeObj.name
    document.getElementById('animeImg').src = animeObj.imageLink
    console.log(animeObj.animeURL)
}

document.getElementById("saveAnime").addEventListener("click", function() {
    if (animeObject) {
        // Append to "Saved" List UI
        appendToDOM(animeObject)
            // Append to Local Storage
        syncAnime(animeObject)
    }
})




var syncAnime = function(aObj) {
  console.log("anime info:", aObj);
  var array = function() {
        chrome.storage.sync.get("animeArray", function(animeSnapshot) {
            if (!animeSnapshot.animeArray) {
                var arr = []
                arr.push(aObj)
                console.log("undefined but uploading this: ", arr)
                return arr;
            } else {
              console.log("not empty and uploading this: ", arr)

                var a = animeSnapshot.animeArray
                a.push(aObj)
                return a;
            }
        })
    }

    chrome.storage.sync.clear();

    chrome.storage.sync.set({
        "animeArray": array
    }, function() {
        // Notify that we saved.
        //message('Synced Anime Object');
        console.log("Saved the anime")
    });
}

var appendToDOM = function(aObj) {


}
var gcc = function() {
    chrome.storage.sync.clear();
}
