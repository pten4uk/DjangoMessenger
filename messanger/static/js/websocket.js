`use strict`;

let chatSocket = chatId => {
    return new WebSocket(`ws://${window.location.host}/ws/chat/${chatId}/`);
};

let socketEventListeners = (socket) => {
    socket.onclose = () => {
        console.log(`Соединение закрыто`);
    }
    socket.onerror = (e) => {
        console.log(`Ошибка соединения ${e}`);
    }
    socket.onmessage = (e) => {
        console.log('Новое сообщение');
        data = JSON.parse(e.data);
        console.log(data);
        let to = (id => {
            if (data.user_id == id) return `self`;
            return `other`;
        })(currentUserId);
        addReceivedMessageToHTML(data, to);
    }
}