import WebSocket from 'ws';
import url from 'url';
import security from './security';

let wss = null;

const listen = server =>{
    wss = new WebSocket.Server({
        path: '/ws/dashboard',
        maxPayload : 1024,
        backlog: 100,
        verifyClient: verifyClient
    });
    wss.on('connection', onconnection);
    wss.broadcast = broadcastToAll;
};

const getTokenFromRequestPath = requestPath => {
    try {
        const urlObj = url.parse(requestPath, true);
        return urlObj.query.token;

    }catch (e){
        return null;
    }
};

const verfiyClient = (info, done) => {
    if (security.DEVELOPER_MODE === true){
        done(true);
    } else {
        const requestPath = info.req.url;
        const token = getTokenFromRequestPath(requestPath);
        security.verifyToken(token).then(tokenDecoded => {
            done(true)
        }).catch(errr => {
            done(false, 401)
        });
    }
};

const onConnection = (ws, req) => {
    ws.on('error',() => {});
};
const broadCastToAl = data => {
    wss.clients.forEach(client => {
        if (client.readyState === WebSocket.OPEN) {
            client.send(data, error => {});
        }
    })
};

const send = ({event, payload}) => {
    wss.broadcast(JSON.stringify({event, payload}));
};

const events = {
    ORDER_CREATED: 'order.created',
    THEME_INSTALLED: 'theme.installed'
};

export default {
    listen: listen,
    send: send,
    events: events
}