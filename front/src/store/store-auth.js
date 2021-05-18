import axios from 'axios'

const state = {
    listUsers: [],
    flash: ''
}

const mutations = {
    setListUsers(state, value) {
        state.listUsers = value
    },
    setFlash(state, value) {
        state.flash = value
    }
}

const actions = {
    async httpFormLogin({ commit }, payload) {
        await axios.post('/login', payload).then(res => {
            console.log('Login RES: ', res)
            localStorage.setItem('user-token', res.data.token)
            commit('setListUsers', res.data.result)
            commit('setFlash', res.data.message)
        }).catch(err => console.log(err))
    },
    async httpFormRegister({ commit }, payload) {
        await axios.post('/register', payload).then(res => {
            console.log('Register RES: ', res)
            commit('setListUsers', res.data.result)
            commit('setFlash', res.data.message)
        }).catch(err => console.log(err))
    },
    async httpGetListUsers({ commit }) {
        await axios.get('/getlistusers/' + localStorage.getItem('user-token'))
            .then(res => {
                console.log('GetListUsers RES: ', res)
                commit('setListUsers', res.data.result)
                commit('setFlash', res.data.message)
            })
    }
}

const getters = {
    getListUsers: state => {
        return state.listUsers
    },
    getFlash: state => {
        return state.flash
    }
}

export default {
    state,
    mutations,
    actions,
    getters,
    namespaced: true
}