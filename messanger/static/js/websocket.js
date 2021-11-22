`use strict`;

let chatSocket = new WebSocket(`ws://${window.location.host}/connect/`);

chatSocket.onopen = (e) => {
    console.log(`Соединение установлено`);
    btnSendEventListener(e.target);
}

chatSocket.onclose = () => {
    console.log(`Соединение закрыто`);
}
chatSocket.onerror = (e) => {
    console.log(`Ошибка соединения ${e}`);
}
chatSocket.onmessage = (e) => {
    console.log('Новое сообщение');
    data = JSON.parse(e.data);
    console.log(data);
    let to = (id => {
        if (data.current_user == id) return `self`;
        else if (data.other_user == id) return `other`;
    })(currentUserId);
    processNewMessage(data, selectedChatId, to);
}