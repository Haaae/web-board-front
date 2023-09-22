<template>
  <v-row>
    <v-col class="ma-5">
      <validation-observer v-slot="{ invalid }" >
        <v-form>
          <p>
            {{ parentId === null ? '댓글' : '답글'}} {{ commentsLen }}
          </p>
          <v-row>
            <v-col>
              <validation-provider 
              name="댓글"
              :rules="{ required: true}">
                <v-text-field
                v-model="newComment"
                  :counter="100"
                  label="메시지를 남겨주세요."
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
              :disabled="invalid" 
              plain
              block 
              outlined 
              color="blue" 
              @click="create"
              > 
              등록
              </v-btn>
            </v-col>
          </v-row>
        </v-form>
      </validation-observer>
    </v-col>
  </v-row>
</template>

<script>
import { mapActions, mapGetters, mapState } from 'vuex';

const postDetailStore = 'postDetailStore'
const userStore = 'userStore'

export default {
  name: 'InsertForm',
  data() {
      return {
          newComment: '',
      }
  },

  props: {
      commentsLen: String,
      parentId: Number
  },

  methods: {
    ...mapActions(postDetailStore, ['createComment']),
    create() {
      if (!this.isLoginUser) {
        this.$router.push({name: 'MainSignIn'})
      } 

      else if (this.parentId) {
        this.createComment({
          content: this.newComment,
          type: this.REPLY,
          parentId: this.parentId
        })
      }

      else {
        this.createComment({
          content: this.newComment,
          type: this.COMMENT,
          parentId: null
        })
      }
    }
  },

  computed: {
    ...mapState(postDetailStore, ['COMMENT', 'REPLY']),
    ...mapGetters(userStore, ['isLoginUser'])
  }

}
</script>
