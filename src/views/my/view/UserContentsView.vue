<template>
  <v-container>
    <v-row>
      <v-col cols="6">
        <MiniList>
          <template v-slot:banner>
            <h3 style="color:white">내가 쓴 게시물</h3>
          </template>

          <template v-slot:contents>
            <v-col
            align="center"
            v-for="post in postPage.posts"
            :key="post.postId"
            xl="6" cols="12"
            >

              <v-card 
              height="150" 
              width="95%"
              link
              @click="routePost(post.postId)"
              >
                <v-card-title>{{ post.title }}</v-card-title>
                <v-card-text class="text-left text-truncate">
                  {{ post.content }}
                </v-card-text>

                <v-card-actions>
                  <v-list-item>
                    <v-row
                      align="center"
                      justify="start"
                      class="pb-4"
                    >

                      <span class="mr-1">{{ post.writer }}</span>

                      <span class="mr-1" v-if="$vuetify.breakpoint.name != 'xs'">·</span>

                      <v-icon class="mr-1" v-if="$vuetify.breakpoint.name != 'xs'">
                        mdi-eye
                      </v-icon>
                      <span class="subheading mr-2" v-if="$vuetify.breakpoint.name != 'xs'">{{ post.hits }}</span>
                      
                      <span class="mr-1" v-if="$vuetify.breakpoint.name != 'xs'">·</span>
                      
                      <v-icon class="mr-1" v-if="$vuetify.breakpoint.name != 'xs'">
                        mdi-clock
                      </v-icon>
                      
                      <span class="subheading mr-1" v-if="$vuetify.breakpoint.name != 'xs'">
                        {{ parseTime(post.createdDate) }}
                      </span>

                      <span class="mr-1" v-if="$vuetify.breakpoint.name != 'xs'">·</span>
                      
                      <v-icon class="mr-1" v-if="$vuetify.breakpoint.name != 'xs'">
                        mdi-comment
                      </v-icon>
                      
                      <span class="subheading" v-if="$vuetify.breakpoint.name != 'xs'">
                        {{ post.commentCount }}
                      </span>
                      

                    </v-row>
                  </v-list-item>
                </v-card-actions>
              </v-card>
            </v-col>
          </template>
        </MiniList>
        
        <!-- 페이지 -->
        <v-row>
          <v-col >
            <paginate 
              :page-count="postPage.pageCount"
              :callback="updatePostPageIndex"
            />
          </v-col>
        </v-row>
      </v-col>

      <v-col cols="6">
        <MiniList>
          <template v-slot:banner>
            <h3 style="color:white">내가 쓴 댓글</h3>
          </template>

          <template v-slot:contents>
            <v-col
            align="center"
            v-for="comment in commentPage.comments"
            :key="comment.commentId"
            xl="4" cols="6">
              <v-card 
              class="px-0"
              height="80" 
              width="95%"
              link
              @click="routePost(comment.postId)"
              >
              
                <v-card-text class="text-left text-truncate pb-0">
                  {{ comment.content }} 
                </v-card-text>

                <v-card-actions>
                  <v-list-item >
                    <v-row
                      align="center"
                      justify="start"
                      class="pb-4"
                    >
                      
                      <v-icon small class="mr-1">
                        mdi-clock
                      </v-icon>
                      
                      <span class="subheading">
                        {{ parseTime(comment.createdDate) }}
                      </span>
                    </v-row>
                  </v-list-item>
                </v-card-actions>
              </v-card>
            </v-col>
          </template>
        </MiniList>

          <!-- 페이지 -->
        <v-row>
          <v-col >
            <paginate 
              :page-count="commentPage.pageCount"
              :callback="updateCommentPageIndex"
            />
          </v-col>
        </v-row>

      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import converTimeFormat from '@/utils/timeFomat.js'
import MiniList from "/src/components/miniList.vue"
import paginate from '@/components/pagination/pagination.vue'
import { mapActions, mapMutations, mapState } from 'vuex'


const MYPAGE_STORE = 'myPageStore'

export default {
  name: "PostListUserWorteView",
  components: {
    MiniList,
    paginate
  },

  created() {
    this.fetchPosts({
      size: this.postPage.size,
      page: this.postPage.page
    })
    this.fetchComments({
      size: this.commentPage.size,
      page: this.commentPage.page
    })
  },

  methods: {
    ...mapActions(MYPAGE_STORE, {
      fetchPosts: 'fetchMyPost',
      fetchComments: 'fetchMyComment'
    }),
    ...mapMutations(MYPAGE_STORE, 
      ['updatePostPage', 'updateCommentPage']
    ),

    updatePostPageIndex(pageIndex) {
      this.updatePostPage(pageIndex)
      this.fetchPosts({
        size: this.postPage.size,
        page: this.postPage.page
      })
    },
    updateCommentPageIndex(pageIndex) {
      this.updateCommentPage(pageIndex)
      this.fetchComments({
        size: this.commentPage.size,
        page: this.commentPage.page
      })
    },

    parseTime(date) {
      return converTimeFormat(date)
    },
    routePost(postId) {
      this.$router.push({
        name: 'PostDetail',
        params: {
          postId: postId
        }
      })
    }
  },

  computed: {
    ...mapState(MYPAGE_STORE, ['postPage', 'commentPage'])
  },

  data() {
    return {
    }
  }

}
</script>

<style scoped>

</style>