const BASE_URL = `https://api.coinlore.net/api/tickers/`
 
function fetchCoins() { 
fetch(BASE_URL)
.then(res => res.json())
.then(data => { 
    data.data.forEach(renderCoin)
})

const counter = document.getElementById("counter")
const likesList = document.querySelector(".likes")
const dislikesList = document.querySelector(".likes")

const likesBtn = document.getElementById("likes")
const dislikesBtn = document.getElementById("dislikes")
likesBtn.addEventListener("click", likeNum) 
dislikesBtn.addEventListener("click", dislikeNum)


function likeNum(){
    const li = document.createElement('li')
    li.dataset.num = counter.innerText 
    li.innerHTML = `${counter.innerText} This market has been liked <span>1</span> time`
    likesList.appendChild(li, li) 

}
function dislikeNum(){
    const li = document.createElement('li')
    li.dataset.num = counter.innerText 
    li.innerHTML = `${counter.innerText} This market has been disliked <span>1</span> time`
    dislikesList.appendChild(li, li) 
 }
} 

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

   
   const price = document.createElement("p")
   const day = document.createElement("p")
   const week = document.createElement("p")
   const symbol = document.createElement("p")
   const supply = document.createElement("p")
   const cirSupply = document.createElement("p")
   const marketcap = document.createElement("p")
   const rank = document.createElement("p")
   const hour = document.createElement("p")
   const volume = document.createElement("p")

   
   price.innerText = coin.price_usd 
   day.innerText = coin.percent_change_24h 
   week.innerText = coin.percent_change_7d 
   symbol.innerText = coin.symbol 
   supply.innerText = coin.msupply 
   cirSupply.innerText = coin.tsupply 
   marketcap.innerText = coin.market_cap_usd
   rank.innerText = coin.rank 
   hour.innerText = coin.percent_change_1h
   volume.innerText = coin.volume24

   allCoinsBtn.addEventListener("click", () => { 
    coinContainer.innerHTML = ' '
    fetchCoins()
    })

    coinContainer.append(allCoinsBtn)
    coinContainer.append(aTag)
    coinContainer.append(symbol)
    coinContainer.append(price)
    coinContainer.append(rank)
    coinContainer.append(hour)
    coinContainer.append(day)
    coinContainer.append(week)
    coinContainer.append(supply)
    coinContainer.append(cirSupply)
    coinContainer.append(marketcap)
    coinContainer.append(volume)  
})

liTag.appendChild(aTag)
 coinContainer.appendChild(liTag)
} 

function init(){ 
const commentForm = document.getElementById('comment-form')
const commentInput = document.getElementById('comment-input')

commentForm.addEventListener("submit", (e) => { 
    e.preventDefault()
    const li = document.createElement('li')
    renderComment(commentInput.value)
    e.target.reset() 
})
const logInBtn = document.getElementById("log-in")
logInBtn.addEventListener("click", logInPage)

fetchCoins()
fetchComments()
}

function fetchComments(){ 
    fetch(`http://localhost:3000/comments`)
    .then(res => res.json())
    .then(comments => comments.forEach(comment => { 
        renderComment(comment.content)
    }))
}

function renderComment(comment){ 
    const commentList = document.getElementById('comment-list')
    const li = document.createElement('li')
    li.innerText = comment
    commentList.append(li)
}

function postComment(comment){ 
fetch(`http://localhost:3000/comments`, { 
    method: "POST",
    headers: { 
        "Content-type": "application/json",
        "Accept": "application/json" 
    },
    body: JSON.stringify({
        content: comment
    })
    })   
}

function logInPage(){ 
    const mainContainer = document.getElementById("main")
    mainContainer.innerHTML = ""

   const logInForm = document.createElement('form')
   logInForm.innerHTML += `
   <label>Username</label>
   <input type="text"> 
   <label>Password</label> 
   <input type="text">
   <input type="submit">` 

   logInForm.addEventListener("submit", logInUser)
   mainContainer.append(logInForm)
} 

function logInUser(e){ 
    e.preventDefault()
    const username = e.target.children[1].value 
    const password = e.target.children[3].value 
    
    fetch(`http://localhost:3000/users?name=${username}&password=${password}`)
    .then(res => res.json())
    .then(data => { 
        if(data.length === 0) { 
            alert('Incorrect')
        } else { 
            console.log(`Welcome ${data[0].name}!`)
        }
    
    })

}
init()
