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
          height="500px"
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
                :label="username"
                />
              </v-col>
            </v-row>
            
            <v-row class="py-6">
              <v-col class="mx-10" align-self="center">
                <h3>닉네임</h3>  
              </v-col>

              <v-col class="mx-10" align-self="center">
                <h3>{{ nickname}}</h3>  
              </v-col>
            </v-row>
    
            <v-row class="py-6">
              <v-col class="mx-10">
                <h3 @click="$router.push({name: 'UserContents'})">
                  나의 컨텐츠</h3>  
              </v-col>

              <v-col class="mx-10 d-flex">
                <h3>{{ totalCount }}</h3>  
                  <v-icon @click="$router.push({name: 'UserContents'})">
                    mdi-open-in-new
                  </v-icon>
              </v-col>
            </v-row>
            
            <v-row class="py-2">
              <v-col class="mx-6">
                <v-btn 
                text
                @click="withdrawalUser"
                class="red--text"
                >
                  <h3> 회원탈퇴 </h3>  
                </v-btn>
              </v-col>

            </v-row>
          </v-card>
      </v-col>


    </v-row>

  </v-container>
</template>

<script>
import { mapActions, mapGetters, mapState } from 'vuex'

const MYPAGE_STORE = 'myPageStore'
const USER_STORE = 'userStore'

export default {
  name: "MyPageHomeView",
  created() {
    this.fetch()
  },

  methods: {
    ...mapActions(
      MYPAGE_STORE, 
      {
        fetch: 'fetchMyPage'
      }
    ),
    ...mapActions(
      USER_STORE, 
      {
        withdrawal: 'withdrawal'
      }
    ),
    withdrawalUser() {
      const answer = confirm('정말 탈퇴하시겠습니까?')

      if (answer) {
        this.withdrawal()
      }
    }
  },

  data() {
    return {
    }
  },

  computed: {
    ...mapGetters(MYPAGE_STORE, ['totalCount']),
    ...mapState(MYPAGE_STORE, ['username', 'nickname'])
  }


}
</script>

<style scoped>

</style>