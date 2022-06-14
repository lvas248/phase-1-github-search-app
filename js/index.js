document.addEventListener('DOMContentLoaded',()=>{



    let userList = document.querySelector('#user-list')
    let repoList = document.querySelector('#repos-list')
    let form = document.querySelector('form')
    
    form.addEventListener('submit', (e)=>{
        e.preventDefault()
        userList.innerHTML = ""
        let searchInput = e.target.search.value
        form.reset()
        fetch(`https://api.github.com/search/users?q=${searchInput}`)
        .then(res => res.json())
        .then(data => {
            let searchResults = data.items
            searchResults.forEach((user)=>{
                let div = document.createElement('div')
                div.className = "user"

                div.addEventListener('click', ()=>{
                    pullUserRepos(e, user.login)
                })

                let p = document.createElement('p')
                p.textContent = user.login
                let img = document.createElement('img')
                img.src = user.avatar_url
                let a = document.createElement('a')
                a.textContent = "Click here to view profile"
                a.href = user.html_url

                div.append(p,img,a)
                userList.append(div)
            })
        })

        form.reset()
    })
})



function pullUserRepos(event, user){
    fetch(`https://api.github.com/users/${user}/repos`)
    .then(res => res.json())
    .then(data => {
 
        for(let element in data){
            let innerLayer = data[element]
            for(let details in innerLayer){
                if(details === "name"){
                let li = document.createElement('li')
                let a = document.createElement('a')
                a.href = innerLayer["html_url"]
                a.textContent = innerLayer["name"]
                li.appendChild(a)
                console.log(li)
                document.querySelector('#repos-list').append(li)
            }

        }
    }      
    })
}