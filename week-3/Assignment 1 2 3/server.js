const express = require('express');
const app = express();
const cookieParsar = require('cookie-parser');

app.use(cookieParsar());

app.use(express.static('public'));

app.set('view engine', 'pug');

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

app.get('/getData', (req, res) => {
  let { number } = req.query;
  if (number > 0) {
    number = (parseInt(number) * (parseInt(number) + 1)) / 2;
    //res.render('sum', {number});
    res.json({ number });
  } else if (!number) {
    res.json('Lack of Parameter');
  } else {
    res.json('Wrong Parameter');
  }
});

app.get('/myName', (req, res) => {
  const name = req.cookies.username;
  if (name) {
    res.render('showName', { name });
  } else {
    res.render('trackName');
  }
});
app.get('/trackName', (req, res) => {
  const { name } = req.query;
  res.cookie('username', name);
  res.redirect('/myName');
});
app.post('/trackName', (req, res) => {
  res.clearCookie('username');
  res.redirect('/myName');
});

app.use((req, res, next) => {
  const err = new Error('此路徑不存在');
  err.status = 404;
  next(err);
});

app.use((req, res, next) => {
  const err = new Error('其他錯誤');
  err.status = 500;
  next(err);
});

app.use((err, req, res, next) => {
  res.locals.error = err;
  res.status(err.status);
  res.render('err');
});

const PORT = 3000;
app.listen(PORT, () => console.log(`listening on http://localhost:${PORT}`));
