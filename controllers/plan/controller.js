const {
  createPlan,
  getPlanByDate,
  getPlanByDuration,
  getPlanByUserId,
  updateExistingPlan,
  deleteExistingPlan,
} = require('./functions');

exports.getPlans = async (req, res, next) => {
  const { userId } = req;
  const { searchBy } = req.body;

  let plans;
  switch (searchBy) {
    case 'date':
      const { date } = req.body;
      try {
        plans = await getPlanByDate(userId, date);
      } catch (error) {
        console.log(error);
        next(error);
      }
      break;
    case 'duration':
      const { startDate, endDate } = req.body;
      try {
        plans = await getPlanByDuration(
          userId,
          startDate,
          endDate
        );
      } catch (error) {
        console.log(error);
        next(error);
      }
      break;
    case 'userId':
      try {
        plans = await getPlanByUserId(userId);
      } catch (error) {
        console.log(error);
        next(error);
      }
      break;
    default:
      break;
  }
  res.status(200).json({ plans });
};

exports.postPlan = async (req, res, next) => {
  const { userId } = req;
  const planData = {
    name: req.body.name,
    category: req.body.category,
    completed: false,
    startTime: req.body.startTime,
    endTime: req.body.endTime,
    createdAt: req.body.createdAt, // javascript date
  };

  try {
    const created = await createPlan(userId, planData);
    res.status(201).json({ created });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

exports.updatePlan = async (req, res, next) => {
  const { planId } = req.params;
  const updatedPlanData = req.body;

  try {
    const updated = await updateExistingPlan(
      planId,
      updatedPlanData
    );
    res.status(200).json({ updated });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

exports.deletePlan = async (req, res, next) => {
  const { planId } = req.params;

  try {
    const deleted = await deleteExistingPlan(planId);
    res.status(200).json({ deleted });
  } catch (error) {
    console.log(error);
    next(error);
  }
};
