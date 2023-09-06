<template>
  <v-container fluid class="pa-4 pa-sm-6 pa-md-8">
    <h1 class="pa-4">MainPageLayout</h1>
    <v-row class="grey">
      <v-col>
        <v-btn
        to="/signup"
        color="primary"
        dark
        >
        SIGN UP
      </v-btn>
    </v-col>  
  </v-row>
  
  <router-view />
  
  </v-container>
  </template>
  
  <script>
  export default {
    name: "MainPageLayout",
  }
  </script>
  
  <style scoped>
  
  </style>