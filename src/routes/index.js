import Login from "pages/auth/Login"
import Register from "pages/auth/Register"
import ReqResetPassword from "pages/auth/ReqResetPassword"
import ResetPassword from "pages/auth/ResetPassword"
import Verify from "pages/auth/Verify"
import CategoryList from "pages/category/CategoryList"
import Dashboard from "pages/dashboard/Dashboard"
import TableDetail from "pages/note/table/TableDetail"
import TableList from "pages/note/table/TableList"
import TextList from "pages/note/text/TextList"
import Setting from "pages/setting/Setting"

// export const demoRoutes = [
//     { path: '/dashboard', component:<div className="page-title">Dashboard</div>},
//     { path: '/menu-1', component:<div className="page-title">Menu 1</div>},
//     { path: '/menu-2', component:<div className="page-title">Menu 2</div>},
//     { path: '/menu-3', component:<div className="page-title">Menu 3</div>},
//     { path: '/menu-3/submenu-1', component:<div className="page-title">Submenu 3 - 1</div>},
//     { path: '/menu-3/submenu-2', component:<div className="page-title">Submenu 3 - 2</div>},
//     { path: '/menu-4', component:<div className="page-title">Menu 4</div>},
//     { path: '/menu-4/submenu-1', component:<div className="page-title">Submenu 4 - 1</div>},
//     { path: '/menu-4/submenu-2', component:<div className="page-title">Submenu 4 - 2</div>},
// ]

// USER BEFORE LOGGED IN
export const authRoutes = [
    { path: '/login', component: (<Login />) },
    { path: '/register', component: (<Register />) },
    { path: '/register/verify', component: (<Verify />) },
    { path: '/req-reset-password', component: (<ReqResetPassword />) },
    { path: '/reset-password', component: (<ResetPassword />) },
]

// USER BEFORE LOGGED IN
export const protectedRoutes = [
    { path: '/dashboard', component: (<Dashboard />)},
    { path: '/categories', component: (<CategoryList />)},
    { path: '/notes', component:<div className="page-title">Notes</div>},
    { path: '/notes/text', component: (<TextList />)},
    { path: '/notes/table', component:(<TableList />)},
    { path: '/notes/table/:id', component:(<TableDetail />)},
    { path: '/setting', component:(<Setting />)},
]