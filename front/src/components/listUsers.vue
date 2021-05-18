<template>
  <div>
    <p v-if="$props.title" class="text-h6"> {{ title }} </p>

    <q-list v-if='getListUsers' bordered>

      <q-item clickable tag='a' @click='changeId(user.id)' v-ripple :key='user.name' v-for='user in getListUsers'>
        <q-item-section avatar>
          <q-icon color="primary" name="fas fa-user" />
        </q-item-section>

        <q-item-section>id: {{ user.id }}</q-item-section>
        <q-item-section>nom: {{ user.name }}</q-item-section>
        <q-item-section>email: {{ user.email }}</q-item-section>
      </q-item>

    </q-list>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
    name: 'listUsers',
    methods: {
      changeId (id) {
        this.httpGetUser(id)
      },
      ...mapActions('auth', ['httpGetListUsers']),
      ...mapActions('user', ['httpGetUser'])
    },
    computed: {
        ...mapGetters('auth', ['getListUsers'])
    },
    props: {
      title: String
    },
    mounted () {
      this.httpGetListUsers()
    }
}
</script>
