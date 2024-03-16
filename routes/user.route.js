const { Router } = require('express');
const router = Router();
const {
    userGet,
    userPost,
    userPut,
    userDelete
} = require('../controllers/user.controller');

router.get('/users', userGet);

router.post('/users', userPost);

router.put('/users', userPut);

router.delete('/users', userDelete);

module.exports = router;