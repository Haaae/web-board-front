<template>
  <div>
    <v-row>
      <v-col class="ma-5" >
    
      <slot name="writer" />
      
      <slot name="comment" />
      
      <slot name="date" />
      </v-col>
    </v-row>
    <v-divider />
  </div>
</template>

<script>
export default {
    name: 'commentComp',
}
</script>
