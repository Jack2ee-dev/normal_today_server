const router = require('express').Router();

const planController = require('../controllers/plan/controller');
const isAuth = require('../middlewares/isAuth');

router.get('/', isAuth, planController.getPlans);

router.post('/', isAuth, planController.postPlan);

router.put('/:planId', isAuth, planController.updatePlan);

router.delete(
  '/:planId',
  isAuth,
  planController.deletePlan
);

module.exports = router;
