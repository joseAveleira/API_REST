const aedes = require('aedes')();
const net = require('net');
const http = require('http');
const ws = require('websocket-stream');
const mqttPort = 1883;
const wsPort = 8888;

const MqttServer = net.createServer(aedes.handle);
const WsServer = http.createServer();

// Configurar el servidor WebSocket para trabajar con Aedes
ws.createServer({ server: WsServer }, aedes.handle);

function onNewClient(callback) {
  aedes.on('client', callback);
}


//mostrar por consola cada vez que se desconecta un cliente
aedes.on('clientDisconnect', function (client) {
  console.log(' - Client Disconnected: ', client.id);
});

// Función para manejar mensajes recibidos en un tópico específico
function handleMessages(topic, callback) {
  aedes.on('publish', function (packet, client) {
    if (packet.topic === topic && client) {
      const message = packet.payload.toString();
      callback(message, client.id);
    }
  });
}


module.exports = {
  startBroker: function () {
    MqttServer.listen(mqttPort, function () {
      console.log('MQTT server listening on port', mqttPort);
    });
    WsServer.listen(wsPort, function () {
      console.log('WebSocket server listening on port', wsPort);
    });
  },
  //funcion para publicar
  publish: function (topic, message) {
    aedes.publish({ topic: topic, payload: message });
  },
  //funcion para suscribirse
  subscribe: function (topic) {
    aedes.subscribe(topic, function () {
      console.log(' - Client suscribed to:', topic);
    });
  },
  handleMessages,onNewClient
  // ... Otras funciones para publicar y suscribirse ...
};