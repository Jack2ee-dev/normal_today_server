const router = require('express').Router();

const userController = require('../controllers/user/controller');
const isAuth = require('../middlewares/isAuth');

router.get(
  '/:userId/detail',
  isAuth,
  userController.getUserDetail
);

router.post(
  '/:userId/detail',
  isAuth,
  userController.postUserDetail
);

router.put(
  '/:userId/detail',
  isAuth,
  userController.updateUserDetail
);

module.exports = router;
