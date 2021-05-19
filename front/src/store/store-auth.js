import axios from 'axios'

// Nos state nous permete d'avoir des variables global (accessible depuis toute notre application)
const state = {
    session: {},
    flash: '',
    flashApi: ''
}

// Nos mutations nous permet de changer les valeur de nos state
const mutations = {
    setSession(state, value) {
        state.session = value
    },
    setFlash(state, value) {
        state.flash = value
    }
}

// Nos actions nous permettent d'avoir des fonctions disponible partout dans notre application
const actions = {
    // Requètes Check API
    async httpCheckApi({ commit }) {
        if (!localStorage.getItem('user-token')) {
            await axios.post('/checkapi').then(res => {
                commit('setFlash', res.data.message)
            }).catch(err => console.log(err))
        } else {
            await axios.post('/checkapi', { token: localStorage.getItem('user-token') }).then(res => {
                commit('setFlash', res.data.message)
            }).catch(err => console.log(err))
        }
    },
    // Requètes Check Session (App.vue)
    async httpCheckSession({ commit }) {
        if (!localStorage.getItem('user-token')) {
            await axios.post('/checksession').then(res => {
                commit('setFlash', res.data.message)
            }).catch(err => console.log(err))
        } else {
            await axios.post('/checksession', { token: localStorage.getItem('user-token') }).then(res => {
                commit('setSession', res.data.session)
                commit('setFlash', res.data.message)
            }).catch(err => console.log(err))
        }
    },
    // Requètes Login
    async httpFormLogin({ commit }, payload) {
        await axios.post('/login', payload).then(res => {
            if (res.data.token) {
                // Ici on entre la value du token dans le localstorage
                localStorage.setItem('user-token', res.data.token)
                // On change le state de la liste d'utilisateurs
                commit('user/setListUsers', res.data.dbFront, { root: true })
                // On change le state de session
                commit('setSession', res.data.session)
                // On change le state de flash
                commit('setFlash', res.data.message)
            } else {
                // On change le state de flash
                commit('setFlash', 'Aucun utilisateur n\'a été trouver !    ')
            }
        }).catch(err => console.log(err))
    },
    // Requètes Register
    async httpFormRegister({ commit }, payload) {
        await axios.post('/register', payload).then(res => {
            commit('setFlash', res.data.message)
        }).catch(err => console.log(err))
    },
    // Fonction pour se déconnecter
    logout () {
        // On supprime le token en localstorage
        localStorage.removeItem('user-token')
        // Et on force le refresh pour allez sur '/'
        this.$router.go({ path: '/' })
    }
}

// Nos getters sont à l'écoute de tout nos changement d'état des state
const getters = {
    getSession: state => {
        return state.session
    },
    getFlashAuth: state => {
        return state.flash
    }
}

// On exporte nos constante pour quel soit lu par notre Vue.Store (./index.js)
export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters,
}