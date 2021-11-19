let getChatId = (currentUserId, userId) => {
    return fetch(
        `${window.location.origin}/`+
        `api/`+
        `chat_list?`+
        `users=${currentUserId}&`+
        `users=${userId}`
        )
        .then(response => {
            return response.json()
        })
}