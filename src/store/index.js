import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        token: '',
        id: null,
    },
    mutations: {
        setToken(state, token) {
            if (token) {
                state.token = token;
                window.localStorage.setItem('token', token)
                    // console.log("token", token)
                    // Vue.$cookies.set(
                    //     `${process.env.VUE_APP_SOURCE}.token`,
                    //     token,
                    //     '7d',
                    //     '/',
                    //     rootDomain
                    // );
            }
        },
        clearToken(state) {
            state.token = '';
            window.localStorage.removeItem('token');
        },
        setUserInfo(state, playload) {
            if (playload.id) {
                state.id = playload.id;
                window.localStorage.setItem('id', playload.id)
                    // console.log("token", token)
                    // Vue.$cookies.set(
                    //     `${process.env.VUE_APP_SOURCE}.token`,
                    //     token,
                    //     '7d',
                    //     '/',
                    //     rootDomain
                    // );
            }

        },
        clearUserInfo(state) {
            state.id = null;
        }
    },
    getters: {
        getToken(state) {
            if (!state.token) {
                const getCookieToken = window.localStorage.getItem('token')
                if (!getCookieToken) {
                    return null;
                }
                state.token = getCookieToken;
            }
            return state.token;
        },
        getUserInfo(state) {
            if (!state.id) {
                const getId = window.localStorage.getItem('id')
                if (!getId) {
                    return null;
                }
                state.id = getId;
            }
            return state.id;
        }
    },
    actions: {},
    modules: {}
});

// function clearToken(state) {
//     state.token = '';
//     localStorage.removeItem('token');
//     // Vue.$cookies.remove(`${process.env.VUE_APP_SOURCE}.token`, '/', rootDomain);
// }