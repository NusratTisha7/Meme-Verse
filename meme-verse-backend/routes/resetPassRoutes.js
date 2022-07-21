const router = require('express').Router();
const { forgotPassword, checkCode, resetPassword } = require('../controllers/resetPassController')

router.route('/verify-email')
    .post(forgotPassword)

router.route('/reset-code')
    .post(checkCode)

router.route('/reset-pass')
    .post(resetPassword)

module.exports = router;