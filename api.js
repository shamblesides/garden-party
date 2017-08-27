const logger = require('./logger');
const config = require('./config');
const name = require('./name');

const safecall = function(callback) {
    if (typeof callback !== 'function') return (function(){});
    return function() {
        try {
            callback.apply(callback, arguments);
        }
        catch(ex) {}
    }
};

module.exports = function onConnection(socket) {
    let query = socket.handshake.query;
    let farmerName = name();
    socket.emit('welcome', farmerName);
    console.log(farmerName, 'has joined');

    socket.use((packet, next) => {
        // logging
        let packetType = packet[0];
        let packetContent = JSON.stringify(packet[1]);
        logger.info(`RECV (${ip}): ${rpCode}/"${packetType}" ${packetContent}`);
        next();
    });

    socket.use((packet, next) => {
        // sanitize callback function
        packet[2] = safecall(packet[2]);
        next();
    })
    
    socket.on('move', (data, callback) => {
        callback(null, data.msg);
    });
};
