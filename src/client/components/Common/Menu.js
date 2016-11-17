import React from 'react'
import { observer } from 'mobx-react'
import { Link } from 'react-router'

@observer(['account'])
class Menu extends React.Component {
    render() {
        const { account } = this.props
        return (
            <div>
                <img src='a.png' />
                {account.isLoggedIn()
                    ? <LoggedInMenu/>
                    : <LoggedOutMenu/>
                }
            </div>
        )
    }
}

function LoggedInMenu() {
    return <menu>
        <Link activeClassName="selected" to="/">Browse</Link>
        <Link activeClassName="selected" to="/page/about">About</Link>
        <Link activeClassName="selected" to="/page/logout">Logout</Link>
    </menu>
}

function LoggedOutMenu() {
    return <menu>
        <Link activeClassName="selected" to="/">Browse</Link>
        <Link activeClassName="selected" to="/page/about">About</Link>
        <Link activeClassName="selected" to="/page/register">Register</Link>
        <Link activeClassName="selected" to="/page/login">Login</Link>
    </menu>
}

export default Menu
