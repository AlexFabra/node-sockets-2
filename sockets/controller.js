const TicketControl = require("../models/ticket-control");

const ticketControl = new TicketControl();

const socketController = (socket) => {

    //console.log('Cliente conectado', socket.id);

    socket.on('disconnect', () => {
        //console.log('Cliente desconectado');
    });

    socket.on('mensaje', (payload, callback) => {
        //console.log(payload)
        socket.broadcast.emit('mensaje-recibido',payload)
        const msg = 'Date por contestado';
        callback(msg);
    });

}

module.exports = { socketController } 