// 引入 models 資料夾下的 model 模組
const model = require('../models/model')

// 首頁的控制器，返回 "hello world"
const index_page = async (req, res) => {
    res.send('hello world')
}

// 用戶列表頁的控制器
const user_list_page = async (req, res) => {
    try {
        // 從模型中獲取所有用戶資料
        const user_list = await model.get_all_user_data()
        if (user_list && user_list.length > 0) {
            // 如果有資料，則渲染用戶列表頁面
            res.render('user_list', { users: user_list })
        } else {
            // 如果沒有資料，返回 404 錯誤頁面
            res.status(404).render('error', { message: '找不到任何用戶資料' })
        }
    } catch (error) {
        // 如果有錯誤，返回 500 錯誤頁面
        res.status(500).render('error', { message: '伺服器錯誤' })
    }
}

// 更新用戶資料的控制器
const update_user_data = async (req, res) => {
    const userId = req.params.id // 從請求參數中獲取用戶ID
    const updates = req.body // 從請求主體中獲取更新的資料
    try {
        // 遍歷每一個欄位並更新
        for (const field in updates) {
            await model.updateField(userId, field, updates[field])
        }
        res.json({ success: true }) // 更新成功，返回成功的 JSON 響應
    } catch (error) {
        // 如果有錯誤，返回 500 錯誤的 JSON 響應
        res.status(500).json({ message: '伺服器錯誤' })
    }
}

// 輸出這些控制器
module.exports = {
    index_page,
    user_list_page,
    update_user_data,
}
