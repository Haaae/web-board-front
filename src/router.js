import Vue from 'vue';
import VueRouter from 'vue-router';

import MainPageLayout from './views/main/MainPageLayout.vue'

import BoardPageLayout from './views/boards/BoardPageLayout.vue'

import PostListView from './views/boards/PostListView.vue'
import PostDetailView from './views/boards/PostDetailView.vue'
import CreatePostView from './views/boards/CreatePostView.vue'
import ModifyPostView from './views/boards/ModifyPostView.vue'

import MyPageLayout from './views/my/MyPageLayout.vue'
import MyPageHomeView from './views/my/view/MyPageHomeView.vue'
import UserContentsView from './views/my/view/UserContentsView.vue'

import AdminPageLayout from './views/admin/AdminPageLayout.vue'

Vue.use(VueRouter)

const MainPage = {
  path: '/',
  name: 'Main',
  component:MainPageLayout,
}

const BoardPage = {
  path: '/boards',
  name: 'Board',
  component: BoardPageLayout,
  children: [
    {
      path: '',
      name: 'PostList',
      component: PostListView,
      // $route에 컴포넌트의 의존성을 해제하여 어디서나 컴포넌트를 사용할 수 있게 하여 재사용 및 테스트하기 쉽게 한다.
      props: true,
    },
    {
      path: 'posts/:postId',
      name: 'PostDetail',
      component: PostDetailView,
    },
    {
      path: 'posts/create',
      name: 'CreatePost',
      component: CreatePostView,
    },
    {
      path: 'posts/:postId/modify',
      name: 'ModifyPost',
      component: ModifyPostView,
    },
  ]
}

const MyPage = {
  path: '/mypage',
  name: 'MyPage',
  component: MyPageLayout,
  children: [
    {
      path: '',
      name: 'MyPageHome',
      component: MyPageHomeView,
    },
    {
      path: 'contents',
      name: 'UserContents',
      component: UserContentsView,
    },
    // {
    //   path: 'posts/:postId',
    //   name: 'PostDetail',
    //   component: PostDetailView,
    // },
    // {
    //   path: ':postId/modify',
    //   name: 'ModifyPost',
    //   component: ModifyPostView,
    // },
  ]
}

const AdminPage = {
  path: '/admin',
  name: 'Admin',
  component: AdminPageLayout,
  children: [
    {
      path: 'posts/:postId',
      name: 'AdminPostDetail',
      component: PostDetailView,
    },
  ]
}


const routes = [
  MainPage,
  BoardPage,
  MyPage,
  AdminPage,
  {
    path: '/signin',
    name: 'MainSignIn',
    component: () => import('./views/signin/SignIn.vue')
  },
  {
    path: '/signup',
    name: 'MainSignUp',
    component: () => import('./views/signup/SignUp.vue')
  }

]

const router = new VueRouter({
  mode: 'history',
  routes: routes
})

export default router
