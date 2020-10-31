import Vue from "vue";
import Login from "./components/auth/login.vue";
import Register from "./components/auth/registration.vue";
import Todo from "./components/todo.vue";
import VueRouter from "vue-router";

const routes = [
  { name: "login", path: "/login", component: Login },
  { name: "registration", path: "/register", component: Register },
  { name: "app", path: "/app", component: Todo },
];

Vue.use(VueRouter);

export const router = new VueRouter({
  mode: "history",
  routes,
});
