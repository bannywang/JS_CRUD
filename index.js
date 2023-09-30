const express = require('express') // 引入 express 模組
const app = express() // 建立 express 應用
const port = 3005 // 設定伺服器監聽的埠號

require('dotenv').config() // 引入並初始化 dotenv 模組，用於讀取 .env 檔案中的環境變數

const path = require('path') // 引入 path 模組，用於處理檔案和目錄路徑

app.use(express.json()) // 啟用 express 內建的 JSON 解析器

app.set('view engine', 'ejs') // 設定應用使用的視圖引擎為 'ejs'
app.set('views', path.join(__dirname, 'views')) // 設定視圖的存放路徑

app.use(express.static(path.join(__dirname, 'public'))) // 設定靜態檔案的存放路徑

const router = require('./routers/router') // 引入路由模組
app.use('/', router) // 使用該路由模組於根路徑

// 啟動伺服器，開始監聽指定的埠號
app.listen(port, () => {
    console.log(`http://localhost:${port}`)
})
