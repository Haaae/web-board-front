<template>
    <v-card style="background-color: rgb(240, 241, 241); min-height: 500px; height: 80vh" 
        
    class="overflow-y-auto overflow-x-hidden" 
    >
        <v-banner
          class="justify-center"
          sticky
          color="primary"
        >
        <!-- 컴포넌트로 뽑아낼 때 이 부분은 slot -->
            <slot name="banner" />
        </v-banner>
          
          <v-row>
            <slot name="contents"/>
          </v-row>
        </v-card>
</template>

<script>

export default {
    name: "MiniList"
}
</script>
