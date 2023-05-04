const socket = io();

let user;
const chatbox = document.getElementById('chatBox');
Swal.fire({
    title: 'Identificate',
    input: 'text',
    text: 'Ingresa tu nombre de usuario: ',
    inputValidator: (value) => {
        return !value && "El nombre de usuario es obligatorio."
    },
    allowOutsideClick: false,
    allowEscapeKey: false
}).then(result =>{
    user = result.value;
});

chatbox.addEventListener('keyup', evt =>{
    if(evt.key ==='Enter'){
        if(chatbox.value.trim().length >0){
            socket.emit('message', {user, message: chatbox.value});
        }
        chatbox.value='';
    }
});

socket.on('messageLogs', data=>{
    let log = document.getElementById('messageLogs');
    let messages='';
    data.forEach(message =>{
        messages +=`${message.user} dice: ${message.message}<br/>`;
    });
    log.innerHTML=messages;
})