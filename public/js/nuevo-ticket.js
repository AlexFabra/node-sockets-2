
const lblNuevoTicket = document.querySelector('#lblNuevoTicket')
const btnCreaTicket = document.querySelector('button')

const socket = io();

socket.on('connect', () => {
    btnCreaTicket.disabled=false;
});

socket.on('disconnect', () => {
    btnCreaTicket.disabled=true;
});

socket.on('ultimo-ticket',(payload)=>{
    lblNuevoTicket.innerText='Ticket '+payload;
})

btnCreaTicket.addEventListener( 'click', () => {

    socket.emit( 'siguiente-ticket', null, ( ticket ) => {
        lblNuevoTicket.innerText=ticket;
    });

});