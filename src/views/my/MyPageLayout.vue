<template>
  <v-container fluid>
    <div>
        <v-row
          align="start"
        >
          <v-col class="pb-0 pl-0">
            <v-btn link to="/" text class="px-0" >
              home
            </v-btn>
            
            <v-icon>mdi-chevron-right</v-icon>
            
            <v-btn
            class="pl-2"
            text
            @click="()=>this.$router.push({name:'MyPageHome'})"
            >
            mypage
            </v-btn>

          </v-col>
        </v-row>

        <v-row>
          <router-view />
        </v-row>
    </div>
  </v-container>
  </template>
  
  <script>
  export default {
    name: "MyPageLayout"
  }
  </script>
  
  <style scoped>
  
  </style>