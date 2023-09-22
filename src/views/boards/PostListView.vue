<template>
    <PostList/>
</template>

<script>
import PostList from "@/components/post/postList.vue"

export default {
  name: "PostListView",
  components: {
    PostList
  },
  data() {
    return {
      path: this.$route.path + '/posts/'
    }  
  },

}
</script>

<style scoped>

</style>