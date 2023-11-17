<template>
    <v-container fluid>

      <head>
        <!-- <link rel="stylesheet" type="text/css" href="https://cdn.bootcss.com/bootstrap/3.3.5/css/bootstrap.css"> -->
      </head>

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
                  
                  <span class="subheading mr-2">
                    {{ parseTime(post.createdDate) }}
                  </span>

                  <span class="mr-1">·</span>

                  <v-icon small class="mr-1">mdi-comment</v-icon>
                  <span class="subheading">
                    {{ post.commentCount }}
                  </span>

                </v-row>
              </v-list-item>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>

      <v-divider class="mb-0 mt-5" />

      <v-row>
        <v-col >
          <paginate 
            :page-count="pageCount"
            :callback="updatePageInfo"
          />
        </v-col>
      </v-row>

    </v-container>
</template>

<script>
import converTimeFormat from '@/utils/timeFomat.js';
import { mapActions, mapMutations, mapState } from "vuex";
import paginate from '@/components/pagination/pagination.vue'

const postListStore = 'postListStore'

export default {
    name: "PostList",

    components: {
      paginate
    },

    data() {
      return {
        path: this.$route.path + '/posts/',

        pageData: {currentPage: 1}
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
      ...mapMutations(postListStore, ['updatePage']),

      updatePageInfo(pageIndex) {
        
        this.updatePage(pageIndex)
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

<!-- <style lang="css">
  .page-container {
    margin-top: 20px;
    display: inline-block;
    padding: 0%;
    list-style: none;
  }

  .page-container li {
    float: left;
  }

  .page-container a:hover {
    color: #ffffff !important;
    background-color: #2e9cdf;
    cursor: default;
    outline: none;
  }

  .page-container a {
    border-radius: 100%;
    margin-left: 5px !important;
    margin-right: 5px !important;
    width: 30px !important;
    text-align: center;

    display: block !important;
    font-size: 14px;
    text-decoration: none;
    padding: 5px, 12px;
    color: #96a0ad !important;
    line-height: 30px;
  }
  .page-container li.active a {
    color: #ffffff !important;
    background-color: #2e9cdf;
    cursor: default;
    outline: none;
  }
  .page-container li:active a {
    outline: none;
  }
</style> -->