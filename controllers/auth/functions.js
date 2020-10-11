const axios = require('axios');
const jwt = require('jsonwebtoken');

const { User, sequelize } = require('../../models/index');
const {
  JWT_SECRET_KEY,
} = require('../../constants/jwt.json');

exports.getKakaoUserData = async (props) => {
  const { accessToken } = props;

  try {
    const userData = (
      await axios({
        url: 'https://kapi.kakao.com/v2/user/me',
        method: 'GET',
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
    ).data;

    return {
      oauthId: userData.id,
      name: userData.properties.nickname,
    };
  } catch (error) {
    error.message +=
      '카카오 계정 정보를 가지고 올 수 없습니다.';
    throw error;
  }
};

exports.getExistingUser = async (props) => {
  const { oauthProvider, oauthId, name } = props;

  try {
    const existing = await User.findOne({
      where: { oauthProvider, oauthId, name },
    });
    return existing;
  } catch (error) {
    error.message += '유저의 유무를 확인할 수 없습니다.';
    throw error;
  }
};

exports.signup = async (props) => {
  try {
    const newUser = await User.create(props);
    return newUser;
  } catch (error) {
    error.message += '회원가입을 실패하였습니다.';
    throw error;
  }
};

exports.generateToken = (props) => {
  const newToken = jwt.sign(props, JWT_SECRET_KEY);
  return newToken;
};

exports.injectToken = async (userId, authToken) => {
  try {
    const tokenInjectedUser = await User.update(
      { authToken },
      {
        where: { id: userId },
      }
    );
    return tokenInjectedUser;
  } catch (error) {
    error.message += '토큰 주입에 실패하였습니다.';
    throw error;
  }
};

exports.deleteExistingUser = async (userId) => {
  try {
    await sequelize.transaction(async (t) => {
      await User.destroy({
        where: { id: userId },
        transaction: t,
      });
    });
    return true;
  } catch (error) {
    error.message += `${userId} 유저 정보를 삭제하는 데에 실패하였습니다.`;
    throw error;
  }
};
