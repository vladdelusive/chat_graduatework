import React from 'react'

export const OfflineModal = React.memo(() => {
    return (
        <div id="popup1" className="show-popup">
            <div className="popup">
                <h2>У Вас пропало з'єднання!</h2>
                <div className="content">Знайдіть підключення до інтернету!</div>
            </div>
        </div>
    )
})
