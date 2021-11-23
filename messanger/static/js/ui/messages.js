`use strict`;

const btnSend = document.querySelector(`.btn-send`);
const textarea = document.querySelector(`.textarea`);
const selfMessage = document.querySelector(`.self-message`);
const blockMessages = document.querySelector(`.block-messages`)


let addHTMLforEmpty = () => {
    if (!document.querySelector(`#empty-textarea`)) {
        let newElem = document.createElement(`div`)
        newElem.id = `empty-textarea`
        newElem.innerHTML = 'Тут пусто!'+
                            '<br>'+
                            'Напишите первое сообщение...'
        blockMessages.prepend(newElem);
    }
}

let addHTMLforListMessages = (msgs) => {
    let messagesHTML = '';

    for (let index in msgs) {
        if (msgs[index].author == currentUserId) {
            messagesHTML += `<div class="block-message">
                                 <div class="self-message">
                                     ${msgs[index].text}
                                 </div>
                             </div>`;
        } else {
            messagesHTML += `<div class="block-message">
                                 <div class="other-message">
                                     ${msgs[index].text}
                                 </div>
                             </div>`;
        }
    }
    let containerMessages = document.createElement(`div`);
    containerMessages.className = `textarea-messages`
    containerMessages.innerHTML = messagesHTML;
    blockMessages.append(containerMessages);

    containerMessages.scrollTop = containerMessages.scrollHeight;
}

let addMessagesInArea = messages => {
    if (messages.length == 0) addHTMLforEmpty();
    else addHTMLforListMessages(messages);
}

let addNewMessageToHTML = (data, to) => {
    let textareaMessages = document.querySelector(`.textarea-messages`);
    let newSelfMessage = document.createElement(`div`);

    if (!textareaMessages) {
        newSelfMessage.className = `textarea-messages`;
        let newSelfMessageHTML = `<div class="block-message">
                                    <div class="${to}-message">
                                        ${data.message}
                                    </div>
                                </div>`;
        newSelfMessage.innerHTML = newSelfMessageHTML;
        document.querySelector(`#empty-textarea`).remove()
        blockMessages.append(newSelfMessage);

        textareaMessages = newSelfMessage
    } else {
        textareaMessages.insertAdjacentHTML(
            `beforeend`, 
            `<div class="block-message">
                <div class="${to}-message">
                    ${data.message}
                </div>
            </div>`
            );
    }
    textareaMessages.scrollTop = textareaMessages.scrollHeight;
}

let sendNotification = data => {
    let container = document.querySelector(`.container`);
    
    container.insertAdjacentHTML('afterbegin', `
    <div class="not-block">
        <div class="not-header">
            <div class="not-avatar"></div>
            <div class="not-text">Имя</div>
        </div>
        <div class="not-body">Новое сообщение...</div>
    </div>
    `)
    let notBlock = document.querySelector(`.not-block`);
    notBlock.addEventListener(`click`, () => {
        let selectedElem = document.querySelector(
            '.avatar-circle' +
            '[data-user-id="' +
            data.current_user +
            '"]' 
        );
        selectedElem.click();
    });
    setTimeout(() => notBlock.remove(), 5000);
}

let processNewMessage = (data, selectedChat) => {
    if (data.current_user == currentUserId) {
        addNewMessageToHTML(data, 'self');
    } else if (data.other_user == currentUserId) {
        if (selectedChat == data.chat_id) {
            addNewMessageToHTML(data, 'other');
        } else {
            sendNotification(data);
        }
    }
}

let btnSendEventListener = (socket) => {
    btnSend.addEventListener(`click`, elem => {

    if (textarea.textContent.trim()) {
        socket.send(JSON.stringify({
            'current_user': currentUserId,
            'other_user': otherUserId,
            'chat_id': selectedChatId,
            'message': textarea.textContent
        }))

        textarea.textContent = ``;
    }
    textarea.focus();
}) 
}

let shift = false;
textarea.addEventListener(`keydown`, event => {
    if (event.key == `Shift`) shift = true;
    if (event.key == `Enter` && shift == true) return;
    else if (event.key == `Enter`) {
        event.preventDefault();
        btnSend.click();
    }
})
textarea.addEventListener(`keyup`, event => {
    if (event.key == `Shift`) shift = false;
})