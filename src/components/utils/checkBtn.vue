<template>
    <v-col>
        <v-btn 
        v-if="!checked" 
        @click="callback"
        :loading='loading'
        :disabled='!invalid'
        >
            check
        </v-btn>

        <v-btn
        v-if="checked"
        color="primary"
        text
        >
            <v-icon large>
                mdi-check-circle
            </v-icon>
        </v-btn>
    </v-col>
</template>

<script>

export default {
    name: 'CheckBtn',
    props: {
        callback: Function,
        loading: Boolean,
        checked: Boolean,
        invalid: Boolean
    },
}

</script>
