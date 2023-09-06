<template>
  <v-container fluid>
    <v-row>
      <div
      style="height: 50px;"
      >

      </div>
    </v-row>

    <v-row>
      <v-col cols="12" class="d-flex justify-center">
          <v-card
          class=""
          height="450px"
          width="650px"
          elevation="9"
          >
            <v-row>
              <div
              style="height: 80px;"
              />
            </v-row>
    
            <v-row>
              <v-col class="mx-10" align-self="center">
                <h3>Email</h3>    
              </v-col>

              <v-col class="mx-10">
                <v-text-field
                disabled
                :label="user.email"
                />
              </v-col>
            </v-row>
            
            <v-row class="py-8">
              <v-col class="mx-10" align-self="center">
                <h3>닉네임</h3>  
              </v-col>

              <v-col class="mx-10" align-self="center">
                <h3>{{ user.name}}</h3>  
              </v-col>
            </v-row>
    
            <v-row class="py-8">
              <v-col class="mx-10">
                <h3 @click="$router.push($route.path + '/posts')">
                  내가 쓴 글</h3>  
              </v-col>

              <v-col class="mx-10 d-flex">
                <h3>{{ user.posts.length }}</h3>  
                  <v-icon @click="$router.push($route.path + '/posts')">
                    mdi-open-in-new
                  </v-icon>
              </v-col>
            </v-row>
    
          </v-card>
      </v-col>


    </v-row>

  </v-container>
</template>

<script>
import postsData from "/src/data/posts.json"

export default {
  name: "MyPageHomeView",
  data() {
    return {
      user: {
        name: '으라차차김민규',
        posts: postsData,
        email: 'alsrbtls88@gmail.com',

      }
    }
  }
}
</script>

<style scoped>

</style>