function find() {
    const username = document.getElementById('username').value;
    
    fetch(`https://api.github.com/users/${username}`)
    .then(response => response.json())
    .then(data =>{
        console.log(data);
        if(data.message == 'Not found'){
            alert('User Not Found!!')
        }
        else{
            const profile = document.getElementById('details');
            profile.innerHTML =`
                <h2>${data.name}</h2>
                <img src="${data.avatar_url}" alt="" style="width: 130px; border-radius: 100px; border: 3px solid white;">
                <p>Bio : ${data.bio}</p>
                <p>Followers : ${data.followers}</p>
                <p>Following : ${data.following}</p>
                <p>Public Repositories : ${data.public_repos}</p>
            `
        }
    })
    .catch((err) => {
        console.log("Catch" + err.message);
    });

    fetch(`https://api.github.com/users/${username}/repos`)
    .then(response => response.json())
    .then(data =>{
        console.log(data);
        const repoDiv = document.getElementById('repo');
        repoDiv.innerHTML=`<h2>Repositories</h2>`

        data.forEach(repos =>{
            const repoLink = document.createElement('a');
            repoLink.href = repos.html_url;
            repoLink.textContent =repos.name;
            repoLink.target = "_blank";
            repoDiv.appendChild(repoLink);
            repoDiv.appendChild(document.createElement('br'));
        })
        
    })

    document.getElementById('username').value = '';
}



