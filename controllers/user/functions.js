const {
  UserDetail,
  sequelize,
} = require('../../models/index');

exports.createUserDetail = async (userId, userDetail) => {
  const createdUserDetail = {
    ...userDetail,
    userId,
  };

  try {
    await UserDetail.create(createdUserDetail);
    return true;
  } catch (error) {
    error.message +=
      '유저 디테일을 생성하는 데에 실패하였습니다.';
    throw error;
  }
};

exports.getExistingUserDetail = async (userId) => {
  try {
    const existingUserDetail = await UserDetail.findOne({
      where: { userId },
    });
    return existingUserDetail;
  } catch (error) {
    error.message += `${userId} 유저 디테일을 찾는 데에 실패하였습니다.`;
    throw error;
  }
};

exports.updateExistingUserDetail = async (
  userId,
  updatedProps
) => {
  try {
    await sequelize.transaction(async (t) => {
      await UserDetail.update(updatedProps, {
        where: { userId },
        transaction: t,
      });
    });

    return true;
  } catch (error) {
    error.message +=
      '기존 유저 디테일을 수정하는 데에 실패하였습니다.';
  }
};
