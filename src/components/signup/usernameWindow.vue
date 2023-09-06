<template>
    <v-window-item :value="windowNum">
        <v-card-text>
            <v-row class="mb-0">
                <v-col cols="9">
                    <validation-provider 
                    v-slot="{ errors }"
                    name="이메일"
                    :rules="{required: true, email: true}"
                    >
                        <v-text-field
                        label="Email"
                        hint="This is the email you will use to login to your Vuetify account"
                        v-model="username"
                        :error-messages="errors"
                        />
                    </validation-provider>
                </v-col>
                <CheckBtn
                class="mt-3"
                :callback="validateUsername"
                :loading="duplicationLoading"
                :checked="duplicationChecked"
                />
            </v-row>
           
            <v-row 
            v-if="duplicationChecked"
            >
                <v-col cols="3">
                    <validation-provider 
                    v-slot="{ errors }"
                    name="코드"
                    :rules="{length:6, numeric: true}"
                    >
                        <v-text-field
                        label="Code"
                        v-model="code"
                        :error-messages="errors"
                        />
                    </validation-provider>
                </v-col>
                <v-col 
                v-if="Timer !== null" 
                cols="3"
                class="mt-4"
                >
                    <v-btn text color="red">
                        {{ TimerStr }}
                    </v-btn>
                </v-col>
                <CheckBtn
                class="mt-3"       :callback="verificationUsername"
                :loading='verificationLoading'
                :checked="verificationChecked"
                />
                <v-btn
                class="mt-7 mr-2"
                color="primary"
                v-if="!verificationChecked"
                @click="resendVerificationCode"
                >
                    resend
                </v-btn>
            </v-row>
        </v-card-text>
    </v-window-item>
</template>

<script>
import axios from 'axios'
import CheckBtn from "/src/components/utils/checkBtn.vue"
import '/plugin/vee-validation.js'

export default {
    name: 'UsernameWindow',
    props: {
        step: Number,
        windowNum: Number
    },
    components: {
        CheckBtn
    },
    data: () => ({
        username: 'alsrbtls88@gmail.com',
        duplicationChecked: false,
        duplicationLoading: false,

        verificationChecked: false,
        verificationLoading: false,
        code: '',

        Timer: null,
        TimeCounter: 180,
        TimerStr: "05:00"
    }),
    methods: {
        initUsernameWindow() {
            this.duplicationChecked = false
            this.duplicationLoading = false
        },

        validateUsername() {
            this.duplicationLoading = !this.duplicationLoading
            axios.get('/users/usernames/' + this.username)
            .then(() => {
                alert("이미 가입된 이메일 주소입니다.")
                this.duplicationLoading = !this.duplicationLoading
            })
            .catch(async error => {
                if (error.response.status === 400) {
                    this.sendVerificationCode()
                    this.timeInit()
                    this.duplicationChecked = true
                } else {
                    this.duplicationLoading = !this.duplicationLoading
                }
            })
        },

        verificationUsername() {
            this.verificationLoading = true
            
            axios.post('/users/emails/verifications', {
                email: this.username,
                authCode: this.code
            })
            .then(() => {
                this.verificationChecked = true
                this.Timer = null
                this.step
            })
            .catch(error => {
                alert(error.response.data.message)
            })
            this.verificationLoading = false
        },
        
        sendVerificationCode() {
            axios.post('/users/emails/verification-requests', {
                email: this.username
            })
            // .then(() => {})
            .catch(error => {
                alert(error.response.data.message)
            })
        },

        resendVerificationCode() {
            this.sendVerificationCode()  
            this.timeInit()
            this.code = ''
        },

        timeInit() {
        if(this.Timer != null){
            this.timerStop(this.Timer);
            this.Timer = null;
        }
        this.Timer = this.timerStart();
        },

        timerStart() {
        // 1초에 한번씩 start 호출
        this.TimeCounter = 300;
        var interval = setInterval(() => {
            this.TimeCounter--; //1초씩 감소
            this.TimerStr = this.prettyTime();
            if (this.TimeCounter <= 0) this.timerStop(interval);
        }, 1000);
        return interval;
        },

        timerStop(Timer) {
            clearInterval(Timer);
            this.TimeCounter = 0;
        },

        prettyTime() {
            // 시간 형식으로 변환 리턴
            let time = this.TimeCounter / 60;
            let minutes = parseInt(time);
            let secondes = Math.round((time - minutes) * 60);
            return (
                minutes.toString().padStart(2, "0") +
                ":" +
                secondes.toString().padStart(2, "0")
            );
        },
    },
    watch: {
        username () {
            this.initUsernameWindow()
        },
        step () {
            if (this.step === 1) {
                this.initUsernameWindow()
            } 
        },
        verificationChecked () {
            if (this.verificationChecked) {
                this.$emit('step-over', this.username)
            }
        }
    }
}
</script>
