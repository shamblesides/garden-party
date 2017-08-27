const api = require('./api');
const config = require('./config');
const express = require('express');
const http = require('http');
const logger = require('./logger');
const socketio = require('socket.io');
const web = require('./serve-web');

logger.debug('Starting garden party server...');

let app = express();
let server = http.createServer(app);
app.use('/', web);
socketio(server, { serveClient: false })
    .on('connection', api);

let listener = server.listen(config.get('port'), (err) => {
    if (err) logger.error(err);
    else logger.info('Ready!');
});

module.exports.stop = function stop(callback = noop) {
    if (!listener) {
        logger.warn('No server to stop.');
        return callback('No server to stop.');
    }

    listener.close((err) => { 
        if (err) {
            logger.error(err);
            return callback(err);
        }
        listener = null;
        logger.notice('Stopped successfully.');
        callback(null);
    });
};

process.on('SIGTERM', ()=> onKill('SIGTERM') ); //kill (terminate)
process.on('SIGINT', ()=> onKill('SIGINT') ); //Ctrl+C (interrupt)
function onKill(reason = 'No reason given') {
    logger.notice(`Attempting graceful shutdown: ${reason}`);
    stop();
}