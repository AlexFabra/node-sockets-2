const TicketControl = require("../models/ticket-control");

const ticketControl = new TicketControl();

const socketController = (socket) => {

    //Cuando el cliente se conecte se mandarán estos eventos:
    socket.emit('ultimo-ticket', ticketControl.ultimo);
    socket.emit('ultimos-tickets', ticketControl.ultimos);
    socket.emit('tickets-pendientes', ticketControl.tickets.length);

    socket.on('siguiente-ticket', (payload, callback) => {
        const siguiente = ticketControl.siguienteTicket();
        callback(siguiente);
        socket.broadcast.emit('tickets-pendientes', ticketControl.tickets.length);
    })

    socket.on('atender-ticket', ({ escritorio }, callback) => {

        if (!escritorio) {
            return callback({
                ok: false,
                msg: 'el escritorio es obligatorio'
            })
        }

        const ticket = ticketControl.atenderTicket(escritorio);
        socket.broadcast.emit('ultimos-tickets', ticketControl.ultimos);
        socket.emit('tickets-pendientes', ticketControl.tickets.length);
        socket.broadcast.emit('tickets-pendientes', ticketControl.tickets.length);

        if (!ticket) {
            callback({
                ok: false,
                msg: 'ya no hay tickets pendientes'
            })

        } else {
            callback({
                ok: true,
                ticket
            })
        }

    })

    socket.on('disconnect', () => {
        //console.log('Cliente desconectado');
    });

}

module.exports = { socketController } 