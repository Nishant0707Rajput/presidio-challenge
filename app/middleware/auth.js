const response = require('../response/index');
const httpStatus = require('http-status');
const { env } = require('../constant/index');
const Session = require('../model/session');
const jwt = require('jsonwebtoken');
// This function is used for validate API key

exports.verifyApiKey = (req, res, next) => {
  try {
    const ApiKey = req.headers['x-api-key'];
    if (!ApiKey) {
      return response.error(req, res, { msgCode: 'MISSING_API_KEY' }, httpStatus.UNAUTHORIZED);
    }

    if (ApiKey !== env.API_KEY) {
      return response.error(req, res, { msgCode: 'INVALID_API_KEY' }, httpStatus.UNAUTHORIZED);
    }
    return next();
  } catch (error) {
    return response.error(req, res, { msgCode: 'INTERNAL_SERVER_ERROR' }, httpStatus.INTERNAL_SERVER_ERROR);
  }
};

exports.verifySellerAuthToken = (req, res, next) => {
  try {
    let token = req.headers.authorization;
    if (!token ||
      !token.startsWith('Bearer') ||
      !token.split(' ')[1]) {
      return response.error(req, res, { msgCode: 'MISSING_TOKEN' }, httpStatus.UNAUTHORIZED);
    }
    token = token.replace(/^Bearer\s+/, '');
    jwt.verify(token, process.env.JWT_SECRET, async (error, decoded) => {
      if (error) {
        let msgCode = 'INVALID_TOKEN';
        if ((error.message === constant.errorMsg.EXPIRED)) {
          msgCode = 'FORGOT_PASSWORD_EXPIRED';
        } else if (error.message === constant.errorMsg.EXPIRED) {
          msgCode = 'TOKEN_EXPIRED';
        }
        return response.error(req, res, { msgCode }, httpStatus.UNAUTHORIZED);
      }
      const condition = { token };
      const checkJwt = await Session.findOne(condition);
      if (!checkJwt || decoded.userType!=='seller') {
        return response.error(req, res, { msgCode: 'INVALID_TOKEN' }, httpStatus.UNAUTHORIZED);
      } else {
        req.data = decoded;
        req.token = token;
        return next();
      }
    });
  } catch (err) {
    console.log(err);
    return response.error(req, res, { msgCode: 'SOMETHING_WRONG' }, httpStatus.SOMETHING_WRONG);
  }
};

exports.verifyBuyerAuthToken = (req, res, next) => {
  try {
    let token = req.headers.authorization;
    if (!token ||
      !token.startsWith('Bearer') ||
      !token.split(' ')[1]) {
      return response.error(req, res, { msgCode: 'MISSING_TOKEN' }, httpStatus.UNAUTHORIZED);
    }
    token = token.replace(/^Bearer\s+/, '');
    jwt.verify(token, process.env.JWT_SECRET, async (error, decoded) => {
      if (error) {
        let msgCode = 'INVALID_TOKEN';
        return response.error(req, res, { msgCode }, httpStatus.UNAUTHORIZED);
      }
      const condition = { jwt: token };
      const checkJwt = await Session.findOne(condition);
      if (!checkJwt || decoded.userType!=='buyer') {
        return response.error(req, res, { msgCode: 'INVALID_TOKEN' }, httpStatus.UNAUTHORIZED);
      } else {
        req.data = decoded;
        req.token = token;
        return next();
      }
    });
  } catch (err) {
    console.log(err);
    return response.error(req, res, { msgCode: 'SOMETHING_WRONG' }, httpStatus.SOMETHING_WRONG);
  }
};

