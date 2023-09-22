<template>
    <v-window-item :value="windowNum">
        <v-card-text>
            <v-row>
                <v-col cols="12">
                    <validation-provider 
                    v-slot="{ errors }"
                    name="비밀번호"
                    :rules="{required: true, password: true}"
                    >
                        <v-text-field
                        label="Password"
                        type="password"
                        v-model="password"
                        :error-messages="errors"
                        />
                    </validation-provider>
                </v-col>
            </v-row>
                
            <v-row>
                <v-col cols="9">
                    <v-text-field
                    label="Confirm Password"
                    type="password"
                    v-model="confirmPassword"
                    />

                </v-col>
                
                <v-col class="mt-5">
                    <v-btn 
                    v-if="!isSame" 
                    text
                    color="primary"
                    >
                        <v-icon>
                            mdi-alpha-x-circle
                        </v-icon>
                    </v-btn>
    
                    <v-btn
                    v-if="isSame"
                    color="primary"
                    text
                    >
                        <v-icon>
                            mdi-check-circle
                        </v-icon>
                    </v-btn>
                </v-col>

            </v-row>
                    
        </v-card-text>
    </v-window-item>
</template>

<script>
import '/plugin/vee-validation.js'

export default {
    name: 'UsernameWindow',
    props: {
        step: Number,
        windowNum: Number
    },
    data: () => ({
        password: "",
        confirmPassword: "",
        isSame: false
    }),
    methods: {
        initPasswordWindow() {
            this.password = ''
            this.confirmPassword = ''
        },

        validatePassword() {
            this.isSame = this.password == this.confirmPassword
        },
    },
    watch: {
        step () {
            if (this.step === 3) {
                this.initPasswordWindow()
            } 
        },
        duplicationChecked () {
            if (this.duplicationChecked) {
                this.$emit('step-over')
            }
        },
        confirmPassword () {
            this.isSame = (this.password == this.confirmPassword)
        },
        isSame() {
            if (this.isSame) {
                this.$emit('step-over', this.password)
            }        
        }
    }
}
</script>