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
export default {

};
</script>

<style>

</style>
