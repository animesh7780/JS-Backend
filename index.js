require('dotenv').config()
const express = require('express')
const app = express()

const userData = {
    "login": "animesh7780",
    "id": 143063970,
    "node_id": "U_kgDOCIb7og",
    "avatar_url": "https://avatars.githubusercontent.com/u/143063970?v=4",
    "gravatar_id": "",
    "url": "https://api.github.com/users/animesh7780",
    "html_url": "https://github.com/animesh7780",
    "followers_url": "https://api.github.com/users/animesh7780/followers",
    "following_url": "https://api.github.com/users/animesh7780/following{/other_user}",
    "gists_url": "https://api.github.com/users/animesh7780/gists{/gist_id}",
    "starred_url": "https://api.github.com/users/animesh7780/starred{/owner}{/repo}",
    "subscriptions_url": "https://api.github.com/users/animesh7780/subscriptions",
    "organizations_url": "https://api.github.com/users/animesh7780/orgs",
    "repos_url": "https://api.github.com/users/animesh7780/repos",
    "events_url": "https://api.github.com/users/animesh7780/events{/privacy}",
    "received_events_url": "https://api.github.com/users/animesh7780/received_events",
    "type": "User",
    "site_admin": false,
    "name": "Animesh Kumar",
    "company": null,
    "blog": "",
    "location": "Bhagalpur, Bihar",
    "email": null,
    "hireable": null,
    "bio": null,
    "twitter_username": "animesh7780",
    "public_repos": 5,
    "public_gists": 0,
    "followers": 2,
    "following": 4,
    "created_at": "2023-08-24T05:58:29Z",
    "updated_at": "2024-09-16T09:11:02Z"
}

app.get('/user', (req, res) => {
    res.send(userData)
})

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.get('/twitter', (req, res) => {
    res.send('Hello Twitter!')
})

app.get('/login', (req, res) => {
    res.send('Hello Login')
})

app.get('/youtube', (req, res) => {
    res.send('Padh na')
})

app.listen(process.env.PORT, () => {
    console.log(`Example app listening on port ${process.env.PORT}!`)
})
