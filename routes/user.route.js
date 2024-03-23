const { Router } = require('express');
const router = Router();
const {
    userGet,
    userPost,
    userPut,
    userDelete,
    login
} = require('../controllers/user.controller');

const authMidd = require('../middleware/authorization');

router.get('/users', authMidd ,userGet);

router.post('/users', userPost); // signup

router.put('/users', userPut);

router.delete('/users', userDelete);

router.post('/login', login); //login

module.exports = router;