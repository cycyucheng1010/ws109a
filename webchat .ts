import { listenAndServe } from "https://deno.land/std/http/server.ts";
import { WebSocket, WebSocketServer } from "https://deno.land/x/websocket/mod.ts";

// html serve
listenAndServe({port: 8000}, async(req) => {
	if(req.method == "GET" && req.url == "/")
		req.respond({ body: await Deno.open('chatroom.html') });
});

// websocket serve
const wss = new WebSocketServer(8080);

wss.on("connection", function (ws: WebSocket) {
	ws.on("message", function (message: string) {
		console.log(message);
		//ws.send(message);
		// broadcast message
		wss.clients.forEach(function each(client) {
			if (!client.isClosed) {
				client.send(message);
			}
		});
	});
});

console.log("Running server in port 8000");
// http.js
import { serve } from "https://deno.land/std@0.57.0/http/server.ts";

const s = serve({ port: 8000 });
console.log("http://localhost:8000/");

for await (const req of s) {
  req.respond({ body: "Hello World\n" });
}