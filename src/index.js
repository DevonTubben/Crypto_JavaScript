const BASE_URL = `https://api.coinlore.net/api/tickers/ (First 100 Coins)`

function fetchCoins() { 
fetch(BASE_URL)
.then(res => res.json())
.then(console.log)


}

function renderCoin(coin){ 
    console.log(renderCoin)
}

fetchCoins()