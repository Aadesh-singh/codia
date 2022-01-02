// var chatBoxBtn = document.querySelector('.btn');
// var chatBox = document.querySelector('.chat-box');
// chatBoxBtn.addEventListner('click', function(){
//     chatBox.classList.toggle('visible');
// });

let chatBoxBtn = $('.btn');
let chatBox = $('.chat-box');

chatBoxBtn.click(function(){
    chatBox.toggleClass('visible');
});