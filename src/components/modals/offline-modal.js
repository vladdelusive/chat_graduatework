import React from 'react'

export const OfflineModal = React.memo(() => {
    return (
        <div id="popup1" className="show-popup">
            <div className="popup">
                <h2>У Вас пропало соединение!</h2>
                <div className="content">Найдите подключение к интернету!</div>
            </div>
        </div>
    )
})
