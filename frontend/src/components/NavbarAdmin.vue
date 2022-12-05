<template>
  <nav class="navbar navbar-expand-lg navbar-light main-color-bg">
    <div class="container-fluid">
      <router-link class="navbar-brand title-color fs-pacifico" to="/"
        >Trift Shop</router-link
      >
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <router-link class="nav-link fs-roboto" to="/admin"
              >Home</router-link
            >
          </li>
          <li class="nav-item">
            <router-link class="nav-link fs-roboto" to="/add-Barang">
              Tambah
            </router-link>
          </li>
          <!-- <li class="nav-item">
            <router-link class="nav-link fs-roboto" to="/profile">
              Profile
            </router-link>
          </li> -->
        </ul>
        <button
          class="btn btn-logout fs-roboto"
          @click="logOut()"
        >
          Log-Out
        </button>
      </div>
    </div>
  </nav>
</template>

<script>
import { useCookies } from "vue3-cookies";

export default {
  setup() {
    const { cookies } = useCookies();
    return { cookies };
  },
  props: {
    activeHome: String,
  },
  methods: {
    logOut() {
      this.cookies.remove("idUser");
      this.cookies.remove("role");
      this.cookies.remove("username");
      alert("Berhasil Log-Out");
      location.reload();
    },
  },
};
</script>


<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Poppins:wght@400;700&display=swap");
@import url("https://fonts.googleapis.com/css2?family=Pacifico&display=swap");
.fs-roboto {
  font-family: "Poppins", sans-serif;
  color: white;
}

.fs-pacifico {
  font-family: "Pacifico", cursive;
}

.btn-logout {
  background-color: var(--for-color) !important;
  color: #fff !important;
}

.title-color {
  color: var(--for-color);
}
</style>