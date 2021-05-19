const BASE_URL = `https://api.coinlore.net/api/tickers/`


// fetches data
function fetchCoins() { 
fetch(BASE_URL)
.then(res => res.json())
.then(data => { 
    console.log(data.data)
    data.data.forEach(renderCoin)
})


} 
//renders a single coin to the page 

function renderCoin(coin){ 
const coinContainer = document.getElementById("Coin-List")
const liTag = document.createElement('li')

const aTag = document.createElement('a')
aTag.href = '#' 
aTag.innerText = coin.name

liTag.appendChild(aTag)



coinContainer.appendChild(liTag)





} 

fetchCoins() 
