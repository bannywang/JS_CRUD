const express = require('express') // 引入 express 模組
const router = express.Router() // 建立一個新的路由器
const ctrl = require('../controllers/ctrl') // 引入 controllers 資料夾下的 ctrl 模組

// get 路由 --------------------------------

router.get('/', ctrl.index_page) // 根路徑的 GET 請求將會觸發 ctrl.index_page 函數
router.get('/user_list', ctrl.user_list_page) // '/user_list' 路徑的 GET 請求將會觸發 ctrl.user_list_page 函數

// post 路由 --------------------------------

// put 路由 --------------------------------
router.put('/updateUser/:id', ctrl.update_user_data) // '/updateUser/:id' 路徑的 PUT 請求將會觸發 ctrl.updateUserAccount 函數，並傳入使用者 ID

module.exports = router // 輸出此路由器模組
