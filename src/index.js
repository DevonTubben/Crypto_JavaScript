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

aTag.addEventListener("click", () => { 
    coinContainer.innerHTML = ""
    const aTag = document.createElement('a')
    aTag.innerText = coin.name
    const allCoinsBtn = document.createElement('button')
    allCoinsBtn.innerText = "All Coins"


    allCoinsBtn.addEventListener("click", () => { 
        coinContainer.innerHTML = ' '
        fetchCoins()
    })
    coinContainer.append(allCoinsBtn, aTag)
})

liTag.appendChild(aTag)



coinContainer.appendChild(liTag)


} 

fetchCoins() 
