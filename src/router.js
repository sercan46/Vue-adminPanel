import Vue from 'vue';

import Product from './components/Products/Product'
import Category from './components/Category/Category'
import About from './components/About/About'
import Dashboard from './components/Dashboard/Dashboard'
import Autho from './components/Autho/Autho'
import store from './store'
import VueRouter from "vue-router"

Vue.use(VueRouter)

export const router = new VueRouter({
    routes: [
        {
            path: '/', component: Product, beforeEnter(to, from, next) {
                if (store.getters.isAuthenticated) {
                    next()
                }
                else {
                    next("/auth")
                }
            }
        },

        {
            path: '/kategori', component: Category, beforeEnter(to, from, next) {
                if (store.getters.isAuthenticated) {
                    next()
                }
                else {
                    next("/auth")
                }
            }
        },
        {
            path: '/hakkimizda', component: About, beforeEnter(to, from, next) {
                if (store.getters.isAuthenticated) {
                    next()
                }
                else {
                    next("/auth")
                }
            }
        },
        {
            path: '/dashboard', component: Dashboard, beforeEnter(to, from, next) {
                if (store.getters.isAuthenticated) {
                    next()
                }
                else {
                    next("/auth")
                }
            }
        },
        {
            path: '*', component: Product, beforeEnter(to, from, next) {
                if (store.getters.isAuthenticated) {
                    next()
                }
                else {
                    next("/auth")
                }
            }
        },
        { path: '/auth', component: Autho },
    ],
    mode: "history"
})