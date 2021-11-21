`use strict`;

let currentUserId = document.querySelector(`#current-user`).dataset.userId;


let dynamicChangeSelect = avatarCircle => {
    avatarCircle.parentElement.classList.toggle(`selected`)

    for (let elem of avatarCircles) {

        if (elem != avatarCircle && 
            avatarCircle.parentElement.classList.contains(`selected`)) {
            elem.parentElement.classList.remove(`selected`)
        }
    }
    blockMessages.innerHTML = ``;
}

const avatarCircles = document.querySelectorAll(`.avatar-circle`);
for (let avatarCircle of avatarCircles) {
    avatarCircle.addEventListener(`click`, async () => {
        dynamicChangeSelect(avatarCircle);

        let userId = avatarCircle.dataset.userId;
        let chatId = await getChatId(currentUserId, userId);

        if (chatId) {
            let messages = await getListMessages(chatId);
            addMessagesInArea(messages);

            if (!avatarCircle.parentElement.classList.contains(`selected`)) {
                blockMessages.innerHTML = ``;
            } else {
                let socket = chatSocket(chatId);
                socketEventListeners(socket);
                socket.onopen = (e) => {
                    console.log(`Соединение установлено`);
                    btnSendEventListener(e.target);
                }
            }
        }
    })
}
