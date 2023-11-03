<template>
    <v-card style="background-color: rgb(240, 241, 241); min-height: 500px; height: 80vh" 
        
    class="overflow-y-auto overflow-x-hidden" 
    >
        <v-banner
          class="justify-center"
          sticky
          color="primary"
        >

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
