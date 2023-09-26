<template>
    <v-window-item :value="windowNum">
        <v-card-text>
            <validation-observer v-slot="{ invalid }" >
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

                    <v-col class="mt-3">
                        <v-btn 
                        v-if="!duplicationChecked" 
                        @click="validateNickname"
                        :loading='duplicationLoading'
                        :disabled='invalid || duplicationChecked'
                        >
                            check
                        </v-btn>

                        <v-btn
                        v-if="duplicationChecked"
                        color="primary"
                        text
                        >
                            <v-icon large>
                                mdi-check-circle
                            </v-icon>
                        </v-btn>
                    </v-col>
                </v-row>
            </validation-observer>

        </v-card-text>
    </v-window-item>
</template>

<script>
import api from '@/store/utils/api'

export default ({
    name: 'UsernameWindow',
    props: {
        step: Number,
        windowNum: Number
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

        async validateNickname() {
            this.duplicationLoading = true

            await api.validateNickname(this.nickname)
            .then(response => {
                const isExist = response.data.exist
                
                if (isExist) {
                    alert("이미 존재하는 닉네임입니다.")
                    this.duplicationLoading = false
                } else {
                    this.duplicationChecked = true
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

