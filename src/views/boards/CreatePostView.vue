<template>
  <v-container fluid>
    <validation-observer ref="validator" v-slot="{ invalid }">
      <v-form @submin.prevent="submit">
      <v-row>
        <v-col>
          <h3>제목</h3>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <validation-provider 
            v-slot="{ errors }"
            name="제목"
            :rules="{ required: true,}">
              <v-text-field
                v-model="title"
                :counter="50"
                label="제목"
                name="title"
                maxlength="50"
                type="title"
                :error-messages="errors"
              />
            </validation-provider>
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
            :rules="{ required: true }">
              <v-textarea
                v-model="content"
                filled
                name="content"
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
          :disabled="invalid"
          @click="create"
          > 등록
          </v-btn>
        </v-col>
      </v-row>
    </v-form>    
    </validation-observer>
  </v-container>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import '/plugin/vee-validation.js'

const userStore = 'userStore'

export default {
  name: "CreatePostView",
  created() {
    if (!this.isLoginUser) {
      this.$router.push({'name': "MainSignIn"})
    }
  },
  methods: {
    ...mapActions('postDetailStore', ['createPost']),
    
    create() {
      this.createPost({
        title: this.title,
        content: this.content
      })
    }
  }, 
  data() {
    return {
      title: '',
      content: '',
    }
  },
  computed: {
    ...mapGetters(userStore, ['isLoginUser'])
  }
}
</script>

<style scoped>

</style>