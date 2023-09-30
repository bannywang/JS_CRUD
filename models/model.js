const { connection } = require('../database/connection')
const { format_date_time } = require('../models/tool')

// user_data ----------------------------------------------------------------
const get_all_user_data = async () => {
    try {
        const query = 'SELECT * FROM user_data'
        const [results] = await connection.query(query)
        const formatted_results = results.map((user_data) => {
            user_data.create_time = format_date_time(user_data.create_time)
            return user_data
        })
        return formatted_results
    } catch (error) {
        console.log(error)
        return []
    }
}

const user_registration = async (email, account, password, user_name, phone, age, address) => {
    try {
        const query = `
            INSERT INTO user_data (email, account, password, name, phone, age, address)
            VALUES (?, ?, ?, ?, ?, ?, ?)
        `

        const [result] = await connection.query(query, [email, account, password, user_name, phone, age, address])
        console.log('註冊成功')
        return {
            success: true,
            message: '用戶註冊成功',
            userId: result.insertId,
        }
    } catch (error) {
        console.error('用戶註冊錯誤:', error)
        return {
            success: false,
            message: '用戶註冊錯誤',
        }
    }
}

const updateAccount = async (userId, newAccount) => {
    try {
        const query = 'UPDATE user_data SET account = ? WHERE id = ?'
        const [result] = await connection.query(query, [newAccount, userId])

        if (result.affectedRows === 0) {
            throw new Error('未影響任何行，更新失敗。')
        }

        return { success: true, message: '帳號成功更新。' }
    } catch (error) {
        console.error('更新帳號時出錯:', error.message)
        return { success: false, message: error.message }
    }
}

module.exports = {
    get_all_user_data,
    user_registration,
    updateAccount,
}
