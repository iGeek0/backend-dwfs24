const { Router } = require('express');
const router = Router();
const {
    userGet,
    userPost,
    userPut,
    userDelete,
    login
} = require('../controllers/user.controller');
const auth = require('../middlewares/authorization');


router.get('/users', auth ,userGet);

router.post('/users', userPost);

router.post('/usuario/iniciar-sesion', login);

router.put('/users', userPut);

router.delete('/users', userDelete);

module.exports = router;