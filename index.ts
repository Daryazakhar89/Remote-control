import { httpServer } from './src/http_server/index';
import { WSS } from './src/ws_server';

const HTTP_PORT = 8181;
const WEBSOCKET_PORT = 8080;

httpServer.listen(HTTP_PORT, () => {
  console.log(`Start static http server on the ${HTTP_PORT} port!`);
});

const wss = new WSS();

wss.listen(WEBSOCKET_PORT);
console.log(`Start websocket server on the ${WEBSOCKET_PORT} port!`);
