// export const BASEURL =  `${process.env.REACT_APP_BACKENDURL ?? "https://dark-pear-pigeon-cuff.cyclic.app/api"}`
export const BASEURL = process.env.REACT_APP_ENV === 'development' ? process.env.REACT_APP_BACKENDURL_DEVELOPMENT : process.env.REACT_APP_BACKENDURL_PRODUCTION

// AUTHENTICATION
export const LOGIN = `/login`
export const LOGOUT = `/logout`
export const LOGOUT_ALL = `/logout-all-sessions`
export const REFRESH_TOKEN = `/refresh-token`
export const REGISTER = `/register`
export const VERIFY_REGISTRATION = `/register/verification`
export const REQUEST_RESET_PASSWORD= `/request-reset-password`
export const RESET_PASSWORD= `/reset-password`

// USER
export const USER = `/user`
export const USER_UPDATE = `/user`
export const CHANGE_PASSWORD = `/user/change-password`
export const REMOVE_ACCOUNT = `/user/remove-account`

// TEXTNOTE
export const GET_TEXTNOTES = '/notes/text'
export const GET_TEXTNOTE = '/notes/text'
export const CREATE_TEXTNOTES = '/notes/text/create'
export const UPDATE_TEXTNOTES = '/notes/text'
export const DELETE_TEXTNOTES = '/notes/text'
// TABLENOTE
export const GET_TABLENOTES = '/notes/table'
export const GET_TABLENOTE = '/notes/table'
export const CREATE_TABLENOTES = '/notes/table'
export const UPDATE_TABLENOTES = '/notes/table'
export const DELETE_TABLENOTES = '/notes/table'
export const INSERT_TO_TABLE = '/notes/table'
export const DELETE_ROW = '/notes/table'
export const UPDATE_ROW = '/notes/table'

// STATISTIC
export const NOTE_STATISTIC = '/statistic/note'
export const CATEGORY_STATISTIC = '/statistic/category'

// CATEGORY
export const GET_CATEGORIES = '/categories'
export const CREATE_CATEGORIES = '/categories'
export const UPDATE_CATEGORIES = '/categories'
export const DELETE_CATEGORIES = '/categories'