// create nime object
var animeName = document.getElementsByClassName("bigChar")[0].text
var animeImageURL = document.getElementsByTagName("img")[5].src
var animeObj = {
    "name": animeName,
    "imageLink" : animeImageURL
}


// Listen for a message from popup
chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        console.log(sender.tab ?
            "from a content script:" + sender.tab.url :
            "from the extension");
        if (request.type == "anime_info"){
            sendResponse(animeObj);
          }
    });
