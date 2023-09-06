<template>
  <v-container fluid>
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
        @click="()=>this.$router.push('/anonymous-boards')"
        >
        anonymous-boards
        </v-btn>

        <v-btn
        class="pl-2"
        text
        @click="()=>this.$router.push('/boards/1/modify')"
        >
        modify
        </v-btn>


        <v-btn
        v-if="canCreatePost"
        right 
        absolute
        @click="()=>this.$router.push({name:'CreatePost'})"
        >
          Create Post
        </v-btn>

      </v-col>
    </v-row>

    <v-row>
      <!-- 중첩 라우트의 children에 따라 원하는 Component를 렌더링 -->
      <router-view></router-view>
    </v-row>
  </v-container>
</template>
  
  <script>
  export default {
    name: "AnonymousBoardPageLayout",
    computed: {
      canCreatePost() {
        return this.$route.path == '/anonymous-boards/' || this.$route.path == '/anonymous-boards'
      },
    }
  }
  </script>
  
  <style scoped>
  
  </style>