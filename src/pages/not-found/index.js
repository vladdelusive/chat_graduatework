import { Button, Result } from 'antd'
import React from 'react'
import { Link } from 'react-router-dom'

export function NotFound() {
    return (
        <Result
            status="404"
            title="404"
            subTitle="Сторінка не була знайдена"
            extra={
                <Link to="/">
                    <Button type="primary">Повернутися на головну</Button>
                </Link>
            }
        />
    )
}
