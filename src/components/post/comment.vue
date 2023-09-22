<template>
  <div class="mt-3">
    <div 
    v-if="comment.isDeleted"
    class="mx-3 my-4"
    >
      <p class="font-italic font-weight-thin">
        삭제된 댓글입니다.
      </p>
    </div>

    <div v-if="updating">
      <UpdateComment
      :comment="comment"
      @cancle="updating = false"
      />
    </div>
    
    <div v-if="!comment.isDeleted && !updating">
      <v-row>
        <v-col class="pr-0" cols="auto">
          <h5 class="font-weight-light">
            {{ comment.writer }}
          </h5>
        </v-col>

        <v-col class="pl-3 mr-0 pr-0" cols="auto" v-if="comment.writerId == post.writerId">
          <h5 class="font-weight-regular" style="color: red; font-size: 0.8rem;">
            글쓴이
          </h5>
        </v-col>

        <v-col class="pl-3" cols="auto" v-if="comment.writerId == post.writerId">
          <h5
          v-if="comment.isModified" 
          class="font-weight-regular" style="color: red; font-size: 0.8rem;">
            * 수정됨
          </h5>
        </v-col>
      </v-row>

      <p class="font-weight-medium ma-1 ml-0 mb-4 py-2">
        {{ comment.content }} 
      </p>

      <v-row class="ml-1">
        <h5 class="font-weight-regular text--disabled mr-3" 
        >
          <v-icon small>
            mdi-clock
          </v-icon>
          {{ parseTime(comment.createdDate) }}
        </h5>
    
        <v-btn 
        v-if="comment.type === COMMENT"
        @click="toggleShowReplyForm(comment)"
        class="pb-4"
        text
        >
          답글 남기기
        </v-btn>

        <v-spacer />

        <v-btn 
        :disabled="!isWriter"
        @click="updating = true"
        class="mb-2"
        color="blue"
        text
        outlined
        >
          수정
        </v-btn>

        <v-btn 
        :disabled="!isWriter"
        @click="this.delete"
        class="mb-2 mx-2"
        color="blue"
        outlined
        text
        >
          삭제
        </v-btn>
      </v-row>
  </div>
      

    <v-divider class="mt-1" />
    
    <v-row
    v-if="comment.type === COMMENT && comment.showReplyForm"
    >
      <v-col cols="10">
        <InsertForm
        :commentsLen="''"
        :parentId="comment.id"
        />
        
        <v-divider class="mt-3" />

      </v-col>
    </v-row>
    
    <commentComp
    class="ml-10"
    v-for="reply in comment.replies"
    :key="reply.id"
    :comment="reply"
    :postId="post.id"
    :postWriterId="post.writerId"
    />

    
  </div>
</template>

<script>
import { format } from 'timeago.js'
import { mapActions, mapMutations, mapGetters, mapState } from 'vuex'
import InsertForm from '@/components/post/insertForm.vue'
import UpdateComment from '@/components/post/updateComment.vue'

const postDetailStore = 'postDetailStore'
const userStore = 'userStore'

export default {
    name: 'commentComp',
    
    props: {
      comment: Object,
    },
    
    data() {
      return {
        updating: false,
      }
    },

    components: {
      InsertForm,
      UpdateComment
    },

    methods: {
      ...mapMutations(postDetailStore, ['toggleShowReplyForm']),
      ...mapActions(postDetailStore, ['deleteComment']),

      delete() {
        this.deleteComment(this.comment.id)
      },

      parseTime(date) {
        return format(date.slice(0, 10), 'ko_KR')
      },
    },

    computed: {
      ...mapState(postDetailStore, ['COMMENT']),
      ...mapGetters(postDetailStore, ['post']),
      ...mapGetters(userStore, ['userId']),
      isWriter() {
        return this.comment.writerId === this.userId
      }
    }
}
</script>
