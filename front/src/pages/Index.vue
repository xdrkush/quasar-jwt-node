<template>
  <q-page class="q-pa-md">

    <loginComp />

    <listUsers />

  </q-page>
</template>

<script>
export default {
  name: 'PageIndex',
  components: {
    loginComp: () => import('../components/login'),
    listUsers: () => import('../components/listUsers')
  }
}
</script>
