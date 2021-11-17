`use strict`;

//------------------------EventListenerForMessages----------------------------
const btnSend = document.querySelector(`.btn-send`);
const textarea = document.querySelector(`.textarea`);
const selfMessage = document.querySelector(`.self-message`);
const textareaMessages = document.querySelector(`.textarea-messages`);

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
//End------------------------ELForMessages----------------------------

//----------------------------------ELForAvatars---------------------------------
const avatarCircles = document.querySelectorAll(`.avatar-circle`);
for (let avatarCircle of avatarCircles) {
    avatarCircle.addEventListener(`click`, () => {
        avatarCircle.parentElement.classList.toggle(`selected`)
        for (let elem of avatarCircles) {

            if (elem != avatarCircle && 
                avatarCircle.parentElement.classList.contains(`selected`)) {
                elem.parentElement.classList.remove(`selected`)
            }
        }
    })
}
//End----------------------------------ELForAvatars---------------------------------
