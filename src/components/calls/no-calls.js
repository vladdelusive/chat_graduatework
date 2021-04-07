import React from 'react'

export const NoCalls = React.memo(() => {
    return (
        <div className="no-calls">
            <div>Нету активный звонков</div>
        </div>
    )
})
