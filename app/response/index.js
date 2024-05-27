const httpStatus = require('http-status');
const fs = require('fs');
const path = require('path');
const basename = path.basename(__filename);

const lngMsg = {};
fs.readdirSync(path.join(__dirname, 'lng')).filter(file => {
  return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-5) === '.json');
}).forEach(file => {
  const fileName = file.slice(0, -5);
  const lng = require(path.join(__dirname, 'lng', file));
  lngMsg[fileName] = lng;
});

exports.success = async (req, res, result, code) => {
  const lng = req.headers['accept-language'] || 'en';
  try {
    const response = {
      success: true,
      status_code: code,
      message: (lngMsg[lng] ? lngMsg[lng][result.msgCode] : lngMsg.en[result.msgCode]) || result.msgCode || httpStatus[code],
      result: result.data ? result.data : {},
      time: Date.now()
    };

    return res.status(code).json(response);
  } catch (error) {
    console.log('🚀 ~ file: index.js ~ line 32 ~ exports.success= ~ error', error);
    return res.json(
      {
        success: true,
        status_code: 500,
        message: lngMsg[lng] ? lngMsg[lng].INTERNAL_SERVER_ERROR : lngMsg.en.INTERNAL_SERVER_ERROR,
        result: {},
        time: Date.now()
      });
  }
};

exports.error = async (req, res, error, code) => {
  const lng = req.headers['accept-language'] || 'en';
  try {
    const response = {
      success: false,
      status_code: code,
      message: (lngMsg[lng] ? lngMsg[lng][error.msgCode] : lngMsg.en[error.msgCode]) || error.msgCode || httpStatus[code],
      result: {
        error: error.data ? error.data : 'error'
      },
      time: Date.now()
    };
    res.status(code).json(response);
  } catch (err) {
    return res.status(500).json({
      success: false,
      status_code: 500,
      message: lngMsg[lng] ? lngMsg[lng].INTERNAL_SERVER_ERROR : lngMsg.en.INTERNAL_SERVER_ERROR,
      result: {},
      time: Date.now()
    });
  }
};
