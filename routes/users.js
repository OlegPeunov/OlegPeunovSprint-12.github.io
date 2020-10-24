const router = require('express').Router();
const path = require('path');
const fs = require('fs');




router.get('/users', (users, res) => {
  const filePath = path.join(__dirname, '../data/users.json');
  const fileReader= fs.createReadStream(filePath, {encoding: 'utf8'})

  res.writeHead(200, {
    'Content-Type': 'text/plain'
  });

  fileReader.pipe(res);
});


router.get('/users/:id',(req, res) => {

  const users = require('../data/users.json')

  const element = users.find(el=>el._id === req.params.id)

  if(element === undefined) {
    res.status(404).send(`{ "message": "Нет пользователя с таким id"}`);
    return;
  }

  res.status(200).send(element)
})



module.exports = router;




