<template>
  <q-page class="q-pa-md">

    <div class="text-center">
        <p v-if="getSession.name" class="text-h5"> connecter en tant que: <u><strong>{{ getSession.name }}</strong></u></p>
        <p v-else class="text-h5"> vous n'avez pas de session </p>
        <q-btn v-if="getSession.name" label='Se déconnecter' color='red' @click=" logout()"></q-btn>
    </div>

    <loginComp />

    <listUsers />

  </q-page>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'PageIndex',
  components: {
    loginComp: () => import('../components/login'),
    listUsers: () => import('../components/listUsers')
  },
  methods: {
    ...mapActions('auth', ['httpCheckApi', 'logout'])
  },
  computed: {
    ...mapGetters('auth', ['getSession'])
  },
  mounted() {
    this.httpCheckApi()
  }
}
</script>
