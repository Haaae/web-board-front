<template>
    <validation-observer v-slot="{ invalid }" >
        <v-form>
          <v-row>
            <v-col>
              <validation-provider 
              name="댓글"
              :rules="{ required: true, is_not: comment.content}">
                <v-text-field
                v-model="newComment"
                  :counter="100"
                  label="수정할 내용을 남겨주세요."
                  name="comment"
                  maxlength="100"
                  type="text"
                >
                </v-text-field>
              </validation-provider>
            </v-col>

            <!-- input form new comment -->
            <v-col cols="1" class="mt-3">
              <v-btn 
              block 
              outlined 
              color="blue" 
              @click="$emit('cancle')"
              > 
              취소
              </v-btn>
            </v-col>
            <v-col cols="1" class="mt-3">
              <v-btn
              :disabled="invalid" 
              block 
              outlined 
              color="blue" 
              @click="update"
              > 
              수정
              </v-btn>
            </v-col>
          </v-row>
        </v-form>
      </validation-observer>
</template>

<script>
import { mapActions } from 'vuex'

const postDetailStore = 'postDetailStore'

export default {
  name: 'updateComment',
  
  props: {
    comment: Object,
  },
  
  data() {
    return {
      newComment: this.comment.content
    }
  },

  methods: {
    ...mapActions(postDetailStore, ['updateComment']),
    update() {
      this.updateComment({
        commentId: this.comment.id,
        content: this.newComment
      })
  },
  }
}
</script>
