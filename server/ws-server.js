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
  // как только вкладка подключилась — всем новое число
  broadcastCount();

  ws.on("message", (data) => {
    // можно игнорировать, нам пока не нужно
    // оставим на будущее (например, ping/pong, имя вкладки и т.д.)
  });

  ws.on("close", () => {
    broadcastCount();
  });

  ws.on("error", () => {
    // на всякий случай
  });
});

console.log(`✅ WS server running on ws://localhost:${PORT}`);