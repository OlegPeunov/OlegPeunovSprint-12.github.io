const router = require('express').Router();

const fs = require('fs').promises;

router.get('/cards', (req, res) => {
  fs.readFile('./data/data.json', 'utf8')
    .then((data) => {
      res.status(200).json(JSON.parse(data));
    })
    .catch((err) => {
      res.status(404).json({ message: `Ошибка при чтения файла: ${err}` });
    });
});

module.exports = router;
