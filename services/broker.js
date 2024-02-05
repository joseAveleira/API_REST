const aedes = require('aedes')();
const net = require('net');
const http = require('http');
const ws = require('websocket-stream');
const mqttPort = 1883;
const wsPort = 8888;
const MqttServer = net.createServer(aedes.handle);
const WsServer = http.createServer();


//mostrar por consola cada vez que se publica un mensaje
aedes.on('publish', function (packet, client) {
    if (client) {
        console.log(' - Message Published: ', packet.topic);
    }
});

//mostrar por consola cada vez que se desconecta un cliente
aedes.on('clientDisconnect', function (client) {
    console.log(' - Client Disconnected: ', client.id);
});
//mostrar por consola cada vez que se conecta un cliente
aedes.on('client', function (client) {
    console.log(' - New Client: ', client.id);
});
//mostrar por consola cada vez que se suscribe un cliente
aedes.on('subscribe', function (subscriptions, client) {
    console.log(' - Client Subscribed:', subscriptions);
});


module.exports = {
    startBroker: function () {
      MqttServer.listen(mqttPort, function () {
        console.log('Servidor MQTT en el puerto', mqttPort);
      });
      WsServer.listen(wsPort, function () {
        console.log('Envío de mensajes MQTT por WebSocket puerto', wsPort);
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
    }
  
  };
  