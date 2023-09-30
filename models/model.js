const { connection } = require('../database/connection') // 引入資料庫連接
const { format_date_time } = require('../models/tool') // 引入格式化日期時間的工具函數

// user_data 相關的資料庫操作 ----------------------------------------------------------------

// 獲取所有用戶資料
const get_all_user_data = async () => {
    try {
        const query = 'SELECT * FROM user_data'
        const [results] = await connection.query(query)
        const formatted_results = results.map((user_data) => {
            user_data.create_time = format_date_time(user_data.create_time) // 格式化創建時間
            return user_data
        })
        return formatted_results
    } catch (error) {
        console.log(error)
        return []
    }
}

// 用戶註冊
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

// 更新帳號
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

// 根據欄位名稱更新資料
const updateField = async (userId, field, newValue) => {
    try {
        const query = `UPDATE user_data SET ${field} = ? WHERE id = ?`
        const [result] = await connection.query(query, [newValue, userId])

        if (result.affectedRows === 0) {
            throw new Error('未影響任何行，更新失敗。')
        }

        return { success: true, message: '更新成功。' }
    } catch (error) {
        console.error(`更新${field}時出錯:`, error.message)
        return { success: false, message: error.message }
    }
}

// 輸出這些資料庫操作函數
module.exports = {
    get_all_user_data,
    user_registration,
    updateAccount,
    updateField,
}
