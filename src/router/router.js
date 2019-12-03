import Vue from "vue";
import Router from "vue-router";
import Home from "@/components/Home.vue";
import Meetups from "@/components/Meetup/Meetups";
import Create from "@/components/Meetup/CreateMeetup";
import Signin from "@/components/User/Signin";
import Signup from "@/components/User/Signup";
import Profile from "@/components/User/Profile";
import Meetup from "@/components/Meetup/Meetup";
import AuthGuard from "./auth-guard"
Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "Home",
      component: Home
    },
    {
      path: "/meetups",
      name: "Meetup",
      component: Meetups,
      beforeEnter: AuthGuard
    },
    {
      path: "/meetUp/create",
      name: "Create",
      component: Create,
      beforeEnter: AuthGuard
    },
    {
      path: '/meetups/:id',
      name: "Meetups",
      props: true,  
      component: Meetup,
      beforeEnter: AuthGuard
    },
    {
      path: "/signin",
      name: "signin",
      component: Signin
    },
    {
      path: "/signup",
      name: "Signup",
      component: Signup
    },
    {
      path: "/profile",
      name: "Profile",
      component: Profile,
      beforeEnter: AuthGuard
    }
  ]
});
