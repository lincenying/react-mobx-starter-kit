import React from 'react'
import NavLink from 'react-router-dom/NavLink'

const Nav = () => {
    return (
        <h1>
            <NavLink to="/" exact activeClassName="current">
                列表
            </NavLink>
        </h1>
    )
}

export default Nav
