const app = require('koa')();
const router = require('koa-router')();
const db = require('./db.json');

// Log requests
app.use(function *(next){
  const start = new Date;
  yield next;
  const ms = new Date - start;
  console.log('%s %s - %s', this.method, this.url, ms);
});

router.get('/api/avengers', function *(next) {
  this.body = db.avengers;
});

router.get('/api/avengers/:avengersId', function *(next) {
  const id = parseInt(this.params.avengersId);
  this.body = db.avengers.find((avengers) => avengers.id == id);
});

router.get('/api/marvels', function *(next) {
  this.body = db.marvels;
});

router.get('/api/marvels/:marvelsId', function *(next) {
  const id = parseInt(this.params.marvelsId);
  this.body = db.marvels.find((marvels) => marvels.id == id);
});

router.get('/api/', function *() {
  this.body = "API ready to receive requests";
});

router.get('/', function *() {
  this.body = "Ready to receive requests";
});

app.use(router.routes());
app.use(router.allowedMethods());

app.listen(3000);

console.log('Worker started');
