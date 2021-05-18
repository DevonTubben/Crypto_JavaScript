const BASE_URL = `https://api.coinlore.net/api/tickers/`



function fetchCoins() { 
fetch(BASE_URL)
.then(res => res.json())
.then(console.log)


}

function renderCoin(coin){ 
const coinContainer = document.getElementById("coin-list")
const litag = document.createElement('li')
const imageTag = document.createElement('img')
imageTag.src = coin.url
const pTag = document.createElement('p')
pTag.innerText = coin.name
liTag.append(imageTag, pTag)
coinContainer.appendChild(liTag)
}

fetchCoins()