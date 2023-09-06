<template>
	<v-container>
        <v-row>
            <v-col>
                <div style="height: 150px;"></div>
            </v-col>
        </v-row>

		<v-row justify="center">
			<v-col align-self="center" lg="5" md="6" sm="8" xs="9">

				<v-card>
					<v-card-title>
						<span class="text-h5">Login</span>
					</v-card-title>
					<v-card-text>
						<v-form>
							<v-text-field v-model="username" label="Username" prepend-icon="mdi-account-circle" />
							<v-text-field
								v-model="password"
								:type="showPassword ? 'text' : 'password'"
								label="Password"
								prepend-icon="mdi-lock"
								:append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
								@click:append="showPassword = !showPassword"
							/>
						</v-form>
					</v-card-text>

					<v-card-actions>
						<v-btn color="success" to="/signup" dark>Register</v-btn>
						<v-spacer></v-spacer>
						<v-btn @click="login" color="info">Login</v-btn>
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
			</v-col>

		</v-row>
	</v-container>
</template>

<script>

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
	methods: {
        close() {
			this.$router.go(-1)
        },
		login() {
			this.$store.dispatch(
				"login", 
				{username: this.username, password : this.password}
			)
		}
		
    },
}
</script>