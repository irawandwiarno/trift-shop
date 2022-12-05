<template>
  <div
    class="container-fluid login d-flex align-items-center"
    style="height: 100vh"
  >
    <div class="container box shadow">
      <div class="d-flex justify-content-center">
        <span class="pb-3 px-3">
          <div class="fs-roboto fw-bold">Login Trifting App</div>
        </span>
      </div>

      <form @submit.prevent="getFormValues">
        <div class="mb-3">
          <label for="exampleInputEmail1" class="form-label"
            >Masukan email</label
          >
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
        <div class="d-flex justify-content-between">
          <button type="submit" class="btn btn-login">Submit</button>
          <router-link class="btn btn-regis" to="/register"
            >Register</router-link
          >
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { useCookies } from "vue3-cookies";

export default {
  setup() {
    const { cookies } = useCookies();
    return { cookies };
  },
  data() {
    return {
      email: String,
      Password: String,
      datauser: {},
      role:""
    
    };
  },
  methods: {
    getFormValues(submitEvent) {
      this.email = submitEvent.target.elements.email.value;
      this.Password = submitEvent.target.elements.password.value;

      axios
        .get("/api-login", {
          params: {
            Email: this.email,
            password: this.Password,
          },
        })
        .then((res) => {
          const dataLogin = res.data;
          this.datauser = dataLogin.data;

          if (dataLogin.status == "sukses") {
            this.role = this.datauser.role
            this.cookies.set("idUser", this.datauser.id);
            this.cookies.set("role", this.datauser.role);
            this.cookies.set("username", this.datauser.username);

            // this.cookie_idUser = this.cookies.get("idUser");
            alert("Berhasil Login! selamat Datang " + this.datauser.username);

            if (this.role == "admin") {
              this.$router.push("admin");
            } else {
              this.$router.push("/");
            }
          } else {
            alert("Username atau Password Salah");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },

  mounted() {},
};
</script>

<style scoped>
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
.btn-regis {
  background-color: #00e988;
  color: white !important;
}

.btn-regis:hover {
  background-color: #009154;
  color: white !important;
}

.fs-roboto {
  font-family: "Roboto";
}
</style>
