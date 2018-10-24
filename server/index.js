
require('dotenv').config();

const Koa = require('koa');
const koaBody = require('koa-bodyparser');
const cors = require('@koa/cors');
const http = require('http');
const { up } = require('./mongo/base');
const indexRoute = require('./routes');

const app = new Koa();
app
  .use(cors())
  .use(koaBody())
  .use(indexRoute.routes());

function listeningReporter () {
  const { address, port } = this.address();
  const protocol = this.addContext ? 'https' : 'http';
  console.log(`Listening on ${protocol}://${address}:${port}...`);
}

app.on('error', err => {
  console.error('server error', err)
});

up()
  .then(() => {
    http.createServer(app.callback())
    .listen(process.env.HTTP_PORT, 'localhost', listeningReporter)
  })
  .catch(e => {
    console.log(e);
    console.log('Failed to connect mongo db');
  });

