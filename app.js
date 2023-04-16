require('dotenv').config()
const http = require('node:http');
const BitcoinController = require('./controller')

const hostname = '0.0.0.0';
const port = process.env.PORT || 8080;

const bitcoinController = new BitcoinController()

const server = http.createServer(async (req, res) => {
    if (req.url === "/api/bitcoin" && req.method === "GET") {
        const bitcoin = await bitcoinController.get();
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify(bitcoin));
    }
    else {
        res.writeHead(404, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ message: "Route not found" }));
    }
});

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
}); 