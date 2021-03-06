const express = require('express');
const router = express.Router();
const MemoController = require('../Controllers/Memo-controller.js')
const UserController = require('../Controllers/User-controller.js')
/* GET home page. */
router.get('/login', UserController.loginScreen)
router.get('/editProfile/:id', UserController.editProfile)
router.get('/deleteUser/:id', UserController.deleteUser)
router.get('/signup', UserController.signupScreen)
router.get('/listUser', UserController.UserList)
router.get('/logout', UserController.logout)
router.post('/updateProfile/:id', UserController.updateProfile)
router.post('/login', UserController.login)
router.post('/signup', UserController.signup)


router.get('/', MemoController.Home)
router.get('/editMemo/:id', MemoController.editMemo)
router.get('/deleteMemo/:id', MemoController.deleteMemo)
router.post('/updateMemo/:id', MemoController.updateMemo)
router.post('/createMemo', MemoController.createMemo)

module.exports = router;
