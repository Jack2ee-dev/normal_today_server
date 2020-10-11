const {
  Plan,
  sequelize,
  Sequelize,
} = require('../../models/index');
const Op = Sequelize.Op;

exports.getPlanByDate = async (userId, dateProps) => {
  try {
    const plans = await Plan.findAll({
      where: { userId, createdAt: dateProps },
    });
    return plans;
  } catch (error) {
    error.message +=
      '일자로 플랜을 가져오는 데에 실패하였습니다.';
    throw error;
  }
};

exports.getPlanByDuration = async (
  userId,
  startDate,
  endDate
) => {
  try {
    const plans = await Plan.findAll({
      where: {
        userId,
        createdAt: {
          [Op.lte]: Date.parse(endDate),
          [Op.gte]: Date.parse(startDate),
        },
      },
    });
    return plans;
  } catch (error) {
    error.message +=
      '기간으로 플랜을 가져오는 데에 실패하였습니다.';
    throw error;
  }
};

exports.getPlanByUserId = async (userId) => {
  try {
    const plans = await Plan.findAll({
      where: {
        userId,
      },
    });
    return plans;
  } catch (error) {
    error.message += `${userId}로 플랜을 가져오는 데에 실패하였습니다.`;
  }
};

exports.createPlan = async (userId, planProps) => {
  const createdPlan = {
    ...planProps,
    userId,
  };
  createdPlan.createdAt = Date.parse(createdPlan.createdAt);
  try {
    await Plan.create(createdPlan);
    return true;
  } catch (error) {
    error.message += '플랜을 생성하는 데에 실패하였습니다.';
    throw error;
  }
};

exports.updateExistingPlan = async (
  planId,
  updatedPlanProps
) => {
  try {
    await sequelize.transaction(async (t) => {
      await Plan.update(updatedPlanProps, {
        where: { id: planId },
        transaction: t,
      });
    });
    return true;
  } catch (error) {
    error.message += '플랜을 수정하는 데에 실패하였습니다.';
    throw error;
  }
};

exports.deleteExistingPlan = async (planId) => {
  try {
    await sequelize.transaction(async (t) => {
      await Plan.destroy({
        where: { id: planId },
        transaction: t,
      });
    });
    return true;
  } catch (error) {
    error.message += '플랜을 삭제하는 데에 실패하였습니다.';
    throw error;
  }
};
