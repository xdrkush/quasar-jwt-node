import axios from 'axios'

const state = {
    user: {}
}

const mutations = {
    setUser(state, value) {
        state.user = value
    }
}

const actions = {
    async httpGetUser({ commit }, payload) {
        console.log('httpGetUser: ', payload )
        await axios.get('/getuser/' + payload)
            .then(res => {
                console.log('GetListUsers RES: ', res)
                commit('setUser', res.data.result)
                this.$router.push({ path: `/${res.data.result.id}` })
            })
    }
}

const getters = {
    getUser: state => {
        return state.user
    }
}

export default {
    state,
    mutations,
    actions,
    getters,
    namespaced: true
}