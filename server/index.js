
require('dotenv').config();

const Koa = require('koa');
const cors = require('@koa/cors');
const http = require('http');
const https = require('https');
const { up } = require('./mongo/base');

const app = new Koa();
app.use(cors());

app.use(async ctx => {
  ctx.body = 'Server is ready';
});

function listeningReporter () {
  const { address, port } = this.address();
  const protocol = this.addContext ? 'https' : 'http';
  console.log(`Listening on ${protocol}://${address}:${port}...`);
}

app.on('error', err => {
  console.log.error('server error', err)
});

up()
  .then(() => {
    http.createServer(app.callback())
    .listen(process.env.HTTP_PORT, 'localhost', listeningReporter)
    https.createServer(app.callback())
      .listen(process.env.HTTPS_PORT, 'localhost', listeningReporter)
  })
  .catch(e => {
    console.log(e);
    console.log('Failed to connect mongo db');
  });

