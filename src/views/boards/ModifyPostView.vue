<template>
  <v-container fluid>
    <h1>Modify Post</h1>
    <validation-observer ref="validator" v-slot="{ invalid }">
      <v-form 
      @submit.prevent="submit"
      >
        <v-row>
          <v-col>
            <h3>제목</h3>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-text-field
              :value="post.title"
              label="제목"
              disabled
            />
          </v-col>
        </v-row>
  
        <v-row>
          <v-col>
            <h3>내용</h3> 
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <validation-provider 
            v-slot="{ errors }"
            name="내용"
            :rules="{ required: true, is_not: post.content}">
              <v-textarea
                v-model="newContent"
                filled
                name="context"
                hint="내용을 입력해주세요."
                :counter="1000"
                maxlength="1000"
                :error-messages="errors"
                >
              </v-textarea>
            </validation-provider>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-btn 
            block 
            outlined 
            color="blue" 
            type="submit"
            :disabled="invalid"
            > 
              수정
            </v-btn>
          </v-col>
        </v-row>
      </v-form>    
    </validation-observer>
  </v-container>
  </template>
  
<script>
import '/plugin/vee-validation.js'
import { mapGetters, mapActions } from 'vuex';

const postDetailStore = 'postDetailStore'
const userStore = 'userStore'

export default {
  name: "ModifyPostView",
  created() {
    if (this.post.writerId !== this.userId) {
      this.$router.push({name: 'Main'})
    }

    this.newContent = this.post.content
  },
  data() {
    return {
      newContent: ''
    }
  },
  methods: {
    ...mapActions(postDetailStore, ['updatePost']),
    submit() {
      this.updatePost({content: this.newContent})
    },
  },
  computed: {
    ...mapGetters(postDetailStore, ['post']),
    ...mapGetters(userStore, ['userId']),
  },
}
</script>