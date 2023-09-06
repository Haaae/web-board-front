<template>
  <v-container fluid>
    <div>
        <h1>AdminPageLayout</h1>
    </div>

    <router-view />

    <v-row>
      <v-col cols="6">
        <MiniList>
          <template v-slot:banner>
            <h3 style="color:white">일반 게시판</h3>
          </template>

          <template v-slot:contents>
            <v-col
            align="center"
            v-for="post in posts"
            :key="post.id"
            xl="6" cols="12"
            >

              <v-card 
              height="150" 
              width="95%"
              link
              :to="path + post.id.toString()"
              >
                <v-card-title>{{ post.title }}</v-card-title>
                <v-card-text class="text-left text-truncate">
                  {{ post.contents }}
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
                      <span class="subheading mr-2" v-if="$vuetify.breakpoint.name != 'xs'">{{ post.viewCount }}</span>
                      
                      <span class="mr-1" v-if="$vuetify.breakpoint.name != 'xs'">·</span>
                      
                      <v-icon class="mr-1" v-if="$vuetify.breakpoint.name != 'xs'">
                        mdi-clock
                      </v-icon>
                      
                      <span class="subheading" v-if="$vuetify.breakpoint.name != 'xs'">{{ post.date }}</span>

                      <v-spacer />
                      
                      <v-btn plain @click="deletePost(post.id)">
                        <v-icon large>
                          mdi-delete
                        </v-icon>
                      </v-btn>
                    </v-row>
                  </v-list-item>
                </v-card-actions>
              </v-card>

            </v-col>
          </template>
        </MiniList>  
      </v-col>

      <v-col cols="6">
        <MiniList>
          <template v-slot:banner>
            <h3 style="color:white">익명 게시판</h3>
          </template>

          <template v-slot:contents>
            <v-col
            align="center"
            v-for="anonymousPost in anonymousPosts"
            :key="anonymousPost.id"
            xl="6" cols="12">
              <v-card 
              height="150" 
              width="95%"
              link
              :to="path + anonymousPost.id.toString()"
              >
                
                <v-card-title>{{ anonymousPost.title }}</v-card-title>
                <v-card-text class="text-left text-truncate">
                  {{ anonymousPost.contents }}
                </v-card-text>

                <v-card-actions>
                  <v-list-item >
                    <v-row
                      align="center"
                      justify="start"
                      class="pb-4"
                    >
                      <v-icon 
                      small
                      class="mr-1" 
                      v-if="$vuetify.breakpoint.name != 'xs'"
                      >
                        mdi-eye
                      </v-icon>
                      <span 
                      class="subheading mr-2" 
                      v-if="$vuetify.breakpoint.name != 'xs'"
                      >{{ anonymousPost.viewCount }}
                      </span>
                      
                      <span 
                      class="mr-1" 
                      v-if="$vuetify.breakpoint.name != 'xs'"
                      >
                      ·
                      </span>
                      
                      <v-icon small class="mr-1">
                        mdi-clock
                      </v-icon>
                      
                      <span class="subheading">{{ anonymousPost.date }}</span>

                      <v-spacer />

                      <v-btn plain @click="deletePost(anonymousPost.id)">
                        <v-icon >
                          mdi-delete
                        </v-icon>
                      </v-btn>
                    </v-row>
                  </v-list-item>
                </v-card-actions>
              </v-card>
            </v-col>
          </template>
        </MiniList>
      </v-col>
    </v-row>



  </v-container>
</template>
  
<script>
import MiniList from "/src/components/miniList.vue"

import postsData from "/src/data/posts.json"
import anonymousPostsData from "/src/data/anonymousPosts.json"

export default {
  name: "AdminPageLayout",
  components: {
    MiniList
  },
  created() {
    this.post = this.getPosts()
    this.anonymousPosts = this.getAnonymousPosts()
  },
  data() {
    return {
      posts: postsData,
      anonymousPosts: anonymousPostsData,
      path: this.$route.path + '/posts/'
    }
  },
  methods: {
    deletePost(postId) {
      console.log(`delete post: ${postId}`);
      // 구현 필요
    },
    getPosts() {
      return this.postsData;
    },
    getAnonymousPosts() {
      return this.anonymousPosts;
    }

  }
}
</script>
