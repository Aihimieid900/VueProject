<template>
  <v-container>
      <v-row>
          <v-col>
            <form class="box col-11 col-sm-9 col-md-5 pl-7 pr-7 pb-4" @submit.prevent="onSignUp">
            <h1>sign up</h1>
            <app-alert 
            v-if="error"
            :text="error.message" 
            @dismissed="onDismissed"
            ></app-alert>
            <v-text-field
            label="First Name"  
            required
            type="text"
            id="firstName"
            v-model="firstName"
            >
            </v-text-field>
            <v-text-field
            required
            type="text"
            id="lastName"
            label="Last Name"
            v-model="lastName"
            >
            </v-text-field>
            <v-text-field
            required
            type="text"
            id="username"
            label="Userame"
            v-model="username"
            >
            </v-text-field>
            <v-text-field
            required
            type="email"
            id="email"
            label="Email"
            v-model="email"
            >
            </v-text-field>
            <v-text-field
            required
            type="password"
            id="password"
            label="Password"
            v-model="password"
            >
            </v-text-field>
            <v-text-field
            required
            type="password"
            id="confirmPassword"
            label="Confirm-Password"
            v-model="confirmPassword"
            :rules="[comperePassword]"
            >
            </v-text-field>
          <v-btn
              width="40%"
              class="mr-5"
              :loading="loading"
              :disabled="loading"
              type="submit"
              color="success"
               >
            Submit
            </v-btn>
            <v-btn  width="25%" to="/signin">Sign In</v-btn>
          </form>
          </v-col>
      </v-row>
  </v-container>
</template>
<script>

export default {
  data: () => ({
    firstName: '',
    lastName: '',
    username: '',
    email:'',
    password: '',
    confirmPassword: '',
  }),
  computed: {
    comperePassword() {
    return this.password !== this.confirmPassword ? 'Passwords do not match' : true
    },
    user () {
      return this.$store.getters.user
    },
    loading () {
      return this.$store.getters.loading
    },
    error () {
      return this.$store.getters.error
    }
  },
  watch: {
    user (value) {
      if (value !== null && value !== undefined) {
        this.$router.push("/")
      }
    }
  },
  methods: {
    onSignUp(){
      this.$store.dispatch('signUpUserStore',{email: this.email, password: this.password})
    },
    onDismissed() {
      this.$store.dispatch('clearError')
    },
  }
}
</script>
<style lang="scss" scoped>
.box{
    padding: 0.2rem;
    background-color:#E8EAF6;
    position: absolute;
    border-radius:24px;     
    text-align:center;
    top:50%;
    left:50%;
    -webkit-transform: translate(-50%,-50%);
    -o-transform: translate(-50%,-50%);
    -moz-transform: translate(-50%,-50%);
    transform: translate(-50%,-50%);
    h1{font-weight:400;color:#666;text-transform: uppercase}
}   

</style>