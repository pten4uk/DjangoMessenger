let getChat
fetch(`http://127.0.0.1:8000/api/messages?format=json`)
    .then(response => {
        return response.json()
    }).then(data => {
        console.log(data)
    })