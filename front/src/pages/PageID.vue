<template>
  <q-page class="q-pa-md">

    <p>Page ID</p>

    <p class="text-h5">Nom: {{ getUser.name }} </p>
    <p class="text-h6">Email: {{ getUser.email }} </p>

    <listUsers title="Liste utilisateur" />

  </q-page>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'PageID',
  components: {
    listUsers: () => import('../components/listUsers')
  },
  computed: {
    ...mapGetters('user', ['getUser'])
  }
}
</script>
