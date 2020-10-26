const router = require('express').Router();

const fs = require('fs').promises;

const users = require('../data/users.json');

router.get('/users', (req, res) => {
  fs.readFile('./data/users.json', 'utf8')
    .then((data) => {
      res.status(200).json(JSON.parse(data));
    })
    .catch((err) => {
      res.status(404).json({ message: `Ошибка при чтения файла: ${err}` });
    });
});

router.get('/users/:id', (req, res) => {
  // eslint-disable-next-line no-underscore-dangle
  const element = users.find((el) => el._id === req.params.id);

  if (element === undefined) {
    res.status(404).json({ message: 'Нет пользователя с таким id' });
    return;
  }

  res.status(200).send(element);
});

module.exports = router;
