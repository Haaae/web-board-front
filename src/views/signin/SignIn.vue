<template>
	<v-container>
        <v-row>
            <v-col>
                <div style="height: 150px;"></div>
            </v-col>
        </v-row>

		<v-row justify="center">
			<v-col align-self="center" lg="5" md="6" sm="8" xs="9">

				<validation-observer ref="validator" v-slot="{ invalid }">
				<v-card>
					<v-card-title>
						<span class="text-h5">Login</span>
					</v-card-title>
					<v-card-text>

						<v-form>
							<validation-provider 
							v-slot="{ errors }"
							name="제목"
							:rules="{ required: true, email: true }">
							
								<v-text-field 
								v-model="username" 
								label="Username" 
								prepend-icon="mdi-account-circle" 
								:error-messages="errors"
								/>
							</validation-provider>

							<validation-provider 
							v-slot="{ errors }"
							name="제목"
							:rules="{ required: true, password: true }">
							<v-text-field
								v-model="password"
								:type="showPassword ? 'text' : 'password'"
								label="Password"
								prepend-icon="mdi-lock"
								:append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
								@click:append="showPassword = !showPassword"
								:error-messages="errors"
							/>
							</validation-provider>
						</v-form>
					</v-card-text>

					<v-card-actions>
						<v-btn color="success" to="/signup" dark>Register</v-btn>
						<v-spacer/>
						<v-btn @click="doLogin" :disabled="invalid" color="info">Login</v-btn>
					</v-card-actions>
					<v-card-actions>
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
				</validation-observer>

			</v-col>

		</v-row>
	</v-container>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import '/plugin/vee-validation.js'

const userStore = 'userStore'

export default {
	name: 'LoginPage',
	data() {
		return {
			username: '',
			password: '',
			showPassword: false,
			dialog: true,
		}
	},
	created() {
        if (this.isLoginUser) {
            this.$router.push({name: 'Main'})
        }
    },
	methods: {
		...mapActions(userStore, ['login']),
        close() {
			this.$router.go(-1)
        },
		doLogin() {
			this.login({
				username: this.username,
				password : this.password
			})
			
			if (this.isLoginUser) {
				close()
			}
		}
    },
	computed: {
		...mapGetters(userStore, [
			'sessionId', 
			'isLoginUser'
		])
	}
}
</script>