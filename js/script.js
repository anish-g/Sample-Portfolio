header = (data) => {
  document.getElementById("profileImage").src = data['avatar_url']
  document.getElementById("profileName").textContent = data['name']
  document.getElementById("profileBio").textContent = data['bio']
  document.getElementById("profileID").textContent = data['login']
  document.getElementById("profileID").href = data['html_url']
}

displayRepos = (data) => {

}

fetch('https://api.github.com/users/anish-g')
  .then(response => response.json())
  .then(function(data) {
    console.log(data)
    header(data)
  })

fetch('https://api.github.com/users/anish-g/repos')
  .then(response => response.json())
  .then(function(data) {
    console.log(data)
    displayRepos(data)
  })