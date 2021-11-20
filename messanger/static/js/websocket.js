`use strict`;

let createChatSocket = (currentUserId, userId) => {
    let chatSocket = new WebSocket(`ws://${window.location.host}/ws/chat/`)
};