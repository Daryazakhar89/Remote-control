
import { pipeline } from 'stream/promises';
import { Duplex, Transform } from 'stream';
import { WebSocketServer, createWebSocketStream, WebSocket } from 'ws';

import { Commander } from '../../Commander';

interface WSSInterface {
  listen: () => void;
}

export class WSS {
  wss: WebSocketServer;
  ws: WebSocket;
  duplex: Duplex;

  constructor() {
    this.wss = null;
    this.ws = null;
    this.duplex = null;
  }

  public listen(port: number) {
    this.wss = new WebSocketServer({ port });

    this.wss.on('connection', async (ws: WebSocket) => {
      this.ws = ws;
      this.duplex = createWebSocketStream(ws, { encoding: 'utf-8', decodeStrings: false });

      this.duplex.on('error', console.error);

      const transformStream = new Transform({
        async transform(data, _, callback) {
          console.log(data);

          const [command, ...args]: [string, string] = data.split(' ');
          const numericArgs = args.map((arg: string) => parseInt(arg, 10));
          const result = await Commander.runCommand(command, numericArgs);

          result ? callback(null, `${command}_${result}`) : callback(null, data.replace(/ /g, '_'));
        },
        encoding: 'utf-8',
        decodeStrings: false,
      });

      await pipeline(this.duplex, transformStream, this.duplex);

      ws.on('error', console.error);

      ws.on('close', function () {
        console.log('The connection has been successfully closed');
      });

    });
  }
}
