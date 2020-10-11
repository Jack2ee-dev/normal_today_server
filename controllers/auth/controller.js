const {
  getKakaoUserData,
  getExistingUser,
  signup,
  generateToken,
  injectToken,
  deleteExistingUser,
} = require('./functions');

exports.authenticate = async (req, res, next) => {
  const { accessToken, oauthProvider } = req.body;

  let oauthId, name;
  try {
    const props = { accessToken };
    const kakaoUserData = await getKakaoUserData(props);
    oauthId = kakaoUserData.oauthId;
    name = kakaoUserData.name;
  } catch (error) {
    console.log(error);
    next(error);
  }

  let user;
  try {
    const props = { oauthProvider, oauthId, name };
    user = await getExistingUser(props);
  } catch (error) {
    console.log(error);
    next(error);
  }

  if (user) {
    res.status(200).json({
      authToken: user.authToken,
      newUser: false,
    });
    return;
  }

  try {
    const signupProps = {
      oauthProvider,
      oauthId,
      name,
    };
    const newUser = await signup(signupProps);
    const tokenProps = {
      oauthProvider,
      oauthId,
      name,
      userId: newUser.id,
    };
    const generatedToken = generateToken(tokenProps);
    await injectToken(newUser.id, generatedToken);
    res.status(201).json({
      authToken: generatedToken,
      new: true,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

exports.deleteUser = async (req, res, next) => {
  const { userId } = req;
  try {
    const deleted = await deleteExistingUser(userId);
    res.status(200).json({ deleted });
  } catch (error) {
    console.log(error);
    next(error);
  }
};
