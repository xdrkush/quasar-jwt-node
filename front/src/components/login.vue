<template>
  <div class="q-pa-md q-gutter-sm text-center">

    <q-tabs
      v-model="tab"
      class="text-teal"
    >
      <q-tab name="login" icon="fas fa-user" label="Login" />
      <q-tab name="register" icon="fas fa-address-card" label="Register" />
    </q-tabs>

    <p v-if='getFlashAuth' class="text-h6"> {{ getFlashAuth }} </p>

    <q-tab-panels
      v-model="tab"
      animated
      swipeable
      vertical
      transition-prev="jump-up"
      transition-next="jump-up"
    >
      <q-tab-panel name="login">
        <!-- SLIDE CONNEXION -->
        <q-form
          @submit="formLogin"
          @reset="onReset"
          class=" q-pa-xl q-gutter-md"
        >
          <p class="text-h6 text-teal-8 text-bold">Login</p>
          <!-- INPUT USERNAME  -->
          <q-input
            bg-color="teal-13"
            filled
            no-error-icon
            v-model="form.name"
            label="Your username *"
            hint=""
            :rules="[
              val => (val && val.length > 0) || 'Please type something'
            ]"
          />
          <!-- INPUT PASSWORD -->
          <q-input
            bg-color="teal-13"
            filled
            type="password"
            v-model="form.password"
            label="Your Password *"
            lazy-rules
            :rules="[
              val =>
                (val !== null && val !== '') || 'Please type your password'
              ]"
          />
          <q-toggle
            v-model="accept"
            class="text-yellow-1"
            label="I accept the license and terms"
          />
          <div>
            <q-btn label="Submit" type="submit" color="teal-14" />
            <q-btn
              label="Reset"
              type="reset"
              color="teal-12"
              flat
              class="q-ml-sm"
            />
          </div>
        </q-form>
      </q-tab-panel>

      <q-tab-panel name="register">
        <!-- SLIDE CONNEXION -->
        <q-form
          @submit="formRegister"
          @reset="onReset"
          class=" q-pa-xl q-gutter-md"
        >
          <p class="text-h6 text-teal-8 text-bold">Register</p>
          <!-- INPUT USERNAME  -->
          <q-input
            bg-color="teal-13"
            filled
            no-error-icon
            v-model="form.name"
            label="Your username *"
            hint=""
            :rules="[
              val => (val && val.length > 0) || 'Please type something'
            ]"
          />
          <!-- INPUT PASSWORD -->
          <q-input
            bg-color="teal-13"
            filled
            type="email"
            v-model="form.email"
            label="Your Email *"
            lazy-rules
            :rules="[
              val =>
                (val !== null && val !== '') || 'Please type your password'
              ]"
          />

          <!-- INPUT Password  -->
          <q-input
            bg-color="teal-13"
            filled
            no-error-icon
            v-model="form.password" 
            label="Your Password *"
            hint=""
            :rules="[
              val => (val && val.length > 0) || 'Please type something'
            ]"
          />
          <!-- INPUT PASSConfirm -->
          <q-input
            bg-color="teal-13"
            filled
            type="password"
            v-model="form.passConfirm"
            label="Confirm Password *"
            lazy-rules
            :rules="[
              val =>
                (val !== null && val !== '') || 'Please type your password'
              ]"
          />

          <q-toggle
            v-model="accept"
            class="text-yellow-1"
            label="I accept the license and terms"
          />

          <div>
            <q-btn label="Submit" type="submit" color="teal-14" />
            <q-btn
              label="Reset"
              type="reset"
              color="teal-12"
              flat
              class="q-ml-sm"
            />
          </div>
        </q-form>
      </q-tab-panel>
    </q-tab-panels>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  data() {
    return {
      tab: 'login',
      form: {
        name: "test",
        email: "test@test.test",
        password: "test",
        passConfirm: "test"
      },
      accept: false
    }
  },
  methods: {
    formLogin () {
      if (this.accept !== true) alert("Accepte !")
      else this.httpFormLogin(this.form)
    },
    formRegister () {
      if (this.accept !== true) alert("Accepte !")
      else this.httpFormRegister(this.form)
    },
    onReset() {
      this.form.name = ""
      this.form.accept = false
      this.form.email = ""
      this.form.password = ""
      this.form.passConfirm = ""
    },
    ...mapActions("auth", ["httpFormLogin", "httpFormRegister"])
  },
  computed: {
    ...mapGetters('auth', ['getFlashAuth'])
  }
}
</script>
