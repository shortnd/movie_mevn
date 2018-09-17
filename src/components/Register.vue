<template>
  <v-form v-model="valid" ref="form" lazy-validation>
    <v-text-field
      label="Name"
      v-model="name"
      required></v-text-field>
    <v-text-field
      label="Email"
      v-model="email"
      :rules="emailRules"
      reqiured></v-text-field>
    <v-text-field
      label="Password"
      v-model="password"
      reqiured></v-text-field>
    <v-text-field
      name="input-7-1"
      label="Confirm Password"
      v-model="confirm_password"></v-text-field>
      <v-btn @click="submit" :disable="!valid">submit</v-btn>
      <v-btn @click="clear">clear</v-btn>
  </v-form>
</template>

<script>
import axios from 'axios';

export default {
  data: () => ({
    valid: true,
    name: '',
    email: '',
    password: '',
    confirm_password: '',
    emailRules: [
      v => !!v || 'E-email is required',
      v => /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'E-email must be valid',
    ],
  }),
  methods: {
    async submit() {
      if (this.$refs.form.validate()) {
        return axios.post('/users/register', {
          name: this.name,
          email: this.email,
          password: this.password,
        }, { headers: { 'Content-Type': 'application/json' } })
          .then(() => {
            this.$swal(
              'Great!',
              'You have successfully been registered!',
              'success',
            );
            this.$router.push({ name: 'Login' });
          })
          .catch((error) => {
            const message = error.response.data.message;
            this.$swal('Oh no!', `${message}`, 'error');
          });
      }
      return true;
    },
    async clear() {
      this.$refs.form.reset();
    },
  },
};
</script>

<style>

</style>
