`use strict`;

const btnSend = document.querySelector(`.btn-send`);
const textarea = document.querySelector(`.textarea`);
const selfMessage = document.querySelector(`.self-message`);
const textareaMessages = document.querySelector(`.textarea-messages`);
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
}

let addMessagesInArea = messages => {
    if (messages.length == 0) addHTMLforEmpty();
    else addHTMLforListMessages(messages);
}

btnSend.addEventListener(`click`, elem => {
    if (textarea.textContent.trim()) {
        let newSelfMessage = document.createElement(`div`);
        newSelfMessage.classList.add(`block-message`)
        let newSelfMessageHTML = `<div class="self-message">
                                    ${textarea.textContent}
                                </div>`;
        newSelfMessage.innerHTML = newSelfMessageHTML;
        textareaMessages.append(newSelfMessage);


        textarea.textContent = ``;

        textareaMessages.scrollTop = textareaMessages.scrollHeight
    }
    textarea.focus();
})

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