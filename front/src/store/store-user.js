import axios from 'axios'

// Nos state nous permete d'avoir des variables global (accessible depuis toute notre application)
const state = {
    listUsers: [],
    user: {}
}

// Nos mutations nous permet de changer les valeur de nos state
const mutations = {
    setListUsers(state, value) {
        state.listUsers = value
    },
    setUser(state, value) {
        state.user = value
    }
}

// Nos actions nous permettent d'avoir des fonctions disponible partout dans notre application
const actions = {
    // Requète pour demande un user selectionner par son id
    async httpGetUser({ commit }, payload) {
        // Gestion errer si on demande la meme page que la ou on est
        if ( Number(this.$router.app._route.params.id) === Number(payload)) return
        // Ici on gère l'erreur en cas qu'il n'y es pas de token dans le local storage
        if (!localStorage.getItem('user-token')) {
            commit('auth/setFlash', res.data.message, { root: true })
        // Ici on envoi notre requète avec l'id dans payload pour get notre USER
        } else await axios.post('/getuser/' + payload, { token: localStorage.getItem('user-token') }).then(res => {
            // Ici on gère l'erreur
            if (res.status !== 200 || res.data.error) {
                commit('auth/setFlash', res.data.message, { root: true })
            // Ici on affiche notre résultat de la requète
            } else {
                commit('setUser', res.data.result)
                commit('auth/setFlash', res.data.message, { root: true })
                this.$router.push({ path: `/${res.data.result.id}` })
            }
        })
    },
    // Requètes Récupération de la liste des user
    async httpGetListUsers({ commit }) {
        // Ici on gère l'erreur en cas qu'il n'y es pas de token dans le local storage
        if (!localStorage.getItem('user-token')) {
            commit('auth/setFlash', 'Vous n\'avez pas de token', { root: true })
        // Ici on envoie la requete pour récupérer notre liste d'utilisateur
        } else await axios.post('/getlistusers', { token: localStorage.getItem('user-token') })
            .then(res => {
                // Ici on gère l'erreur
                if (res.status !== 200 || res.data.error) {
                    commit('auth/setFlash', res.data.message, { root: true })
                    localStorage.removeItem('user-token')
                // Ici on affiche notre résultat
                } else {
                    commit('setListUsers', res.data.result)
                    commit('auth/setFlash', res.data.message, { root: true })
                }
            })
    }
}

// Nos getters sont à l'écoute de tout nos changement d'état des state
const getters = {
    // Ici on affiche notre liste d'utilisateur
    getListUsers: state => {
        return state.listUsers
    },
    // Ici on affiche notre utilisateur (page ID)
    getUser: state => {
        return state.user
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