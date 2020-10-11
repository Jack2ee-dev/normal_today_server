const {
  getExistingUserDetail,
  createUserDetail,
  updateExistingUserDetail,
} = require('./functions');

exports.getUserDetail = async (req, res, next) => {
  const { userId } = req;

  try {
    const userDetail = await getExistingUserDetail(userId);
    res.status(200).json(userDetail);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

exports.postUserDetail = async (req, res, next) => {
  const { userId } = req;
  const userDetail = req.body;

  try {
    const created = await createUserDetail(
      userId,
      userDetail
    );
    res.status(201).json({ created });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

exports.updateUserDetail = async (req, res, next) => {
  const { userId } = req;
  const { planId } = req.params;
  const updatedUserDetail = req.body;

  try {
    const updated = await updateExistingUserDetail(
      userId,
      planId,
      updatedUserDetail
    );
    res.status(200).json({ updated });
  } catch (error) {
    console.log(error);
    next(error);
  }
};
