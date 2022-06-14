const http = require("http");
const express = require("express");
const socketio = require("socket.io");
const path = require("path");
const Sockets = require("./sockets");

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;

    // Http Server
    this.server = http.createServer(this.app);

    // Configuracion de sockets
    // Configuracion de socket server
    this.io = socketio(this.server, {
      /*Server configs*/
    });
  }

  middlewares() {
    // Desplegar el directorio público
    this.app.use(
      express.static(path.resolve(__dirname, "../public"))
    );
  }

  configurarSockets() {
    new Sockets(this.io);
  }

  execute() {
    // Inicializar middlewares
    this.middlewares();

    // Inicializar sockets
    this.configurarSockets();

    // Inicializar server
    this.server.listen(this.port, () => {
      console.log("Server corriendo en puerto:", this.port);
    });
  }
}

module.exports = Server;
