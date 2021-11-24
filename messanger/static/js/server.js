`use strict`;

let getChatId = (currentUserId, userId) => {
    return fetch(
        `${window.location.origin}/`+
        `api/`+
        `chat_list?`+
        `users=${currentUserId}&`+
        `users=${userId}`
        )
        .then(response => response.json())
        .then(resp => resp.id)
}

let getListMessages = chatId => {
    return fetch(
        `${window.location.origin}/`+
        `api/`+
        `messages?`+
        `chat=${chatId}&`
        )
        .then(response => {
            return response.json();
        })
}

let createChat = users => {
    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            "users": users
        })
    }
    fetch(`${window.location.origin}/api/chat_create/`, options)
    .then(response => {
        console.log(response)
    }).catch(response => console.log(response))
}