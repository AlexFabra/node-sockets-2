const path = require('path');
const fs = require('fs');

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
        const dbPath = path.join(__dirname,'../db/data.json');
        fs.writeFileSync(dbPath,JSON.stringify(this.toJson))
    }
}

module.exports = TicketControl;