<template>
  <v-container fluid>
    <!-- post header -->
    <v-row>
      <v-col class="pb-0">
        <h2>{{ post.title }}</h2>

      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <p class="my-0">{{ post.writer }}</p>
      </v-col>
    </v-row>
    <v-row>
      <v-col class="py-0 pr-0" cols="auto">
        <p 
        class="font-weight-regular text--disabled" 
        style="font-size: 0.8em"
        >
          <v-icon small>
            mdi-clock
          </v-icon>
        {{ post.creationDate }}    
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

        {{ post.viewCount }}
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

    <v-divider />

    <!-- post body -->
    <v-row>
      <v-col class="ma-5"  >
        <p class="font-weight-medium my-4">
          {{ post.context }}
        </p>
      </v-col>
    </v-row>

    <v-divider />

    <!-- comment header -->
    <v-row>
      <v-col class="ma-5">
        <validation-observer v-slot="{ invalid }" >
          <v-form>
            <p>
              댓글 {{ post.comments.length }}
            </p>
            <validation-provider 
            name="댓글"
            :rules="{ required: true, is_not: originalTitle}">
              <v-text-field
              v-model="newComment"
                :counter="100"
                label="댓글을 남겨주세요."
                name="comment"
                maxlength="100"
                type="text"
              >
              </v-text-field>
            </validation-provider>
  
            <!-- input form new comment -->
              <v-row>
                <v-col>
                  <v-btn
                  :disabled="invalid" 
                  block outlined color="blue" 
                  type="submit"
                  > 
                  등록
                  </v-btn>
                </v-col>
              </v-row>
          </v-form>
        </validation-observer>
      </v-col>
    </v-row>

    <v-divider />
    
    <!-- comments list -->
    <!-- 컴포넌트로 만들어서 v-for로 돌리기 -->
    <commentComp
    v-for="comment in post.comments"
    :key="comment.id"
    >
      <template v-slot:writer>
        <v-row>
          <v-col class="pr-0" cols="auto">
            <h5 class="font-weight-light">
              {{ comment.writer }} {{ comment.id }}
            </h5>
          </v-col>
          <v-col class="pl-1" cols="auto" v-if="comment.writer == post.writer">
            <h5 class="font-weight-regular" style="color: red; font-size: 0.8rem;">
            {{ '작성자' }}
            </h5>
          </v-col>
        </v-row>
      </template>

      <template v-slot:comment>
        <p class="font-weight-medium ma-1 ml-0">
          {{ comment.comment }} {{ comment.id }}
        </p>
      </template>   

      <template v-slot:date>
        <h5 class="font-weight-regular text--disabled" 
        >
          <v-icon small>
            mdi-clock
          </v-icon>
          {{ getDateFormat(comment.date) }}
        </h5>
      </template>
    </commentComp>
  </v-container>
</template>

<script>
import axios from 'axios';
import commentComp from '/src/components/comment.vue'
import '/plugin/vee-validation.js'

export default {
  name: "PostDetailView",
  created() {
    this.fetch();
  },
  components: {
    commentComp,
  },
  methods: {
    fetch() {
      axios.get(this.$route.fullPath)
      .then((response) => {
        console.log(response)
      })
      .catch((error) => {
        console.log(error)
      })
    },
    submit() {
      // todo: 댓글 등록 aixos 활용 기능 구현
    },
    getDateFormat(Date) {
      var year = Date.getFullYear().toString()
      var month = (Date.getMonth() + 1).toString()
      var day = Date.getDate().toString()

      return year + "-" + (month[1] ? month : "0" + month[0]) + "-" + (day[1] ? day : "0" + day[0])
    }
  },
  data() {
    return {
      post: { // post: {} <= 이렇게만 해도 되는가? axios 알아볼 필요있다.
        id: null,
        title: 'Title',
        writer: 'writer',
        context: '본문 내용. ==============================================================================',
        creationDate: '1998-10-24',
        viewCount: 2397,
        isModified: true,
        comments: [
          {
            id: 1,
            writer: 'writer',
            comment: 'comment',
            date: new Date(), // todo: front 기능 중에 date 경과 시간에 맞춰서 표시해주는 거 찾아보기
          },
          {
            id: 2,
            writer: 'writer',
            comment: 'comment',
            date: new Date(), // todo: front 기능 중에 date 경과 시간에 맞춰서 표시해주는 거 찾아보기
          },
          {
            id: 3,
            writer: 'writer',
            comment: 'comment',
            date: new Date(), // todo: front 기능 중에 date 경과 시간에 맞춰서 표시해주는 거 찾아보기
          },
          {
            id: 4,
            writer: 'writer',
            comment: 'comment',
            date: new Date(), // todo: front 기능 중에 date 경과 시간에 맞춰서 표시해주는 거 찾아보기
          },
        ],
      },
      newComment: '',
    }
  }
}
</script>

<style scoped>

</style>