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


    
    const pTag = document.createElement('p')
    pTag.innerText = coin.price_usd
    const dayTag = document.createElement('day')
    dayTag.innerText = coin.percent_change_24h
    const weekTag = document.createElement('week')
    weekTag.innerText = coin.percent_change_7d


    allCoinsBtn.addEventListener("click", () => { 
        coinContainer.innerHTML = ' '
        fetchCoins()
    })
    coinContainer.append(allCoinsBtn, " ", aTag)
    coinContainer.append(aTag, pTag)
    coinContainer.append(pTag, dayTag)
    coinContainer.append(dayTag, " ", weekTag)

    
    
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


const likeBtn = document.getElementById("likes")
likeBtn.addEventListener("click", likeNum) 


function likeNum(){
    const li = document.createElement('li')
    ul.dataset.num = counter.innerText 
    li.innerHTML = `${counter.innerText} has been liked <span>1</span> time`
    likesList.appendChild('li')
}




 
}
init()
