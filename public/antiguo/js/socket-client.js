const lblOnline = document.querySelector('#lblOnline');
const lblOffline = document.querySelector('#lblOffline');
const txtMsg = document.querySelector('#txtMsg');
const btnSend = document.querySelector('#btnSend');

const clientSocket = io();

clientSocket.on('connect',()=>{
    //console.log('conectado')
    lblOffline.style.display='none';
    lblOnline.style.display='';
})

clientSocket.on('disconnect',()=>{
    //console.log('desconectado')
    lblOffline.style.display='';
    lblOnline.style.display='none';
})

clientSocket.on('mensaje-recibido',(payload)=>{
    console.log(payload)
})

btnSend.addEventListener('click',()=>{
    const msg=txtMsg.value;
    const payload = {
        msg,
        id:'jeje',
        date: new Date()
    }
    clientSocket.emit('mensaje',payload, (msg)=>{
        console.log('contestación del server:', msg)
    })
});

