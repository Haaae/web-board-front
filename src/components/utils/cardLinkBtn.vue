<template>
    <v-btn
    outlined
    rounded
    link
    color="primary"
    :href="link"
    >   
        {{ text }}
    </v-btn>
</template>

<script>
export default {
    name: "CardLinkBtn",
    props: {
        link: {type: String, required: true},
        text: {type: String, required: true},
    },
}

</script>