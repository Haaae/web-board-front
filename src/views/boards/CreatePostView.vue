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
                v-model="post.title"
                :counter="50"
                label="제목"
                name="title"
                maxlength="50"
                type="title"
                :error-messages="errors"
              >
              </v-text-field>
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
            :rules="{ required: true, is_not: originalcontext}">
              <v-textarea
                v-model="post.context"
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
          <v-btn block outlined color="blue"
          type="submit"
          :disabled="invalid"
          > 등록
          </v-btn>
        </v-col>
      </v-row>
    </v-form>    
    </validation-observer>
  </v-container>
</template>

<script>
import axios from 'axios'
import '/plugin/vee-validation.js'

export default {
  name: "CreatePostView",
  methods: {
    submit() {
      if(this.$route.params.seq) {
        axios.put('http://localhost:8000/api/board', this.$data)
        .then((response) => {
          console.log(response)
          this.$router.push('/')
        })
        .catch((error) => {
          console.log(error)
        })
      } else {
        this.$data.post.creationDate = this.getNowDate()
        axios.post('http://localhost:8000/api/board', this.$data.post)
        .then((response) => {
          console.log(response)
          this.$router.push('/')
        })
        .catch((error) => {
          console.log(error)
        })
      }
    },
    getNowDate() {
      var nowDate = new Date()
      var year = nowDate.getFullYear().toString()
      var month = (nowDate.getMonth() + 1).toString()
      var day = nowDate.getDate().toString()

      return year + "-" + (month[1] ? month : "0" + month[0]) + "-" + (day[1] ? day : "0" + day[0])
    }
  },
  data() {
    return {
      post: {
        id: null,
        title: '',
        context: '',
        creationDate: '',
        isModified: false,
        comments: [],
      },
      isAnonymous: false
    }
  }
}
</script>

<style scoped>

</style>