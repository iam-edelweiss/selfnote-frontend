import { configureStore } from '@reduxjs/toolkit'
import Layout from 'store/layout'
import Auth from 'store/Authentication/authSlice'
import User from 'store/User/userSlice'
import Note from 'store/Note/noteSlice'
import Category from 'store/Category/categorySlice'

export const store = configureStore({
  reducer: {
    Layout,

    Auth,
    User,
    Note,
    Category,
  },
})