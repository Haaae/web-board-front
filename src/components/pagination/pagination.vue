<template>
    <v-container fluid>
        <v-row class="justify-center">
            <v-col style="display: flex; justify-content: center;">
                <Paginate 
                    :page-count="pageCount"
                    :click-handler="callback"
                    :prev-text="'<'"
                    :next-text="'>'"
                    :container-class="'page-container'"
                    :page-class="'page-item'"
                    :page-link-class="'page-link'"
                />
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import Paginate from 'vuejs-paginate'

export default {
    name: "PaginationComponent",

    components: {
      Paginate
    },

    props: {
        pageCount: {
            type: Number,
            require: true
        },
        callback: {
            type: Number,
            require: true
        }
    }
}
</script>

<style lang="css">
  .page-container {
    margin-top: 0px;
    display: inline-block;
    padding: 0%;
    list-style: none;
  }

  .page-container li {
    float: left;
  }

  .page-container a:hover {
    color: #ffffff !important;
    background-color: #2196F3;
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
    background-color: #2196F3;
    cursor: default;
    outline: none;
  }
  .page-container li:active a {
    outline: none;
  }
</style>