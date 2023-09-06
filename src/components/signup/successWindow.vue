<template>
    <v-window-item :value="windowNum">
        <div class="pa-4 text-center">
            <v-img
                class="mb-4"
                contain
                height="128"
                src="https://cdn.vuetifyjs.com/images/logos/v.svg"
            ></v-img>
            <h3 class="text-h6 font-weight-light mb-2">
                Welcome to Vuetify
            </h3>
            <span class="text-caption grey--text">Thanks for signing up!</span>
        </div>
    </v-window-item>
</template>

<script>

export default {
    name: 'SuccessWindow',
    props: {
        step: Number,
        windowNum: Number
    },
}
</script>
