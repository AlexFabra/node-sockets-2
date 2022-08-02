const path = require('path');
const fs = require('fs');

LIMITE_ULTIMOS_TIKETS = 4;

class Ticket {
    constructor(numero, escritorio) {
        this.numero = numero;
        this.escritorio = escritorio;
    }
}


class TicketControl {
    constructor() {
        this.ultimo = 0;
        this.fechaActual = new Date().getDate();
        this.tickets = [];
        this.ultimos = [];


        this.init();
    }

    get toJson() {
        return {
            ultimo: this.ultimo,
            fechaActual: this.fechaActual,
            tickets: this.tickets,
            ultimos: this.ultimos
        }
    }

    init() {
        const data = require('../db/data.json');
        if (data.fechaActual == this.fechaActual) {
            this.tickets = data.tickets;
            this.ultimo = data.ultimo;
            this.ultimos = data.ultimos;
        } else {
            //es otro día 
            this.saveDb();
        }
    }

    saveDb() {
        const dbPath = path.join(__dirname, '../db/data.json');
        fs.writeFileSync(dbPath, JSON.stringify(this.toJson))
    }

    siguienteTicket() {
        this.ultimo += 1;
        const ticket = new Ticket(this.ultimo, null);
        this.tickets.push(ticket);

        this.saveDb();
        return 'Ticket ' + ticket.numero;
    }

    atenderTicket(escritorio) {

        if (this.tickets.length === 0) {
            return null
        }
        
        const ticket = this.tickets.shift();

        ticket.escritorio = escritorio;

        this.ultimos.unshift(ticket);

        if (this.ultimos.length > LIMITE_ULTIMOS_TIKETS) {
            this.ultimos.splice(-1, 1);
        }

        this.saveDb();

        return ticket;

    }

}

module.exports = TicketControl;