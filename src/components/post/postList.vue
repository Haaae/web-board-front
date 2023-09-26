<template>
    <v-container fluid>
      <v-divider class="my-3" />
      <v-row >
        <v-col 
        v-for="post in posts" 
        :key=post.id
        xl=2 lg=3 md=3 sm=4 cols="12"
        >
          <v-card 
          height="200"
          link
          :to="path + post.postId"
          >
            <v-card-title>
              <h4 class="text-truncate">
                {{ post.title }}
              </h4>
            </v-card-title>
            
            <v-card-text >
              <p class="text-truncate">
                {{ post.content }}
              </p>
            </v-card-text>

            <v-card-subtitle >
              {{  post.writer }}
            </v-card-subtitle>

            <v-card-actions>
              <v-list-item >
              
                <v-row
                  justify="start"
                  class="mb-8"
                >
                  <v-icon small class="mr-1">mdi-eye</v-icon>
                  
                  <span class="subheading mr-2">{{ post.hits }}</span>
                  
                  <span class="mr-1">·</span>
                  
                  <v-icon small class="mr-1">mdi-clock</v-icon>
                  
                  <span class="subheading">
                    {{ parseTime(post.createdDate) }}
                  </span>
                </v-row>
              </v-list-item>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>

      <v-divider class="my-3" />

      <v-row class="justify-center">
        <!-- 페이지 -->
        <v-col>
          <v-pagination
            :v-model="page"
            :length="pageCount"
            @input="updatePage"
          />
        </v-col>
      </v-row>
    </v-container>
</template>

<script>
import converTimeFormat from '@/utils/timeFomat.js'
import { mapActions, mapMutations, mapState } from "vuex";

const postListStore = 'postListStore'

export default {
    name: "PostList",
    data() {
      return {
        path: this.$route.path + '/posts/'
      }
    },
    created() {
      this.fetch({
        size: this.size,
        page: this.page
      });
    },
    methods: {
      ...mapActions(postListStore, {
        fetch: 'fetchPostList'
      }),
      ...mapMutations(postListStore, ['updatePageInfo']),

      updatePage(pageIndex) {
        
        this.updatePageInfo(pageIndex)
        this.fetch({
          size: this.size,
          page: this.page
        })
      },

      parseTime(date) {
        return converTimeFormat(date)
      }
    },
    computed: {
      ...mapState(postListStore, ['size', 'page', 'posts', 'pageCount', 'test']),
    }
}
</script>