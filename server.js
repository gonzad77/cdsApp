const express = require('express');
const cors = require('cors');
const fs = require('fs');

const { dbConnection } = require('./database/db.config');

class Server {

    constructor() {
        this.app  = express();
        this.port = process.env.PORT;

        // Database conexion
        this.conectDB();

        // Middlewares
        this.middlewares();

        // App routes
        this.routes();
    }

    conectDB = async () => {
        await dbConnection();
    }

    middlewares = () => {

        // CORS
        this.app.use( cors() );

        // Read and parse body
        this.app.use( express.json() );

        //Public dir
        this.app.use( express.static('public') );

        //Auth middlewares
        this.app.use(require('./middlewares/auth.validator'));
    }

    routes = () => {
        fs.readdirSync('./routes/').forEach((file) => {
            const routeName = file.split(".")[0];
            const route = `./routes/${file}`;

            this.app.use(`/${routeName}`, require(route));
        })
    }

    listen = () => {
        this.app.listen( this.port, () => {
            console.log(`Server running in port: ${this.port}` );
        });
    }

}

module.exports = Server;