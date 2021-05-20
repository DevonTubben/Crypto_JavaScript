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
    coinContainer.innerHTML = " "
    const aTag = document.createElement('a')
    aTag.innerText = coin.name
    const allCoinsBtn = document.createElement('button')
    allCoinsBtn.innerText = "All Coins"


    allCoinsBtn.addEventListener("click", () => { 
        coinContainer.innerHTML = ' '
        fetchCoins()
    })
    coinContainer.append(allCoinsBtn, " ", aTag)
})

liTag.appendChild(aTag)



coinContainer.appendChild(liTag)


} 


function init(){ 
const commentForm = document.getElementById('comment-form')
const commentInput = document.getElementById('comment-input')
const commentList = document.getElementById('comment-list')


commentForm.addEventListener("submit", (e) => { 
    e.preventDefault()
    const li = document.createElement('li')
    li.innerText = commentInput.value
    commentList.append(li)
    postComment(commentInput.value)
    e.target.reset()
})

fetchCoins()
}

function postComment(comment){ 
fetch(`http://localhost:3000`, { 
    method: "POST",
    headers: { 
        "content-type": "application/json",
        "Accept": "application/json" 
    },
    body: JSON.stringify({
        content: comment
    })   
    }).then(res => res.json())
    .then(console.log)
}

init()




fetchCoins() 
