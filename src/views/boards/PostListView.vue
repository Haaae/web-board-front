<template>
    <PostList 
    :posts="posts" 
    :page-info="pageInfo"
    :path="path"
    />
</template>

<script>
import postsData from "/src/data/posts.json"
import PostList from "/src/components/post/postList.vue"

export default {
  name: "PostListView",
  components: {
    PostList
  },
  data() {
    return {
      posts: postsData,
      pageInfo: {
        page: 1,
        pageCount: 100,
        itemsPerPage: 3,
        maxPage: 6,
        previewLength:100,
        posts: postsData,
      },
      path: this.$route.path + '/posts/'
    }
  },
  methods: {
    getPosts() {
      return this.posts;
      // TODO: 서버와 연결하여 구현 필요. created인가를 사용해서 만들 듯
    },
  }

}
</script>

<style scoped>

</style>