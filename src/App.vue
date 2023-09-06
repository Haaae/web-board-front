<template>
  <v-app>
    <v-app-bar
      app
      absolute
      color="primary"
      dark
    >
      <v-app-bar-nav-icon v-if="navCondition" @click="drawer = !drawer" class="hidden-lg-and-up"></v-app-bar-nav-icon>

      <v-icon @click="() => this.$router.push({name:'Main'})">mdi-home</v-icon>

      <!-- 회원가입 버튼 -->

      <v-spacer />
      
      <v-btn @click="loginToggle">
        Login: {{ isLoginUser }}
      </v-btn>

      <!-- signup btn -->
      <v-btn 
      v-if="!isLoginUser" 
      color="transparent" 
      depressed 
      link 
      to="/signup">
      sign up
    </v-btn>
    
    <!-- signin btn -->
      <v-btn 
      v-if="!isLoginUser" 
      color="transparent" 
      depressed 
      link to="/signin">
        sign in
      </v-btn>

      <!-- signin icon -->
      <v-icon v-if="isLoginUser" large >
        mdi-account
      </v-icon>
    </v-app-bar>

    <!-- <v-navigation-drawer permanent> -->
    <v-navigation-drawer
      app
      v-if="navCondition"
      v-model="drawer"
      :temporary="$vuetify.breakpoint.mdAndDown && drawer"
      absolute
      >
      
      <!-- app은 기본 레이아웃 컴포넌트로 만들어주는 특수속성 -->
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="text-h6">
            Application
          </v-list-item-title>
          <v-list-item-subtitle>
            subtext
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
      
      <v-divider />

      <!-- 그룹화된 사이트 기능 목록 -->
      <v-list>
        <v-list-group
          v-for="item in items"
          :key="item.title"
          :value="item.active"
          v-model="item.active"
          :prepend-icon="item.action"
        >
          <template #activator>
            <v-list-item-content>
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item-content>
          </template>

          <v-list-item
            v-for="subject in item.subjects"
            :key="subject.title"
            link
            :to="subject.to"
          >
            <v-list-item-title>{{ subject.title }}</v-list-item-title>
          </v-list-item>
        </v-list-group>
      </v-list>
    </v-navigation-drawer>

    <v-main>
      <router-view/>
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: 'App',
  created() {
    this.drawer = !this.$vuetify.breakpoint.mdAndDown 
    // 타이밍이 create가 맞는지 확인해보아야 함
  },
  data: () => ({
    isMember: true,  // 원래 cookie로 확인해야 함
    drawer: false,
    member: {id: 'memberId', name: 'memberName'},
    items: [
          { 
            title: '게시판', 
            action: ' mdi-view-dashboard', 
            active: false, 
            subjects: [{title: '일반 게시판', to:'/boards'}, {title: '익명 게시판', to:'/anonymous-boards'}]
          },
          { 
            title: '내 정보', 
            action: 'mdi-account', 
            active: false, to:'/mypage', 
            subjects: [{title: '내 정보', to:'/mypage'}, {title: '내가 쓴 글', to:'/mypage/posts'}]
          },
          { 
            title: 'Admin', 
            action: 'mdi-account-key', 
            active: false, to:'/admin', 
            subjects: [{title: '게시판 설정', to:'/admin'}]
          },
          { 
            title: '대쉬보드', 
            action: ' mdi-table', 
            active: false, to:'/dashboard', 
            subjects: [{title: '대쉬보드', to: '/dashboard'}]
          },
        ],
    right: null,
  }),
  computed: {
    widthChange() {
      return this.$vuetify.breakpoint.mdAndDown;
    },
    navCondition() {
      return this.$route.path != '/signin' && this.$route.path != '/signup'
    },
    isLoginUser() {
      return this.$store.state.user.isLoginUser
    }
  },
  watch: {
    widthChange() {
      this.drawer = !this.$vuetify.breakpoint.mdAndDown 
    },
  },
  methods: {
    can() {
      return true;
    },
    loginToggle() {
      this.$store.commit("loginToggle")
    }
  },
};
</script>

<style scoped>

</style>