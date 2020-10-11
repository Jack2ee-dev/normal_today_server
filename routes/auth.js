const router = require('express').Router();

const authController = require('../controllers/auth/controller');
const isAuth = require('../middlewares/isAuth');

router.post('/', authController.authenticate);

router.delete(
  '/:userId',
  isAuth,
  authController.deleteUser
);

module.exports = router;
