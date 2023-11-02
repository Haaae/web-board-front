<template>
    <v-window-item :value="windowNum">
        <v-card-text>
            <validation-observer v-slot="{ invalid }" >
                <v-row class="mb-0">
                    <v-col cols="8">
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

                    <v-col class="mt-3">
                        <v-btn 
                        v-if="!duplicationChecked" 
                        @click="validateUsername"
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

           
            <validation-observer v-slot="{ invalid }" >

            <v-row 
            v-if="duplicationChecked"
            >
                <v-col cols="2">
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
                <v-col class="mt-4">
                    <v-btn 
                    v-if="!verificationChecked" 
                    @click="verificationUsername"
                    :loading='verificationLoading'
                    :disabled='invalid || verificationChecked'
                    >
                        check
                    </v-btn>

                    <v-btn
                    v-if="verificationChecked"
                    color="primary"
                    text
                    >
                        <v-icon large>
                            mdi-check-circle
                        </v-icon>
                    </v-btn>
                </v-col>
                
                <v-btn
                class="mt-7 mr-2"
                color="primary"
                v-if="!verificationChecked"
                @click="resendVerificationCode"
                >
                    resend
                </v-btn>
            </v-row>
        </validation-observer>

        </v-card-text>
    </v-window-item>
</template>

<script>
import api from '@/store/modules/user/api'
import '/plugin/vee-validation.js'

export default {
    name: 'UsernameWindow',
    props: {
        step: Number,
        windowNum: Number
    },
    data: () => ({
        username: '',
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

            this.verificationChecked = false
            this.verificationLoading = false
            
            this.code = ''
            this.Timer = null
        },

        async validateUsername() {
            this.duplicationLoading = true

            await api.validateUsername(this.username)
            .then(response => {
                const isExist = response.data.exist
                if (isExist) {
                    this.duplicationLoading = false
                    alert("이미 가입된 이메일 주소입니다.")
                } else {
                    this.sendVerificationCode()
                    this.timeInit()
                    this.duplicationChecked = true
                }
            })
        },

        async verificationUsername() {
            this.verificationLoading = true
            
            await api.verificationUsername({
                email: this.username,
                authCode: this.code
            })
            .then(response => {
                this.verificationChecked = response.data.isCertificated
                
                if (this.verificationChecked) {
                    this.Timer = null
                } else {
                    this.code = ''
                }
            })
            .catch(() => {
                alert('유효하지 않은 이메일입니다.')
            })
            this.verificationLoading = false
        },
        
        async sendVerificationCode() {
            await api.sendVerificationCode({email: this.username})
            // .then(() => {})
            .catch(() => {
                alert('인증 코드 발송에 실패했습니다.')
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
