import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.0.2/firebase-app.js'
import { getDatabase, ref, get, set, push,onValue, remove } from 'https://www.gstatic.com/firebasejs/9.0.2/firebase-database.js'


const appSettings = {
    databaseURL : 'https://pizzaviews-default-rtdb.asia-southeast1.firebasedatabase.app/'
}

const app = initializeApp(appSettings)
const db = getDatabase(app)


const postBtn = document.getElementById('postBtn')
const tweetInp = document.getElementById('tweetInp')
const Views = document.querySelector('.PizzaViews')

let alltweets = []

// document.addEventListener('DOMContentLoaded', () => {
//     const username = document.getElementById('userId').value
//     console.log(username)
//     onValue(ref(db,'users/'+username+'/pizzaviews'), (snapshot) => {
//         if(!snapshot.val()){
//             console.log('no data')  
//         } else {
//             let tweets = Object.entries(snapshot.val())
//             console.log(tweets)
//             clearHTML()
//             for(let i=0; i < tweets.length ; i++){
//                 console.log(tweets[i])
//                 addToPage(tweets[i])
//             }
//         }
//     })
// })

document.addEventListener('click', (e) => {
    const uuid = e.target.dataset.uuid
    if(e.target.classList.contains('fa-heart')){
        e.target.classList.remove('fa-regular')
        e.target.classList.add('fa-solid')

        const likeRef = ref(db,'users/'+uuid+'/likes')
        const likedRef = ref(db,'users/'+uuid+'/liked')
        get(likedRef).then((snapshot) => {
            if(snapshot.val() == false){
                set(likedRef, true)
                set(likeRef, snapshot.val()+1)
            } else {
                set(likedRef, false)
                set(likeRef, snapshot.val()-1)
            }
        })
    } 
    if(e.target.classList.contains('fa-comment')){
        e.target.classList.remove('fa-regular')
        e.target.classList.add('fa-solid')

        const commentRef = ref(db,'users/'+uuid+'/comments')
        get(commentRef).then((snapshot) => {
                console.log(snapshot.val())
                set(commentRef, snapshot.val()+1)
        })
    }
    if(e.target.classList.contains('fa-retweet')){
        e.target.classList.remove('fa-regular')
        e.target.classList.add('fa-solid')
        const retweetRef = ref(db,'users/'+uuid+'/retweets')
        get(retweetRef).then((snapshot) => {
                console.log(snapshot.val())
                set(retweetRef, snapshot.val()+1)
        })
    }
    if(e.target.classList.contains('fa-trash')){
        const trashRef = ref(db,'users/'+uuid+'userName')
        const username = document.getElementById('userId').value
        get(trashRef).then((snapshot) => {
            if(snapshot.val() == username){
                const shareRef = ref(db,'users/'+uuid)
                    remove(shareRef)
            } else {
                alert("You can't delete this post")
            }
    })
}
})

let tweets2 = []

postBtn.addEventListener('click',() => {
    const username = document.getElementById('userId').value
    push(ref(db, 'users/'), {"pizzaView": tweetInp.value,likes:0,comments:0,retweets:0,shares:0,liked:false, "userName": username})
    tweetInp.value = ""

})



onValue(ref(db,'users'), (snapshot) => {
    if(!snapshot.val()){
        Views.innerHTML = "<center>No items yet</center>"
    } else { 
        let tweets = Object.entries(snapshot.val())
        clearHTML()
    
        for (let i = tweets.length - 1; i >= 0; i--) {
            const tweet = tweets[i];
            addToPage(tweet);
            tweets2.push(Object.keys(tweet));
        }
    }
    
})


console.log(tweets2)

function clearHTML(){
    Views.innerHTML = ""
}


function addToPage(tweet){
    let x 
    x = tweet[1]
    const pizzaView = document.createElement('div')
    Views.innerHTML += `
        <div class="PizzaView">
            <div class="profile-image">
                <img src="images/${x.userName}.jpeg" alt="pizzaa">
            </div>
            <div class="View-text">
                <h3>${x.userName}</h3>
                
                <p>${x.pizzaView}</p>
                <div class = "reactions">
                
                <span class="tweet-reatction">
                    <i class="fa-regular fa-heart" data-uuid = "${tweet[0]}"></i>
                    ${x.likes}
                </span>
                <span class="tweet-reatction">
                    <i class="fa-regular fa-comment" data-uuid = "${tweet[0]}">
                    </i>
                    ${x.comments}
                </span>
                <span class="tweet-reatction">
                    <i class="fa-regular fa-retweet" data-uuid = "${tweet[0]}"></i>
                    ${x.retweets}
                </span>
                <span class="tweet-reatction">
                    <i class="fa-regular fa-trash" data-uuid = "${tweet[0]}"></i>
                </span>
                </div>
                <div id="${tweet[0]}>
                
                </div>
            </div>
        </div>

    `   
    }

