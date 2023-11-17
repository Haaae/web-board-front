<template>
  <v-container fluid class="pa-4 pa-sm-6 pa-md-8">
    <v-row justify="center">
      <v-col>

        <v-row>
          <div
          style="height: 250px;"
          />
        </v-row>

        <v-card
          class="mx-auto"
          max-width="500"
          outlined
        >

          <v-list-item three-line>
            <v-list-item-content>
              <div class="text-overline mb-4">
                Welcome
              </div>
              <v-list-item-title class="text-h5 mb-1">
                게시판 프로젝트
              </v-list-item-title>

              <v-list-item-subtitle class="mt-5">
                Vue.js, Spring으로 구성된 웹 프로젝트입니다.
              </v-list-item-subtitle>
              <v-list-item-subtitle class="mt-2">
                더 많은 정보를 보려면 하단의 버튼를 클릭하세요!
              </v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>

          <v-card-actions class="mb-2 ml-3">
            <cardLinkBtn
            class="mr-2"
            :link="portfolioLink"
            :text="'portfolio'"
            />
            
            <cardLinkBtn
            class="mr-2"
            :link="backendLink"
            :text="'server-github'"
            />
            
            <cardLinkBtn
            class="mr-2"
              :link="frontendLink"
              :text="'view-Github'"
            />
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  
    </v-container>
  </template>
  
<script>
import cardLinkBtn from '@/components/utils/cardLinkBtn.vue'

export default {
  name: "MainPageLayout",
  
  components: {
    cardLinkBtn
  },
  
  data() {
    return {
      frontendLink: 'https://github.com/Haaae/web-board-front',
      backendLink: 'https://github.com/Haaae/web-board',
      portfolioLink: 'https://furtive-stew-f33.notion.site/My-Board-90459e8c070b456bae542327dc9a6c39',
    }
  },
}
</script>
  