function Ticker() {
    let tickerTitleElem = document.querySelector('.ticker__title span');
    let tickerDataElem = document.querySelector('.ticker__data span');
    const REQUEST = new XMLHttpRequest();
    let url = 'http://api_riot.local/tft/score/ofry';

    function insertTickerInfo() {
        let response = REQUEST.responseText;
        let responseJson = JSON.parse(response);

        let tickerTitle = responseJson.data.tickerTitle;
        let tickerData = responseJson.data.tickerData;
        if (!tickerTitleElem.textContent) {
            tickerTitleElem.textContent = tickerTitle;
        }
        tickerDataElem.textContent = tickerData.length ? tickerData : 'Первая игра';
    }


    this.sendRequest = function () {
        REQUEST.open('GET', url);
        REQUEST.setRequestHeader('Content-Type', 'application/x-www-form-url');
        REQUEST.addEventListener('readystatechange', () => {
            if (REQUEST.readyState === 4 && REQUEST.status === 200) {
                insertTickerInfo();
            }
        });

        REQUEST.send();
    }
}

let ticker = new Ticker();
ticker.sendRequest();
setInterval(ticker.sendRequest, 10000)
