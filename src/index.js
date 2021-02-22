const http = require("http");
const httpProxy = require("http-proxy");

var proxy = httpProxy.createProxyServer();

if (!process.env.SERVERS) {
  throw new Error("Environment variable 'SERVERS' required");
}

const onlineServers = JSON.parse(process.env.SERVERS);

var server = http.createServer((req, res) => {
    var target = onlineServers.shift();
    onlineServers.push(target);
    proxy.web(req, res, { target });
})

const PORT = process.env.PORT ?? 5050;

server.listen(PORT, () => {
  console.log(`Load balancing on port: ${PORT}`);
});

var signals = {
  SIGHUP: 1,
  SIGINT: 2,
  SIGTERM: 15,
};

Object.keys(signals).forEach((signal) => {
  process.on(signal, () => {
    process.exit(0);
  });
});
