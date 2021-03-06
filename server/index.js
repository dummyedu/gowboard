
require('dotenv').config();
const path = require('path');
const Koa = require('koa');
const serve = require('koa-static');
const koaBody = require('koa-body');
const cors = require('@koa/cors');
const http = require('http');
const { up } = require('./mongo/base');
const indexRoute = require('./routes');

const app = new Koa();

app.use(async (ctx, next) => {
  try {
    await next();
  } catch (err) {
    ctx.throw(400, err);
    // ctx.status = err.status || 500;
    // ctx.body = err.message;
    // ctx.app.emit('error', err, ctx);
  }
});

app
  .use(cors())
  .use(koaBody({
    // formidable:{uploadDir: './uploads'},    //This is where the files would come
    multipart: true,
    urlencoded: true,
    keepExtensions: true,
    maxFileSize: 1 * 1024 * 1024,
  }))
  .use(indexRoute.routes());

function listeningReporter () {
  const { address, port } = this.address();
  const protocol = this.addContext ? 'https' : 'http';
  console.log(`Listening on ${protocol}://${address}:${port}...`);
}

app.on('error', err => {
  console.error('server error', err)
});

app.use(serve(path.resolve(__dirname, '../../github_static')));

up()
  .then(() => {
    http.createServer(app.callback())
    .listen(process.env.HTTP_PORT, null, listeningReporter)
  })
  .catch(e => {
    console.log(e);
    console.log('Failed to connect mongo db');
  });

