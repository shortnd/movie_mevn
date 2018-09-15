<template>
  <v-form v-model="valid" ref="form" lazy-validation>
    <v-text-field
      label="Movie Name"
      v-model="name"
      :rules="nameRules"
      required></v-text-field>
    <v-textarea
      name="input-7-1"
      label="Movie Description"
      v-model="description"></v-textarea>
    <v-select
      label="Movie Release Year"
      v-model="release_year"
      :items="years"></v-select>
    <v-text-field
      label="Movie Genre"
      v-model="genre"
      ></v-text-field>
    <v-btn
      @click="submit"
      :disable="!valid">Submit</v-btn>
    <v-btn @click="clear">clear</v-btn>
  </v-form>
</template>

<script>
import axios from 'axios';

export default {
  data: () => ({
    valid: true,
    name: '',
    description: '',
    genre: '',
    release_year: '',
    nameRules: [
      v => !!v || 'Movie name is required',
    ],
    select: null,
    years: [
      '2018',
      '2017',
      '2016',
      '2015',
    ],
  }),
  methods: {
    submit() {
      if (this.$refs.form.validate()) {
        return axios.post('http://localhost:8081/movies', {
          name: this.name,
          description: this.description,
          release_year: this.release_year,
          genre: this.genre,
        }, { headers: { 'Content-Type': 'application/json' } })
          .then(() => {
            this.$router.push({ name: 'Home' });
            this.$refs.form.reset();
          })
          .catch(() => {
            //
          });
      }
      return true;
    },
    clear() {
      this.$refs.form.reset();
    },
  },
};
</script>

<style>

</style>
