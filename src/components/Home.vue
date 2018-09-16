<template>
  <v-layout row wrap>
    <v-flex xs4 v-for="movie in movies" :key="movie._id">
      <v-card>
        <v-card-title primary-title>
          <div>
            <div class="headline">
              <v-btn flat :to="`/movies/${movie._id}`">
              {{ movie.name }}
              </v-btn>
            </div>
            <span class="grey--text">
              {{ movie.release_year }} &bull;
              {{ movie.genre }} &bull;
              {{ movie.movie_length }}</span>
          </div>
        </v-card-title>
        <v-card-text>
          {{ movie.description }}
        </v-card-text>
        <v-card-actions>
          <v-btn flat color="purple">Rate this movie</v-btn>
          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import axios from 'axios';

export default {
  name: 'HelloWorld',
  data() {
    return {
      movies: [],
    };
  },
  mounted() {
    this.fetchMovies();
  },
  methods: {
    async fetchMovies() {
      const token = window.localStorage.getItem('auth');
      return axios.get('http://localhost:8081/movies', { headers: { Authorization: `JWT ${token}`, 'Content-Type': 'application/json' },
      }).then((response) => {
        this.movies = response.data.movies;
        this.current_user = response.data.current_user;
      }).catch(() => {});
    },
  },
};
</script>

<style>
</style>
