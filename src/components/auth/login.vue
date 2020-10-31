<template>
  <div class="container">
    <div class="d-flex justify-content-center h-100">
      <div class="card">
        <div class="card-header">
          <h3>Sign In</h3>
          <div class="d-flex justify-content-end social_icon">
            <span><i class="fab fa-facebook-square"></i></span>
            <span><i class="fab fa-google-plus-square"></i></span>
            <span><i class="fab fa-twitter-square"></i></span>
          </div>
        </div>
        <div class="card-body">
          <form @submit.prevent>
            <div class="input-group form-group">
              <div class="input-group-prepend">
                <span class="input-group-text"
                  ><i class="fas fa-user"></i
                ></span>
              </div>
              <input v-model="form.email" type="text" class="form-control" placeholder="Email Address" />
            </div>
            <div class="input-group form-group">
              <div class="input-group-prepend">
                <span class="input-group-text"><i class="fas fa-key"></i></span>
              </div>
              <input
              v-model="form.password"
                type="password"
                class="form-control"
                placeholder="password"
              />
            </div>
            <div class="row align-items-center remember">
              <input type="checkbox" />Remember Me
            </div>
            <div class="form-group">
              <input
              @click="login"
                type="submit"
                value="Login"
                class="btn float-right login_btn"
              />
            </div>
          </form>
        </div>
        <div class="card-footer">
          <div class="d-flex justify-content-center links">
            Don't have an account?<a href="#">Sign Up</a>
          </div>
          <div class="d-flex justify-content-center">
            <a href="#">Forgot your password?</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import axios from "axios";

export default {
  data() {
    return {
      token: localStorage.getItem("token"),
      form: {},
    route: "/api/login",
    };
  },
  created() {
    if (this.token) {
      this.$router.push({ name: "app" });
    }
  },
  methods: {
    login() {
      axios
        .post(this.route, this.form)
        .then(({ data }) => {
          localStorage.setItem("token", data.token);
          this.$axios.defaults.headers["authorization"] = `Bearer ${data.token}`;
          this.$router.push({ name: "app" });
        })
        .catch((e) => {
          console.log(e);
        });
    },
  },
};
</script>

<style></style>
