const socket = io();
//const name = prompt('Vui lòng cho biết tên của bạn');
//const name = document.getElementById('name');


//Xử lý tin nhắn
const chatForm = document.querySelector('#chat-form');
const chatMes = document.querySelector('#chat-mes');
chatForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const message = chatMes.value
    if (message == '') {
        alert('Please enter message')
    }
    else {
        socket.emit('on-chat', {
            name,
            message: message
        });
        chatMes.value = ''
    }

})

const messages = document.querySelector('#messages');
//Đồng bộ hóa
socket.on('user-chat', (message) => {
    const chatItem = document.createElement('li');
    chatItem.textContent = `${message.name}: ${message.message}`;
    messages.appendChild(chatItem);
});


document.getElementById('file').addEventListener('change', function () {

    const reader = new FileReader();
    reader.onload = function () {
        const bytes = new Uint8Array(this.result);
        socket.emit('image', bytes);
    };
    reader.readAsArrayBuffer(this.files[0]);

}, false);