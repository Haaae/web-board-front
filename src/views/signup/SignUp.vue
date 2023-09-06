<template>
    <v-container>
        <v-row>
            <v-col>
                <div style="height: 150px;"></div>
            </v-col>
        </v-row>
        
        <!-- window -->
        <v-row justify="center">
            <v-col  align-self="center" lg="5" md="6" sm="8" xs="9">
                <v-card >
                    <v-card-title>
                        <span class="text-h5">{{ currentTitle }}</span>
                        <v-spacer />
                        <v-avatar
                            color="primary lighten-2"
                            class="subheading white--text"
                            size="24"
                        >
                            <span class="white--text text-h5">{{ step }}</span>
                        </v-avatar>
                    </v-card-title>
                    
                    <v-window v-model="step">
                        <!-- window 1: username -->
                        <UsernameWindow
                        :step="step"
                        :windowNum="windowNums.usernameWindow"
                        @step-over="(n) => {step++; username = n}"
                        />
                
                        <!-- window 2: nickname  -->
                        <NicknameWindow
                        :step="step"
                        :windowNum="windowNums.nicknameWindow"
                        @step-over="(n) => {step++; nickname = n}"
                        />
                        

                        <!-- window 3: password -->
                        <PasswordWindow
                        :step="step"
                        :windowNum="windowNums.passwordWindow"
                        @step-over="(n) => {password = n, createUser()}"
                        />
                        
                        <!-- window 4: join success -->
                        <SuccessWindow 
                        :windowNum="windowNums.successWindow"
                        />
                    </v-window>
            
                    <v-card-actions>
                        <v-btn
                            v-if="step !== 4"
                            :disabled="step === 1"
                            depressed
                            @click="step--"
                        >
                            Back
                        </v-btn>
                    
                        <v-spacer />
                        
                        <v-btn
                        color="blue darken-1"
                        text
                        @click="close"
                        >
                        Close
                        </v-btn>
                    </v-card-actions>

                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import axios from 'axios'
import UsernameWindow from "/src/components/signup/usernameWindow.vue"
import NicknameWindow from "/src/components/signup/nicknameWindow.vue"
import PasswordWindow from "/src/components/signup/passwordWindow.vue"
import SuccessWindow from "/src/components/signup/successWindow.vue"


  export default {
    name: "SingUp",
    components: {
        UsernameWindow,
        NicknameWindow,
        PasswordWindow,
        SuccessWindow
    },
    data: () => ({
        step: 1,
        windowNums: {usernameWindow: 1, nicknameWindow: 2, passwordWindow: 3, successWindow: 4},
        dialog: true,
        username: '',
        nickname: '',
        password: '',
    }),
    methods: {
        close() {
            if (this.step === this.windowNums.successWindow) {
                this.$router.push('/')
            } else {
                this.$router.go(-1)
            }
        },
        async createUser() {
            await axios.post('/users', {
                username: this.username,
                password: this.password,
                nickname: this.nickname
            })
            .then(() =>
                this.step++
            )
            .catch(error => {
                alert(error.response.data.message)
                this.step = 1
            })
        }
    },
    computed: {
      currentTitle: function () {
        switch (this.step) {
          case 1: return 'Sign-up'
          case 2: return 'Create a nickname'
          case 3: return 'Create a password'
          default: return 'Account created'
        }
      },
    },
    watch: {
        nickname() {
            console.log(this.nickname)
        }
    }
  }
</script>