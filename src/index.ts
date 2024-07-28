import { type ServerWebSocket } from "bun";
import { watch } from "fs";
import { exec } from "child_process";

const clients = new Set<ServerWebSocket>();

const server = Bun.serve({
    port: 3000,
    async fetch(req) {
    const url = new URL(req.url);
    
    if (url.pathname === "/") {
        const html = await Bun.file("public/index.html").text();
        const modifiedHtml = html.replace('</body>', `
        <script>
            const ws = new WebSocket('ws://' + location.host + '/ws');
            ws.onmessage = () => location.reload();
        </script>
        </body>
        `);
        return new Response(modifiedHtml, {
        headers: { "Content-Type": "text/html" },
        });
    }

    if (url.pathname === "/ws") {
        const upgraded = server.upgrade(req);
        if (upgraded) {
        return;
        }
    }
    
    const filePath = `public${url.pathname}`;
    const file = Bun.file(filePath);
    
    if (await file.exists()) {
        const headers = new Headers();
        if (url.pathname.endsWith('.js')) {
        headers.set('Content-Type', 'application/javascript');
        }
        return new Response(file, { headers });
    }
    
    return new Response("Not Found", { status: 404 });
    },
    websocket: {
    open(ws: ServerWebSocket<undefined>) {
        clients.add(ws);
    },
    close(ws: ServerWebSocket<undefined>) {
        clients.delete(ws);
    },
    message(ws: ServerWebSocket<undefined>, message: string | Uint8Array) {
    },
    },
});

console.log(`Listening on http://localhost:${server.port}`);

watch("./src", { recursive: true }, (eventType, filename) => {
    if (filename && filename.endsWith('.ts')) {
    console.log(`File ${filename} changed`);
    exec("bun run build", (error, stdout, stderr) => {
        if (error) {
        console.error(`Build error: ${error}`);
        return;
        }
        console.log(`Build output: ${stdout}`);
        for (const client of clients) {
        client.send("reload");
        }
    });
    }
});