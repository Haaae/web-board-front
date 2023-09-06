<template>
    <v-container fluid>
      <v-row >
        <v-col 
        v-for="post in posts" 
        :key=post.id
        xl=2 lg=3 md=3 sm=4 cols="12"
        >
          <v-card 
          height="200"
          link
          :to="path + post.id.toString()"
          >
            <v-card-title>{{ post.title }}</v-card-title>
            <v-card-text >
              <p class="text-truncate">
                {{ post.contents }}
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
                  
                  <span class="subheading mr-2">{{ post.viewCount }}</span>
                  
                  <span class="mr-1">·</span>
                  
                  <v-icon small class="mr-1">mdi-clock</v-icon>
                  
                  <span class="subheading">{{ post.date }}</span>
                </v-row>
              </v-list-item>
            </v-card-actions>

          </v-card>
        </v-col>
      </v-row>

      <v-row >
        <!-- 페이지 -->
        <div class="text-center pt-2">
          <v-pagination
            :v-model="pageInfo.page"
            :length="pageInfo.pageCount"
          />
          <v-text-field
            :value="pageInfo.itemsPerPage"
            label="Items per page"
            type="number"
            min="-1"
            max="15"
            @input="itemsPerPage = parseInt($event, 10)"
          />
        </div>  
      </v-row>


    </v-container>
</template>

<script>

export default {
    name: "PostList",
    props: {
        posts: Object,
        pageInfo: Object,
        path: String
    }

}

</script>