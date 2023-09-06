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
            <validation-provider 
            v-slot="{ errors }"
            name="제목"
            :rules="{ required: true, is_not: originalTitle}">
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
import axios from 'axios'
import '/plugin/vee-validation.js'


export default {
    name: "ModifyPostView",
    create() {
        this.fetch();
    },
    methods: {
      submit() {
        console.log(`제목: ${this.post.title}, 내용: ${this.post.context} 제출됨`)
        // todo: 서버와 연결해서 데이터 전송 구현
        // this.$fets.observer.validate()
        // modifyClick()을 여기에서 수행해도 되는지 확인
      },
      fetch() {
          axios.get(this.$route.fullPath)
              .then((response) => {
              console.log(response);
          })
              .catch((error) => {
              console.log(error);
          });
      },
    },
    data() {
        return {
            originalTitle: '원래 제목',
            originalcontext: '원래 내용',
            post: {
                id: null,
                title: "",
                context: "",
                // 필요없음. creationDate: '',
                isModified: false,
                // 필요없음. comments: [],
            },
        };
    },
}
</script>