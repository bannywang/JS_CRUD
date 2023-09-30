# JS_CRUD

使用 Node.js 與 AJAX 進行資料庫 CRUD 操作。

## 目錄

- [JS\_CRUD](#js_crud)
  - [目錄](#目錄)
  - [介紹](#介紹)
  - [前置要求](#前置要求)
  - [安裝](#安裝)
  - [使用方法](#使用方法)
  - [API 參考](#api-參考)
  - [貢獻](#貢獻)

## 介紹

`JS_CRUD` 是一個使用 AJAX 與 Node.js 技術的簡單專案。本專案提供一個簡單的介面，用於展示如何對資料庫進行 CRUD 操作。

## 前置要求
- Node.js
- MySQL (請依照檔案內的 user_data.sql 進行 create database & table)

## 安裝

```bash
# 複製專案至本地
git clone https://github.com/bannywang/JS_CRUD.git

# 安裝所需套件
npm install
```
## 使用方法
1. 確保你已經設置了資料庫連接。
2. 執行 node index.js 啟動伺服器。
3. 訪問 http://localhost:3005 進行操作。

## API 參考
- GET /user_list: 獲取所有用戶列表
- PUT /updateUser/:id: 修改用戶資訊

## 貢獻
歡迎任何形式的貢獻! 若有發現問題、提供建議或是新增功能，請提交 Issues 或 Pull Requests。