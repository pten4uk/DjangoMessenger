`use strict`;

let currentUserId = document.querySelector(`#current-user`).dataset.userId;
let otherUserId;
let selectedChatId;


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

        otherUserId = avatarCircle.dataset.userId;
        selectedChatId = await getChatId(currentUserId, otherUserId);

        if (selectedChatId) {
            let messages = await getListMessages(selectedChatId);
            addMessagesInArea(messages);

            if (!avatarCircle.parentElement.classList.contains(`selected`)) {
                selectedChatId = null;
                blockMessages.innerHTML = ``;
            }
        } else if (avatarCircle.parentElement.classList.contains(`selected`)) {
            let newChat = await createChat([currentUserId, otherUserId]);
            selectedChatId = newChat.chat_id;
            addHTMLforEmpty();
        }
    })
}
