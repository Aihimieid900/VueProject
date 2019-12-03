<template>
  <v-app>
    <v-navigation-drawer v-model="sideNav" absolute style="z-index:9" >
      <v-list shaped>

      <v-subheader>Menu</v-subheader>
      <v-list-item-group>
        <v-list-item 
        color="deep-purple darken-2"
        v-for="(item, i) in items"
        :key="i"
         :to="item.link"
         exact
        >
        <v-list-item-icon>
          <v-icon color="blue-grey darken-6" v-text="item.icon"></v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title v-text="item.text"></v-list-item-title>
        </v-list-item-content>
        </v-list-item>
        <v-list-item 
          v-if="userIsAuth"
           @click="onLogout"
        >
        <v-list-item-icon>
          <v-icon color="blue-grey darken-6">fas fa-sign-out-alt</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title >Logout</v-list-item-title>
        </v-list-item-content>
        </v-list-item>
      </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar
      app
      color="deep-purple darken-2"
      dark
      >
        <v-app-bar-nav-icon @click.native.stop="sideNav = !sideNav"
        class="d-flex d-md-none"
        dark
        ></v-app-bar-nav-icon>
        <v-toolbar-title class="headline text-uppercase">
          <router-link to="/" tag="span" style="cursor:pointer">AhmedHakim</router-link>
        </v-toolbar-title>
      <v-spacer></v-spacer>
        <v-btn
        class="d-none d-md-flex"
         text
         v-for="(item,i) in items"
         :key="i"
         :to="item.link"
        >
        <v-icon dark>{{ item.icon }}</v-icon>
        <span class="ml-2">
          {{ item.text }}
        </span>
      </v-btn>
        <v-btn
        class="d-none d-md-flex"
         text
         v-if="userIsAuth"
         @click="onLogout"
        >
        <v-icon dark>fas fa-sign-out-alt</v-icon>
        <span class="ml-2">
          Logout
        </span>
      </v-btn>
    </v-app-bar>
    <v-content>
      <router-view></router-view>
    </v-content>
  </v-app>
</template>

<script>

export default {
  name: 'App',
  data: () => ({
     sideNav: false,
  }),
  computed: {
    items () {
      let items = [
      { text: 'Sing In',icon: 'fa-lock',link: '/signin'},
       { text: 'Sign Up',icon: 'fas fa-user-plus',link: '/signup'}
      ]
      if (this.userIsAuth) {
        items = [
          { text: 'Meetups', icon: 'fa-users' ,link: '/meetups'},
          { text: 'Organize Meetup',icon: 'fa-cogs', link: '/meetUp/create' },
          { text: 'Profile',icon: 'fa-user ',link: '/profile'}
        ]
      }
      return items
    },
    userIsAuth() {
      return this.$store.getters.user !== null && this.$store.getters.user !== undefined
    }
  },
  methods:{
    onLogout () {
      this.$store.dispatch('logout')
    }
  }
};
</script>
