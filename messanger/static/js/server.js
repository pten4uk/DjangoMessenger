`use strict`;

let csrftoken = document.cookie.split('=')[1];

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

let createChat = async users => {
    toSelf = users[0] == users[1];
    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "X-CSRFToken": csrftoken
        },
        body: JSON.stringify({
            "users": users,
            "to_self": toSelf
        })
    }
    return fetch(`${window.location.origin}/api/chat_create/`, options)
    .then(response => response.json())
    .then(json => json)
}