const router = require('express').Router();
const path = require('path');
const fs = require('fs');


router.get('/cards', (req, res) => {

  const filePath = path.join(__dirname, '../data/data.json');
  const fileReader= fs.createReadStream(filePath, {encoding: 'utf8'})

  res.writeHead(200, {
    'Content-Type': 'text/plain'
  });

  fileReader.pipe(res);
});


module.exports = router;