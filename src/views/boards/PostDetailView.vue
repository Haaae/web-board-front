<template>
  <v-container fluid >
    <!-- post header -->
    
    <v-row>
      <!-- head의 좌측부 -->
      <v-col>

        <!-- title -->
        <v-row>
          <v-col class="pb-0">
            <h2>{{ post.title }}</h2>
          </v-col>
        </v-row>

        <!-- writer -->
        <v-row>
          <v-col>
            <p class="my-0">{{ post.writer }}</p>
          </v-col>
        </v-row>

        <!-- time and hits -->
        <v-row>
          <v-col class="py-0 pr-0" cols="auto">
            <p 
            class="font-weight-regular text--disabled" 
            style="font-size: 0.8em"
            >
              <v-icon small>
                mdi-clock
              </v-icon>
              {{ post.createdDate }}
            </p>
          </v-col>

        <v-col class="py-0 pr-1 pl-2" cols="auto">
          <p 
          class="font-weight-regular text--disabled" 
          style="font-size: 0.8em"
          >    
            <v-icon small class="ml-2">
              mdi-eye
            </v-icon>

          {{ post.hits }}
          </p>
        </v-col>

        <v-col class="py-0 pr-1 pl-2" cols="auto">
          <p 
          class="font-weight-regular text--disabled" 
          style="font-size: 0.8em"
          >    
            <v-icon small class="ml-2">
              mdi-comment
            </v-icon>

          {{ post.commentCount }}
          </p>
        </v-col>

        <v-col class="py-0" cols="auto">
          <p 
          class="font-weight-regular text--disabled" 
          style="font-size: 0.8em"
          >
            {{ post.isModified ? '* 수정됨' : '' }}
          </p>
        </v-col>

        
        </v-row>

    </v-col>

    <!-- head의 우측부 -->
    <v-col class="pt-16 d-flex justify-end" >
      <v-btn 
        :disabled="isNotWriter"
        @click="()=>this.$router.push({name: 'ModifyPost'})"
        class="mb-2"
        color="blue"
        text
        outlined
        >
          수정
        </v-btn>

        <v-btn 
        :disabled="isNotWriter"
        @click="this.delete"
        class="mb-2 mx-2"
        color="blue"
        outlined
        text
        >
          삭제
        </v-btn>
    </v-col>
  </v-row>

    <!-- <v-spacer /> -->

    

    <v-divider />

    <!-- post body -->
    <v-row>
      <v-col class="ma-5"  >
        <p class="font-weight-medium my-4">
          {{ post.content }}
        </p>
      </v-col>
    </v-row>

    
    <v-divider />

    <!-- comment header -->
    <InsertForm
    :commentsLen="comments.length.toString()"
    :parentId="null"
    />

    <v-divider />
    
    <!-- comments list -->
    <!-- 컴포넌트로 만들어서 v-for로 돌리기 -->
    <commentComp
    v-for="comment in comments"
    :key="comment.id"
    :comment="comment"
    @click="showReplyForm(comment)"
    />
  </v-container>
</template>

<script>
import commentComp from '@/components/post/comment.vue'
import InsertForm from '@/components/post/insertForm.vue'
import '/plugin/vee-validation.js'

import { mapActions, mapGetters } from "vuex";

const postDetailStore = 'postDetailStore'
const userStore = 'userStore'

export default {
  name: "PostDetailView",

  data() {
    return {
      path: this.$route.path.slice(1),
    }
  },

  created() {
    let _path = this.$route.path.slice(1)
    _path = _path.slice(_path.indexOf('/'))
    const _postId = _path.slice(_path.lastIndexOf('/') + 1)

    this.fetch(_postId)
  },

  components: {
    commentComp,
    InsertForm
  },

  methods: { 
    ...mapActions(postDetailStore, {
      fetch: 'fetchPostDetail',
      deletePost: 'deletePost'
    }),
    delete() {
      this.deletePost()
    }
  },

  computed: {
    ...mapGetters(postDetailStore, ['post', 'comments']),
    ...mapGetters(userStore, ['userId']),
    isNotWriter() {
      return !(this.post.writerId === this.userId)
    }

  }
}
</script>

<style scoped>

</style>