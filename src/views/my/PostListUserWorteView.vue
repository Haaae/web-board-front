<template>
  <PostList 
  :posts="posts" 
  :page-info="pageInfo"
  :path="path"
  />
</template>

<script>
import PostList from "/src/components/post/postList.vue"
import postsData from "/src/data/posts.json"


export default {
  name: "PostListUserWorteView",
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
      path: this.$route.path + '/'
    }
  }

}
</script>

<style scoped>

</style>