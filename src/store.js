import Vue from 'vue'
import Vuex from 'vuex'
import { router } from './router'
import VueResource from 'vue-resource'
import VueRouter from 'vue-router';

Vue.use(Vuex)
Vue.use(VueResource)
Vue.use(VueRouter)

const store = new Vuex.Store({
    state: {
        token: "",
        fbApiKey: "AIzaSyAHwzqZYgLFwthZI7oo1jf-SRh3lZZIo-g"
    },
    mutations: {
        setToken(state, token) {
            state.token = token
        },
        clearToken(state) {
            state.token = ""
        }
    },
    actions: {
        initAuth({ commit, dispatch }) {
            let token = localStorage.getItem("token")
            if (token) {
                commit("setToken", token)
                 router.push("/")

            }
            else {
                console.log('else girdi')
                router.push("/auth")
                return false
            }
        }, login({ commit, dispatch, state }, authData) {
            let authLink = "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=";
            return Vue.http.post(authLink + "AIzaSyAHwzqZYgLFwthZI7oo1jf-SRh3lZZIo-g",
                { email: authData.email, password: authData.password, returnSecureToken: true }).then((resp) => {
                    commit("setToken", resp.data.idToken)
                    localStorage.setItem("token", resp.data.idToken)
                })
        },
        logout({ commit, dispatch, state }) {
            commit("clearToken")
            localStorage.removeItem("token")
            router.replace("/auth")

        }
    },
    getters: {
        isAuthenticated(state) {
            return state.token !== ""
        }
    }


})
export default store