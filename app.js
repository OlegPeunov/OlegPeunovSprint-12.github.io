const express = require('express');

const path = require('path');

const { PORT = 3000 } = process.env;
const app = express();
app.use(express.static(path.join(__dirname, 'public')));
const bodyParser = require('body-parser');

const routerCards = require('./routes/cards.js');

const routerUsers = require('./routes/users.js');

app.use(bodyParser.json());
app.use('/', routerCards);
app.use('/', routerUsers);

app.use('/', (req, res) => {
  res.status(404).send({ message: 'Запрашиваемый ресурс не найден' });
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
