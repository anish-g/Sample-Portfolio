header = (profileData) => {
  document.getElementById("profileImage").src = profileData['avatar_url']
  document.getElementById("profileName").textContent = profileData['name']
  document.getElementById("profileBio").textContent = profileData['bio']
  document.getElementById("profileID").textContent = profileData['login']
  document.getElementById("profileID").href = profileData['html_url']
}

createRepo = (repoInfo) => {
  let project = document.getElementById('projects-container')
  let repoDiv = document.createElement('div')
  repoDiv.className = "repo-wrapper clearfix"
  let repoLink = document.createElement('a')
  repoDiv.appendChild(repoLink)
  repoLink.href = repoInfo['html_url']
  
  projectTitle = document.createElement('h3')
  projectTitle.className = "projectTitle"
  projectTitle.textContent = repoInfo['name']
  repoLink.appendChild(projectTitle)

  projectDesc = document.createElement('p')
  projectDesc.textContent = repoInfo['description']
  projectDesc.className = "projectDesc"
  repoLink.appendChild(projectDesc)

  fetch(repoInfo["languages_url"])
  .then(response => response.json())
  .then(function(lang) {
    langs_used = Object.keys(lang) 
    if (langs_used.length > 0) {
      projectLang = document.createElement('p')
      projectLang.textContent = "🔶 " + langs_used.join(', ')
      projectLang.className = "projectLang"
      repoLink.appendChild(projectLang)
    }
  })

  if (repoInfo["stargazers_count"] > 0) {
    projectStars = document.createElement('p')
    projectStars.textContent = "⭐ " + repoInfo["stargazers_count"]
    projectStars.className = "projectStars"
    repoLink.appendChild(projectStars)
  }

  project.appendChild(repoDiv)
}

displayRepos = (reposData) => {
  for (let i=0; i<reposData.length; i++) {
    createRepo(reposData[i])
  }
}

fetch('https://api.github.com/users/anish-g')
  .then(response => response.json())
  .then(function(profileData) {
    header(profileData)
  })

fetch('https://api.github.com/users/anish-g/repos')
  .then(response => response.json())
  .then(function(reposData) {
    displayRepos(reposData)
  })