<template>
  <v-layout row wrap>
    <v-flex xs4>
      <v-card>
        <v-card-title primary-title>
          <div>
            <div class="headline">{{ movie.name }}</div>
            <span class="grey--text">{{ movie.release_year }} &bull;
              {{ movie.genre }} &bull;
              {{ movie.movie_length }}</span>
          </div>
        </v-card-title>
        <h6 class="card-title">Rate this movie</h6>
        <v-card-text>
          {{ movie.description }}
        </v-card-text>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import axios from 'axios';

export default {
  name: 'Movie',
  data() {
    return {
      movie: [],
    };
  },
  mounted() {
    this.fetchMovie();
  },
  methods: {
    async fetchMovie() {
      return axios.get(`http://localhost:8081/movies/${this.$route.params.id}`).then((response) => {
        this.movie = response.data;
      }).catch(() => {
      });
    },
  },
};
</script>

<style>

</style>
