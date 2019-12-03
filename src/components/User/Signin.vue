<template>
  <v-container>
      <v-row>
          <v-col>
            <form class="box col-11 col-sm-9 col-md-5" @submit.prevent="onSignin">
            <h1>sign up</h1>
            <app-alert 
            v-if="error"
            :text="error.message" 
            @dismissed="onDismissed"
            ></app-alert>
            <v-text-field
            required
            v-model="email"
            type="email"
            id="email"
            label="Userame / Email"
            >
            </v-text-field>
            <v-text-field
            required
            v-model="password"
            type="password"
            label="Password"
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
            Sign In
            </v-btn>
          <v-btn width="25%" to="/signup">Sign Up</v-btn>
            
        </form>
          </v-col>
      </v-row>
  </v-container>
</template>
<script>
export default {
  data: () => ({
    email:'',
    password: ''
  }),
  computed: {
    user () {
      return this.$store.getters.user
    },
    loading() {
      this.$store.getters.loading
    },
    error() {
      this.$store.getters.error
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
    onSignin(){
      this.$store.dispatch('signInUserStore',{email: this.email, password: this.password})
    },
    onDismissed() {
      this.$store.dispatch('clearError')
    }
  }
}
</script>
<style lang="scss" scoped>
.box{
    padding: 20px;
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
    transition: 0.45s;
    h1{font-weight:400;color:#ccc;text-transform: uppercase}
}   

</style>