import Vue from "vue";
import App from "./App.vue";
import router from "./router/router";
import store from "./store";
import vuetify from './plugins/vuetify';
import * as firebase from "firebase"
import filterDate from "@/filter/date"
import ErrorAlert from "./components/Shared/MeetUpAlert.vue"
Vue.config.productionTip = false;
Vue.filter('date', filterDate)
Vue.component('app-alert', ErrorAlert)
new Vue({
  router,
  store,
  vuetify,
  render: h => h(App),
  created () {
    const firebaseConfig = {
      apiKey: "AIzaSyCqr_7nSfwPyhgCPpLjShB_btM082G7Oow",
      authDomain: "first-vuetify-9bc1e.firebaseapp.com",
      databaseURL: "https://first-vuetify-9bc1e.firebaseio.com",
      projectId: "first-vuetify-9bc1e",
      storageBucket: "gs://first-vuetify-9bc1e.appspot.com",
      messagingSenderId: "1070795868187",
      appId: "1:1070795868187:web:bbd9373d4fcc65936090be",
      measurementId: "G-Z13H4SR7V3"
    };
   // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.$store.dispatch('autoSignIn', user)
      }
    })
    this.$store.dispatch('loadImages')
  }
}).$mount("#app");
