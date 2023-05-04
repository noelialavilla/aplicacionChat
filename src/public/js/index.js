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