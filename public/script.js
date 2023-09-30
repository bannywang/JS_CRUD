// 監聽文件加載完成的事件
document.addEventListener('DOMContentLoaded', () => {
    // 獲取用戶列表元素
    const userList = document.getElementById('user-list')

    // 監聽用戶列表的點擊事件
    userList.addEventListener('click', (event) => {
        // 找到最接近的<li>元素
        const liElement = event.target.closest('li')

        // 為箭頭和用戶詳細資訊的功能
        if (liElement) {
            const clickedDetails = liElement.querySelector('.details')
            const clickedArrow = liElement.querySelector('.arrow')

            if (event.target === clickedArrow || !clickedDetails.classList.contains('hidden')) {
                const allDetails = document.querySelectorAll('.details:not(.hidden)')
                // 隱藏所有詳細資訊
                allDetails.forEach((detail) => {
                    if (detail !== clickedDetails) {
                        detail.classList.add('hidden')
                        const arrow = detail.previousElementSibling.querySelector('.arrow')
                        arrow.textContent = '▶'
                        arrow.style.transform = 'rotate(0deg)'
                    }
                })

                // 切換當前詳細資訊的顯示狀態
                if (event.target === clickedArrow) {
                    clickedDetails.classList.toggle('hidden')
                    if (clickedDetails.classList.contains('hidden')) {
                        clickedArrow.textContent = '▶'
                        clickedArrow.style.transform = 'rotate(0deg)'
                    } else {
                        clickedArrow.textContent = '▼'
                        clickedArrow.style.transform = 'rotate(90deg)'
                    }
                }
            }
        }

        // 為編輯和保存按鈕的功能
        if (event.target.classList.contains('edit-button')) {
            const parent = event.target.parentNode
            const field = event.target.getAttribute('data-field')
            parent.querySelector(`.${field}-display`).hidden = true
            parent.querySelector(`.${field}-edit`).hidden = false
            event.target.hidden = true
            parent.querySelector(`.save-button[data-field="${field}"]`).hidden = false
        } else if (event.target.classList.contains('save-button')) {
            const parent = event.target.parentNode
            const field = event.target.getAttribute('data-field')
            const userId = parent.closest('li').dataset.id
            const newValue = parent.querySelector(`.${field}-edit`).value

            // 發送 PUT 請求更新用戶資料
            fetch(`/updateUser/${userId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ [field]: newValue }),
            })
                .then((response) => response.json())
                .then((data) => {
                    if (data.success) {
                        parent.querySelector(`.${field}-display`).textContent = newValue
                    }
                    parent.querySelector(`.${field}-display`).hidden = false
                    parent.querySelector(`.${field}-edit`).hidden = true
                    event.target.hidden = true
                    parent.querySelector(`.edit-button[data-field="${field}"]`).hidden = false
                })
        }
    })
})
