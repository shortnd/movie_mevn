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
      :items="years"
      required
      :rules="releaseRules"></v-select>
    <v-text-field
      label="Movie Length"
      v-model="movie_length"
      required></v-text-field>
    <v-text-field
      label="Movie Genre"
      v-model="genre"
      required
      :rules="genreRules"
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
    movie_length: '',
    genre: '',
    release_year: '',
    nameRules: [
      v => !!v || 'Movie name is required',
    ],
    genreRules: [
      v => !!v || 'Movie genre year is required',
      v => (v && v.length <= 80) || 'Genre must be less than equal to 80 characters.',
    ],
    releaseRules: [
      v => !!v || 'Movies release yar is required',
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
        return axios.post('/movies/add', {
          name: this.name,
          description: this.description,
          release_year: this.release_year,
          movie_length: this.movie_length,
          genre: this.genre,
        }, { headers: { 'Content-Type': 'application/json' } })
          .then(() => {
            this.$swal(
              'Great',
              'Movie added succesfully!',
              'success',
            );
            this.$router.push({ name: 'Home' });
            this.$refs.form.reset();
          })
          .catch(() => {
            this.$swal(
              'Oh no!',
              'Could not add this movie!',
              'error',
            );
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
