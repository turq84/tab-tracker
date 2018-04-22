<template>
  <div>
    <v-layout center>
      <v-flex xs6 offset-xs3>
        <div class="white elevation-2">
          <v-toolbar flat dense class="lime" dark>
            <v-toolbar-title>Register</v-toolbar-title>
          </v-toolbar>
          <div class="pl-4 pr-4 pt-2 pb-2">
            <form name="tab-tracker-form" autocomplete="off">
              <v-text-field
                label="Email"
                v-model="email"
              ></v-text-field>
              <v-text-field
                label="Password"
                type="password"
                v-model="password"
              ></v-text-field>
          </form>
          <div class="error" v-html="error"></div>
          <br>
          <v-btn class="lime" @click="register" dark>Register</v-btn>
          </div>
        </div>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
import AuthenticationService from '../../services/AuthenticationService'
export default {
  data () {
    return {
      email: '',
      password: '',
      error: null
    }
  },
  methods: {
    async register () {
      try {
        await AuthenticationService.register({
          email: this.email,
          password: this.password
        })
      } catch (error) {
        this.error = error.response.data.error
      }
    }
  }
}
</script>

<style scoped>
  .error{
    color: red;
  }
</style>
