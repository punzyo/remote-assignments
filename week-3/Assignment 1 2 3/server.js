const express = require('express');
const app = express();

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

const PORT = 3000;
app.listen(PORT, () => console.log(`listening on http://localhost:${PORT}`));
