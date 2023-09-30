const model = require('../models/model')

const index_page = async (req, res) => {
    res.send('hello world')
}

const user_list_page = async (req, res) => {
    try {
        const user_list = await model.get_all_user_data()
        if (user_list && user_list.length > 0) {
            res.render('user_list', { users: user_list })
        } else {
            res.status(404).render('error', { message: '找不到任何用戶資料' })
        }
    } catch (error) {
        res.status(500).render('error', { message: '伺服器錯誤' })
    }
}

const updateUserAccount = async (req, res) => {
    const userId = req.params.id
    const newAccount = req.body.account
    try {
        await model.updateAccount(userId, newAccount)
        res.json({ success: true })
    } catch (error) {
        res.status(500).json({ message: '伺服器錯誤' })
    }
}

module.exports = {
    index_page,
    user_list_page,
    updateUserAccount
}
