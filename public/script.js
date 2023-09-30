document.addEventListener('DOMContentLoaded', () => {
    const userList = document.getElementById('user-list')

    userList.addEventListener('click', (event) => {
        const liElement = event.target.closest('li') // 找到最接近的<li>元素

        // 為箭頭和用戶詳細資訊的功能
        if (liElement) {
            const clickedDetails = liElement.querySelector('.details')
            const clickedArrow = liElement.querySelector('.arrow')

            // 如果點擊的是箭頭或其他列表項，才隱藏所有的詳細資訊
            if (event.target === clickedArrow || !clickedDetails.classList.contains('hidden')) {
                const allDetails = document.querySelectorAll('.details:not(.hidden)')
                allDetails.forEach((detail) => {
                    if (detail !== clickedDetails) {
                        // 確保我們不會關閉正在點擊的詳細資訊
                        detail.classList.add('hidden')
                        const arrow = detail.previousElementSibling.querySelector('.arrow')
                        arrow.textContent = '▶'
                        arrow.style.transform = 'rotate(0deg)'
                    }
                })

                // 只有當點擊的是箭頭時，才顯示或隱藏當前的詳細資訊
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
            parent.querySelector('.account-display').hidden = true
            parent.querySelector('.account-edit').hidden = false
            event.target.hidden = true
            parent.querySelector('.save-button').hidden = false
        } else if (event.target.classList.contains('save-button')) {
            const parent = event.target.parentNode
            const userId = parent.closest('li').dataset.id
            const newAccount = parent.querySelector('.account-edit').value

            fetch(`/updateUser/${userId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ account: newAccount }),
            })
                .then((response) => response.json())
                .then((data) => {
                    if (data.success) {
                        parent.querySelector('.account-display').textContent = newAccount
                    }
                    parent.querySelector('.account-display').hidden = false
                    parent.querySelector('.account-edit').hidden = true
                    event.target.hidden = true
                    parent.querySelector('.edit-button').hidden = false
                })
        }
    })
})
