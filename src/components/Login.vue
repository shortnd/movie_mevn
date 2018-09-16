<template>
  <v-form v-model="valid" ref="form" lazy-validation>
    <v-text-field
      label="Email"
      v-model="email"
      :rules="emailRules"
      type="email"
      required></v-text-field>
    <v-text-field
      label="password"
      v-model="password"
      type="password"
      required></v-text-field>
    <v-btn
      @click="submit"
      :disable="!valid">submit</v-btn>
    <v-btn @click="clear">clear</v-btn>
  </v-form>
</template>

<script>
import axios from 'axios';

export default {
  data: () => ({
    email: '',
    password: '',
    emailRules: [
      v => !!v || 'E-mail is required',
      v => /\S+@\S+\.\S+/.text(v) || 'E-mail must be valid',
    ],
  }),
  methods: {
    async submit() {
      return axios.post('http://localhost:8081/users/login', {
        email: this.email,
        password: this.password,
      }, { headers: {
        'Content-Type': 'application/json',
      } })
        .then((response) => {
          window.localStorage.setItem('auth', response.data.token);
          this.$swal('Great', 'You are ready to start!', 'success');
          this.$router.push({ name: 'Home' });
        })
        .catch((error) => {
          const message = error.response.data.message;
          this.$swal('Oh no!', `${message}`, 'error');
          this.$router.push({ name: 'Login' });
        });
    },
    clear() {
      this.$refs.form.reset();
    },
  },
};
</script>

<style>

</style>
