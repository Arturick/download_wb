const express = require('express')
const Router = express.Router;
const router = new Router();

const service = require('./service/service');
const userService = require("./service/user");
const middleWare = require('./middle-ware');

//user
router.post('/auth', userService.auth);
router.post('/add-user', middleWare.auth, userService.addUser)
router.post('/delete-user', middleWare.auth, userService.deleteUser)
router.get('/get-user', middleWare.auth, userService.getUser)

// logic
router.post('/download-img', middleWare.auth, service.saveImg);
router.post('/add-log', middleWare.auth, service.addLog);
router.get( '/get-log', middleWare.auth,  service.getLog);


module.exports = router;