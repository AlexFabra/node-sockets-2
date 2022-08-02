const lblEscritorio = document.querySelector('h1');
const btnAtiendeTicket = document.querySelector('button');
const lblTicket = document.querySelector('small');
const divAlert = document.querySelector('.alert');
const lblPendientes = document.querySelector('#lblPendientes');


const searchParams = new URLSearchParams(window.location.search);

if (!searchParams.has('escritorio')) {
    window.location = 'index.html';
    throw new Error('El escritorio es obligatorio');
}

const escritorio = searchParams.get('escritorio');
lblEscritorio.innerText = escritorio;

divAlert.style.display = 'none';

const socket = io();

socket.on('connect', () => {
    btnAtiendeTicket.disabled = false;
});

socket.on('disconnect', () => {
    btnAtiendeTicket.disabled = true;
});

socket.on('tickets-pendientes', (payload) => {
    if (payload === 0) {
        lblPendientes.style.display = 'none';
    } else {
        lblPendientes.style.display = '';
        divAlert.style.display = 'none';
        lblPendientes.innerText = payload;
    }
})

btnAtiendeTicket.addEventListener('click', () => {

    socket.emit('atender-ticket', { escritorio }, ({ ok, ticket, msg }) => {

        if (!ok) {
            lblTicket.innerText = "nadie";
            return divAlert.style.display = '';
        }

        lblTicket.innerText = "Ticket " + ticket.numero;

    })

});