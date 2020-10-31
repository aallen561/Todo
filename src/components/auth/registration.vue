<template>
  <div class="container register-form">
    <div class="form">
      <div class="note">
        <p>TO-DO LIST REGISTRATION.</p>
      </div>

      <div class="form-content">
        <div class="row">
          <div class="col-md-6">
            <div class="form-group">
              <input v-model="form.first_name"
                type="text"
                class="form-control"
                placeholder="First Name"
                value=""
              />
              <div class="form-group">
              <input v-model="form.last_name"
                type="text"
                class="form-control"
                placeholder="Last Name"
                value=""
              />
            </div>
            <div class="form-group">
              <input v-model="form.age"
                type="number"
                class="form-control"
                placeholder="Age"
                value=""
              />
              <div class="form-group">
              <input v-model="form.email"
                type="text"
                class="form-control"
                placeholder="Email Address"
                value=""
              />
            </div></div>
          </div>
          <div class="col-md-6">
            <div class="form-group">
              <input
                type="password"
                class="form-control"
                placeholder="Your Password *"
                value=""
              />
            </div>
            <div class="form-group">
              <input v-model="form.password"
                type="password"
                class="form-control"
                placeholder="Confirm Password *"
                value=""
              />
            </div></div>
          </div>
        </div>
        <button @click="createUser" type="button" class="btnSubmit">Submit</button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      form: {},
      route: "/api/register",
    };
  },
  methods: {
    createUser() {
      axios
        .post(this.route, this.form)
        .then(() => {
          console.log("success");
          this.$router.push({ name: "login" });
        })
        .catch((e) => {
          console.log(e);
        });
    },
  },
};
</script>


<style></style>
