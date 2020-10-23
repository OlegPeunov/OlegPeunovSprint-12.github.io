const router = require('express').Router();
const users = require('../data/users.json')



router.get('/users', (req, res) => {
  res.status(200).send(users)
});



router.get('/users/:id',(req, res) => {

  let element=false

  users.forEach((el)=>{
    if(el._id === req.params.id){
      element=[el]
    }
  })

  if(!element) {
    res.status(404).send(`message: Нет пользователя с id ${req.params.id}`);
    return;
  }

  res.status(200).send(element)
})



module.exports = router;