import React from 'react'
import { Link } from 'react-router-dom'
import { Avatar } from 'antd'

export default props => {
    const item = props.list
    return (
        <li key={item.id}>
            <Avatar src={item.author.avatar_url} />
            <Link to={`/article/${item.id}`}>
                <a>{item.title}</a>
            </Link>
        </li>
    )
}
