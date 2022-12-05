<template>
  <div
    class="container-fluid login d-flex align-items-center"
    style="height: 100vh"
  >
    <div class="container box shadow">
      <div class="d-flex justify-content-center">
        <span class="pb-3 px-3">
          <div class="fs-roboto fw-bold">Register Trifting App</div>
        </span>
      </div>

      <form @submit.prevent="getFormValues">
        <div class="mb-3">
          <label for="exampleInputEmail1" class="form-label">Email</label>
          <input
            name="email"
            type="email"
            class="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            autocomplete="off"
          />
        </div>
        <div class="mb-3">
          <label for="exampleInputPassword1" class="form-label">Password</label>
          <input
            name="password"
            type="password"
            class="form-control"
            id="exampleInputPassword1"
          />
        </div>

        <div class="mb-3">
          <label for="username" class="form-label">Username</label>
          <input
            name="username"
            type="text"
            class="form-control"
            id="username"
            autocomplete="off"
          />
        </div>
        <div class="mb-3" style="width: 12rem">
          <label for="admin" class="form-label">Admin code</label>
          <input
            name="admin"
            type="text"
            class="form-control"
            id="admin"
            autocomplete="off"
            placeholder="Skip if you don't have"
          />
        </div>
        <div class="d-flex justify-content-between">
          <button type="submit" class="btn btn-login">Submit</button>
          <router-link class="btn btn-login" to="/login"
            >Back To Login</router-link
          >
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      Username: String,
      Password: String,
      email: String,
      admin: String,
    };
  },
  methods: {
    getFormValues(submitEvent) {
      this.Username = submitEvent.target.elements.username.value;
      this.email = submitEvent.target.elements.email.value;
      this.Password = submitEvent.target.elements.password.value;
      this.admin = submitEvent.target.elements.admin.value;

      if (this.admin == "iniAdmin") {
        this.admin = "admin";
      } else {
        this.admin = "user";
      }

      axios
        .post("/api-register", {
          username: this.Username,
          role: this.admin,
          email: this.email,
          password: this.Password,
        })
        .then(async(res) => {
          const body = res.data;
          const msg = body.message;
          const c = confirm(msg + " direct to login?");
          if (c) {
            this.$router.push("login");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Roboto:wght@700&display=swap");

.login {
  background-color: #f0f2f5;
}

.box {
  background-color: #ffffff;
  width: 35rem;
  height: auto;
  border-radius: 3%;
  padding: 2rem;
}

.btn-login {
  background-color: #1877f2;
  color: white !important;
}

.btn-login:hover {
  background-color: #0057c9;
  color: white !important;
}

.fs-roboto {
  font-family: "Roboto";
}
</style>