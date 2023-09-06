<template>
    <v-window-item :value="windowNum">
        <v-card-text>
            <v-row>
                <v-col
                cols="8"
                >
                    <validation-provider 
                    v-slot="{ errors }"
                    name="닉네임"
                    :rules="{required: true, max: 8, min:2}"
                    >
                        <v-text-field
                        label="Nickname"
                        hint="This is the nickname you will use in Poker Hand History"
                        v-model="nickname"
                        :error-messages="errors"
                        />
                    </validation-provider>
                </v-col>
                <v-col>
                    <CheckBtn
                        :callback="validateNickname"
                        :loading="duplicationLoading"
                        :checked="duplicationChecked"
                        />
                </v-col>
            </v-row>
            
        </v-card-text>
    </v-window-item>
</template>

<script>
import axios from 'axios'
import CheckBtn from "/src/components/utils/checkBtn.vue"

export default ({
    name: 'UsernameWindow',
    props: {
        step: Number,
        windowNum: Number
    },
    components: {
        CheckBtn
    },
    data: () => ({
        nickname: '',
        duplicationChecked: false,
        duplicationLoading: false,
    }),
    methods: {
        initNicknameWindow() {
            this.duplicationChecked = false
            this.duplicationLoading = false
        },

        validateNickname() {
            this.duplicationLoading = true
            axios.get('/users/nicknames/' + this.nickname)
            .then(() => {
                alert("이미 존재하는 닉네임입니다.")
                this.duplicationLoading = false
            })
            .catch(async error => {
                if (error.response.status === 400) {
                    this.duplicationChecked = true
                } else {
                    this.duplicationLoading = false
                }
            })
        },
    },
    watch: {
        nickname () {
            this.initNicknameWindow()
        },
        step () {
            if (this.step === 2) {
                this.initNicknameWindow()
            } 
        },
        duplicationChecked () {
            if (this.duplicationChecked) {
                this.$emit('step-over', this.nickname)
            }
        }
    }
})
</script>

