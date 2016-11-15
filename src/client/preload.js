import About from './components/About'
import Login from './components/Account/Login'
import Logout from './components/Account/Logout'

// All your server side prefetching is done here
// When a route is matched, the static function is executed
const routes = [
    {
        pattern: '/page/about',
        execute: About.onEnter
    },
    {
        pattern: '/page/login',
        execute: Login.onEnter
    },
    {
        pattern: '/page/logout',
        execute: Logout.onEnter
    }
]

// Execute server-side async methods to refetch data
export default (stores) => {
    return Promise.all(routes.map(route => route.execute(stores)))
}
