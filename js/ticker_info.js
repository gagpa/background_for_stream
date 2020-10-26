let tickerTitleElem = document.querySelector('.ticker__title span');
let tickerDataElem = document.querySelector('.ticker__data span');
const request = new XMLHttpRequest();
const url = 'http://api_riot.local/tft/match_per_stream/ofry';

function insertTickerInfo() {
    let response = request.responseText;
    let responseJson = JSON.parse(response);

    let tickerTitle = responseJson.data.tickerTitle;
    let tickerData = responseJson.data.tickerData;
    if (!tickerTitleElem.textContent){
        console.log('1');
        tickerTitleElem.textContent = tickerTitle;
    }
    tickerDataElem.textContent = tickerData.length ? tickerData : 'Первая игра';
}
function sendRequest() {
    request.open('GET', url);
    request.setRequestHeader('Content-Type', 'application/x-www-form-url');
    request.addEventListener("readystatechange", () => {
        if (request.readyState === 4 && request.status === 200) {
            insertTickerInfo();
        }
    });

    request.send();
}

sendRequest()
setInterval(sendRequest, 10000)
