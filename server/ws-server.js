import { WebSocketServer } from "ws";

const PORT = 8081;
const wss = new WebSocketServer({ port: PORT });

function broadcastCount() {
  const msg = JSON.stringify({ type: "COUNT", count: wss.clients.size });
  for (const client of wss.clients) {
    if (client.readyState === 1) client.send(msg);
  }
}

wss.on("connection", (ws) => {

  broadcastCount();

  ws.on("message", (data) => {

  });

  ws.on("close", () => {
    broadcastCount();
  });

  ws.on("error", () => {

  });
});

console.log(`✅ WS server running on ws://localhost:${PORT}`);
